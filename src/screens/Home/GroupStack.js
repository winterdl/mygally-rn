import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import GroupScreen from './GroupScreen';
import PostDetailScreen from './PostDetailScreen';

const Stack = createStackNavigator();

const GroupStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={GroupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};

export default GroupStack;
