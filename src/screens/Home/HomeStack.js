import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import GroupCreate from './GroupCreate';
import GroupStack from './GroupStack';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen
        name="Group"
        component={GroupStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
