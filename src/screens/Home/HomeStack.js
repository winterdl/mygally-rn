import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={Home} />
      {/* <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen name="Group" component={GroupStack} /> */}
    </Stack.Navigator>
  );
};
export default HomeStack;
