import React, {useState, useEffect} from 'react';

import Config from 'react-native-config';
import {GoogleSignin, User, statusCodes} from 'react-native-google-signin';
import * as ErrorCode from 'constants/ErrorCode';

type ErrorMessageType = {
  [code: string]: string;
};

const {
  SIGN_IN_CANCELLED,
  IN_PROGRESS,
  PLAY_SERVICES_NOT_AVAILABLE,
  SIGN_IN_REQUIRED,
} = statusCodes;

const errMessages: ErrorMessageType = {
  [SIGN_IN_CANCELLED]: ErrorCode.SIGN_IN_CANCELLED,
  [IN_PROGRESS]: ErrorCode.IN_PROGRESS,
  [PLAY_SERVICES_NOT_AVAILABLE]: 'play services not avail',
  [SIGN_IN_REQUIRED]: ErrorCode.SIGN_IN_REQUIRED,
} as const;

const useGoogleLogin = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
  }, []);

  const checkSignInStatus = async (): Promise<boolean> => {
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (!isSignedIn) setUserInfo(null);

    return isSignedIn;
  };

  const getCurrentUserInfo = async (): Promise<User | String> => {
    try {
      const info = await GoogleSignin.signInSilently();
      setUserInfo(info);
      return info;
    } catch ({code, message}) {
      throw new Error(errMessages[code] || message);
    }
  };

  const signIn = async (): Promise<User | String> => {
    try {
      //TODO: 필요한가?
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      return userInfo;
    } catch ({code, message}) {
      setUserInfo(null);
      throw new Error(errMessages[code] || message);
    }
  };

  const signOut = async (): Promise<void | String> => {
    //remove user session from device
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch ({code, message}) {
      console.error(code, message);
      setUserInfo(null);
      throw new Error(errMessages[code] || message);
    }
  };

  return {
    userInfo,
    checkSignInStatus,
    getCurrentUserInfo,
    signIn,
    signOut,
  };
};

export default useGoogleLogin;
