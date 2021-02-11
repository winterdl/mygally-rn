import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './screens/RootStack';

import {DatabaseProvider} from 'contexts/DatabaseContext';
import {ModalProvider} from 'contexts/ModalContext';

import 'react-native-gesture-handler';

function App() {
  return (
    <NavigationContainer>
      <ModalProvider>
        <DatabaseProvider>
          <RootStack />
        </DatabaseProvider>
      </ModalProvider>
    </NavigationContainer>
  );
}

export default App;
