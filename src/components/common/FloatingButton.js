import React from 'react';
import {Icon} from 'react-native-elements';

import Colors from 'datas/Colors';
const FloatingButton = ({onPress}) => {
  return (
    <Icon
      name="add"
      type="material"
      color={Colors.active}
      onPress={onPress}
      raised
      reverse
      size={30}
      containerStyle={{
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 50,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
      }}
    />
  );
};

export default FloatingButton;
