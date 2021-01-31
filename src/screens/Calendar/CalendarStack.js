import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function Calendar() {
  return <Text> Calendar!</Text>;
}

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Index" component={Calendar} />
    </Stack.Navigator>
  );
};
export default CalendarStack;
