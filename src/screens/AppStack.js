import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeStack from './Home/HomeStack';
import CalendarStack from './Calendar/CalendarStack';
import SettingsStack from './Settings/SettingsStack';

import Colors from 'datas/Colors';

const Tab = createBottomTabNavigator();

const hideTabRoutes = ['PostDetail'];
const RootStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (hideTabRoutes.includes(routeName)) return false;

    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.active,
        inactiveTintColor: Colors['primary-100'],
        style: {
          borderWidth: 0.5,
          borderBottomWidth: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderColor: 'transparent',
          overflow: 'hidden',
          height: 60,
        },
        tabStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          zIndex: 110,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={() => ({
          tabBarIcon: ({color}) => (
            <Icon name="folder" size={24} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={({route}) => ({
          tabBarIcon: ({color}) => (
            <Icon name="date-range" size={24} color={color} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;
