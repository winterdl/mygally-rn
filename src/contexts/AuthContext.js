import React, {useContext, useState, createContext, useEffect} from 'react';

import {hasUserSetPinCode} from '@haskkor/react-native-pincode';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAppLocked, setIsAppLocked] = useState(false);

  useEffect(() => {
    const getAppLockState = async () => {
      const hasPinCode = await hasUserSetPinCode();
      setIsAppLocked(hasPinCode);
    };
    getAppLockState();
  }, []);

  return (
    <AuthContext.Provider value={{isAppLocked, setIsAppLocked}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
