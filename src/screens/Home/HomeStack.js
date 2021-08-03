import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import GroupCreate from './GroupCreate';
import GroupStack from './GroupStack';
import PINScreen from '../Settings/PINScreen';

import {horizontalAnimation} from 'utils/Animations';

const Stack = createStackNavigator();

const HomeStack = ({route, navigation}) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: !['GroupCreate', 'PINScreen'].includes(routeName),
    });
  }, [navigation, routeName]);

  return (
    <Stack.Navigator screenOptions={horizontalAnimation}>
      <Stack.Screen
        name="Index"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupCreate"
        component={GroupCreate}
        options={{title: '카테고리 추가'}}
      />
      <Stack.Screen
        name="Group"
        component={GroupStack}
        options={{headerShown: false, horizontalAnimation}}
      />
      <Stack.Screen
        name="PINScreen"
        component={PINScreen}
        options={{headerShown: false, horizontalAnimation}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
