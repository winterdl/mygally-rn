import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import GroupScreen from './GroupScreen';
import PostDetailScreen from './PostDetailScreen';

const Stack = createStackNavigator();

const GroupStack = ({navigation: {dangerouslyGetParent}, route}) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  useEffect(() => {
    const parent = dangerouslyGetParent();
    if (parent) {
      parent.setOptions({
        tabBarVisible: routeName !== 'PostDetail',
      });
    }
  }, [routeName]);

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
