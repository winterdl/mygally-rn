import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import GroupCreate from './GroupCreate';
import GroupStack from './GroupStack';
import {horizontalAnimation} from 'utils/Animations';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={horizontalAnimation}>
      <Stack.Screen
        name="Index"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen
        name="Group"
        component={GroupStack}
        options={{headerShown: false, horizontalAnimation}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
