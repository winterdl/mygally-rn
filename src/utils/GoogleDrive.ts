import GDrive from 'react-native-google-drive-api-wrapper';
import RNFS from 'react-native-fs';
import {GoogleSignin} from 'react-native-google-signin';
import moment from 'moment';

import * as ErrorCode from 'constants/ErrorCode';

const APP_DIRECTORY = 'DayDiary';

/**
 * get access token and initialize google drive
 * @returns initialization status of google drive
 */
export async function initGoogleDrive(): Promise<boolean> {
  //get access token
  const token = await GoogleSignin.getTokens();
  if (!token) return false;

  GDrive.setAccessToken(token.accessToken);
  // initializing Google Drive and confirming permissions
  GDrive.init();

  return GDrive.isInitialized();
}

/**
 * create a directory in google drive under root folder
 * @param name name of directory
 * @returns directory id
 */
async function createDirectory(name: string): Promise<String> {
  const directoryId = await GDrive.files.safeCreateFolder({
    name, //directory name
    parents: ['root'],
  });

  if (!directoryId) throw new Error(ErrorCode.DIRECTORY_CREATE_FAIL);
  return directoryId;
}

/**
 * get files in google drive
 * @param query query string to filter files or folders.
 * for detailed query examples see : https://developers.google.com/drive/api/v3/search-files
 * @returns
 */
export async function getFileList(query: string = ''): Promise<Set<String>> {
  const {files} = await GDrive.files.list({q: query}).then((res) => res.json());

  let fileList = new Set<String>();
  files.forEach((file: {name: string}) => fileList.add(file.name));

  return fileList;
}

/**
 * upload a file in google drive
 * @param path path of a file which will be uploaded
 * @param fileName name of a uploaded file
 */
export async function uploadDataFile(
  path: string,
  fileName: string,
): Promise<void | String> {
  const isGDInitialized = await initGoogleDrive();
  if (!isGDInitialized) throw new Error('Failed to Initialized Google Drive');

  //create directory
  const directoryId = await createDirectory(APP_DIRECTORY);

  //upload file
  const fileContent = await RNFS.readFile(path, 'base64');
  const isBase64 = true;

  const upload = await GDrive.files.createFileMultipart(
    fileContent,
    '',
    {
      parents: [directoryId],
      name: fileName,
    },
    isBase64,
  );

  if (!upload.ok) throw new Error(ErrorCode.FILE_UPLOAD_FAIL);
}

/**
 * upload all images in path
 * @param path direcotry path of where image files are located
 */
export async function uploadImageFile(path: string) {
  const images = await RNFS.readDir(path);

  //create directory
  const directoryId = await createDirectory(`${APP_DIRECTORY}_images`);

  //search files under specific directory
  const fileList = await getFileList(
    `'${directoryId}' in parents and trashed=false`,
  );

  let requests: Promise<void | String>[] = [];
  const isBase64 = true;

  for (let i = 0; i < images.length; i++) {
    const {path, name} = images[i];

    //skip if file is not a jpg format or already uploaded in google drive
    if (fileList.has(name) || !name.includes('.jpg')) continue;

    const fileContent = await RNFS.readFile(path, 'base64');
    const upload = async (): Promise<void | String> =>
      await GDrive.files.createFileMultipart(
        fileContent,
        'image/jpg',
        {
          parents: [directoryId],
          name,
        },
        isBase64,
      );

    requests.push(upload());
  }

  Promise.all(requests).catch(() => new Error(ErrorCode.FILE_UPLOAD_FAIL));
}
