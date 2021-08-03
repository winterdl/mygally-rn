import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './screens/RootStack';

import {DatabaseProvider} from 'contexts/DatabaseContext';
import {ModalProvider} from 'contexts/ModalContext';
import {AuthProvider} from 'contexts/AuthContext';
import 'react-native-gesture-handler';

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ModalProvider>
          <DatabaseProvider>
            <RootStack />
          </DatabaseProvider>
        </ModalProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
