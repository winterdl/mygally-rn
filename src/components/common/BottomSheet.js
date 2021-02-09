import React from 'react';
import {View,Text} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import styled from 'styled-components';

const BottomSheet = React.forwardRef((props, ref) => (
  <BottomSheetModalProvider>
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={[0, 300]}
      onChange={() => {}}>
      <View>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheetModal>
  </BottomSheetModalProvider>
));

export default BottomSheet;
