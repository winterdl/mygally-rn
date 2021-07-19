import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

function Settings() {
  return <Text> Settings!</Text>;
}

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
export default SettingsStack;
