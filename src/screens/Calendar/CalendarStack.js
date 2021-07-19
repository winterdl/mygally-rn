import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CalendarScreen from './CalendarScreen';
import PostDetailScreen from '../Home/PostDetailScreen';

const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};
export default CalendarStack;
