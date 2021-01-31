import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeStack from './Home/HomeStack';
import CalendarStack from './Calendar/CalendarStack';
import SettingsStack from './Settings/SettingsStack';

const Tab = createBottomTabNavigator();

const RootStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: () => <Icon name="folder" size={24} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: () => <Icon name="date-range" size={24} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: () => <Icon name="settings" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;
