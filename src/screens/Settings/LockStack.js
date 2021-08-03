import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import LockHomeScreen from './LockHomeScreen';
import PINScreen from './PINScreen';

const Stack = createStackNavigator();

const LockStack = ({navigation: {dangerouslyGetParent}, route}) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  useEffect(() => {
    const parent = dangerouslyGetParent();
    if (parent) {
      parent.setOptions({
        tabBarVisible: routeName !== 'PINScreen',
      });
    }
  }, [routeName]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={LockHomeScreen} />
      <Stack.Screen name="PINScreen" component={PINScreen} />
    </Stack.Navigator>
  );
};
export default LockStack;
