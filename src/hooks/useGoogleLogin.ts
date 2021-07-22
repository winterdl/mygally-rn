import React, {useState, useEffect} from 'react';

import Config from 'react-native-config';
import {GoogleSignin, User, statusCodes} from 'react-native-google-signin';

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
  [SIGN_IN_CANCELLED]: 'user cancelled the login',
  [IN_PROGRESS]: 'signing in...',
  [PLAY_SERVICES_NOT_AVAILABLE]: 'play services not avail',
  [SIGN_IN_REQUIRED]: 'user has not signed in yet',
} as const;

const useGoogleLogin = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_SIGN_IN_CLIENT_ID,
    });
  }, []);

  const checkSignInStatus = async (): Promise<boolean> => {
    const isSignedIn = await GoogleSignin.isSignedIn();

    //TODO: 로그 처리
    if (isSignedIn) {
      console.log('user already signed in');
    } else {
      setUserInfo(null);
      console.log('please login');
    }

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
