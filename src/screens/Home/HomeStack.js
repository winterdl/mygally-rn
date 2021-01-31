import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function Home() {
  return <Text> Home!</Text>;
}
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Index" component={Home} />
      {/* <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen name="Group" component={GroupStack} /> */}
    </Stack.Navigator>
  );
};
export default HomeStack;
