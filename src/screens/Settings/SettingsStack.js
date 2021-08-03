import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';
import DataSyncScreen from './DataSyncScreen';
import LockStack from './LockStack';
import ThemeScreen from './ThemeScreen';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={SettingsScreen} />
      <Stack.Screen name="DataSyncScreen" component={DataSyncScreen} />
      <Stack.Screen name="LockHomeScreen" component={LockStack} />
      <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
    </Stack.Navigator>
  );
};
export default SettingsStack;
