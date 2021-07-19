import React from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const BottomSheet = React.forwardRef((props, ref) => (
  <BottomSheetModalProvider>
    <BottomSheetModal
      ref={ref}
      index={props.index ?? 1}
      snapPoints={props.snapPoints}
      {...props}>
      {props.children}
    </BottomSheetModal>
  </BottomSheetModalProvider>
));

export default BottomSheet;
