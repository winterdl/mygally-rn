import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import AppStack from './AppStack';
import PINScreen from './Settings/PINScreen';
import {PIN_CODE_ENTER, PIN_INITIAL_LAUNCH} from '../constants/App';

import {AuthContext} from 'contexts/AuthContext';

import {hasUserSetPinCode} from '@haskkor/react-native-pincode';

const Stack = createStackNavigator();
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PINSCreen"
      component={PINScreen}
      options={{headerShown: false}}
      initialParams={{status: PIN_CODE_ENTER, pinType: PIN_INITIAL_LAUNCH}}
    />
  </Stack.Navigator>
);

const RootStack = () => {
  const {isAppLocked, setIsAppLocked} = React.useContext(AuthContext);

  useEffect(() => {
    AppState.addEventListener('change', onAppStateChange);

    return () => AppState.removeEventListener('change', onAppStateChange);
  }, []);

  const onAppStateChange = async (nextAppState) => {
    //lock application when pincode is set and app goes background
    if (nextAppState === 'background') {
      const hasPinCode = await hasUserSetPinCode();
      if (hasPinCode) setIsAppLocked(true);
    }
  };

  return isAppLocked ? <AuthStack /> : <AppStack />;
};

export default RootStack;
