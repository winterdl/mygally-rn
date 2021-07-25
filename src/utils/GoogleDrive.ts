import GDrive from 'react-native-google-drive-api-wrapper';
import RNFS from 'react-native-fs';
import {GoogleSignin} from 'react-native-google-signin';

import * as ErrorCode from 'constants/ErrorCode';
import {DB_FILE_NAME, DB_DIRECTORY} from 'constants/Database';
import {APP_DIRECTORY} from 'constants/App';

const GD_ROOT_DIRECTORY = 'DayDiary';

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
export async function getFileList(
  query: string = '',
): Promise<Array<{name: string; id: string}>> {
  const {files} = await GDrive.files.list({q: query}).then((res) => res.json());
  return files;
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
  const directoryId = await createDirectory(GD_ROOT_DIRECTORY);

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

function getFileName(fileList: Array<{name: string}>): Set<String> {
  let set = new Set<String>();
  fileList.forEach((file: {name: string}) => set.add(file.name));
  return set;
}
/**
 * upload all images in path
 * @param path direcotry path of where image files are located
 */
export async function uploadImageFile(path: string) {
  const isGDInitialized = await initGoogleDrive();
  if (!isGDInitialized) throw new Error('Failed to Initialized Google Drive');
  
  const images = await RNFS.readDir(path);

  //create directory
  const directoryId = await createDirectory(`${GD_ROOT_DIRECTORY}_images`);

  //search files under specific directory
  const fileList = await getFileList(
    `'${directoryId}' in parents and trashed=false`,
  ).then(getFileName);

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

async function downloadFile(
  fileId: string,
  destPath: string,
  fileName: string,
) {
  return await GDrive.files.download(fileId, {
    toFile: `${destPath}/${fileName}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });
}


/**
 * restore db file and images from google drive
 */
export async function retrieveFile() {
  const isGDInitialized = await initGoogleDrive();
  if (!isGDInitialized) throw new Error('Failed to Initialized Google Drive');

  const directoryId = await createDirectory(GD_ROOT_DIRECTORY);
  const fileList = await getFileList(`'${directoryId}' in parents`);

  if (!fileList.length) throw new Error(ErrorCode.BACKUP_FILE_NOT_EXISTS);

  const [recentFile] = fileList;
  let request: Promise<String>[] = [];

  request.push(downloadFile(recentFile.id, DB_DIRECTORY, DB_FILE_NAME));

  const imgDirectoryId = await createDirectory(`${GD_ROOT_DIRECTORY}_images`);
  const localImages = await RNFS.readDir(APP_DIRECTORY).then(getFileName);

  const imageFiles = await getFileList(
    `'${imgDirectoryId}' in parents and trashed=false`,
  );

  for (let {name, id} of imageFiles) {
    //skip files that already exist in local directory
    if (localImages.has(name)) continue;

    request.push(downloadFile(id, APP_DIRECTORY, name));
  }

  Promise.all(request).catch(() => new Error(ErrorCode.FILE_RESTORE_FAIL));
}
