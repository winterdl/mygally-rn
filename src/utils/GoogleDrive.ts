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

export async function uploadDataFile(path: string): Promise<void | String> {
  const isGDInitialized = await initGoogleDrive();
  if (!isGDInitialized) throw new Error('Failed to Initialized Google Drive');

  //create directory
  const directoryId = await createDirectory(APP_DIRECTORY);

  //upload file
  const fileContent = await RNFS.readFile(path, 'base64');
  const FILE_NAME = APP_DIRECTORY + '.' + moment().format('YYYYMMDDHHmmss');
  const isBase64 = true;

  const upload = await GDrive.files.createFileMultipart(
    fileContent,
    '',
    {
      parents: [directoryId],
      name: FILE_NAME,
    },
    isBase64,
  );

  if (!upload.ok) throw new Error(ErrorCode.FILE_UPLOAD_FAIL);
}
