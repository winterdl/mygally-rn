import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './screens/RootStack';

import 'react-native-gesture-handler';

function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
