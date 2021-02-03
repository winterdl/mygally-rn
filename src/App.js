import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './screens/RootStack';

import {DatabaseProvider} from 'contexts/DatabaseContext';

import 'react-native-gesture-handler';

function App() {
  return (
    <NavigationContainer>
      <DatabaseProvider>
        <RootStack />
      </DatabaseProvider>
    </NavigationContainer>
  );
}

export default App;
