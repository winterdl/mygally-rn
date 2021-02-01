import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

import {icons} from './Icons';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const IconList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap : wrap;
`;
const IconSelector = ({onSelect, selected}) => {
  return (
    <IconList>
      {icons.map((iconName) => (
        <Icon
          name={iconName}
          type="material"
          size={30}
          color="lightgray"
          onPress={onSelect}
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'lightgray',
            borderStyle: 'solid',
            borderRadius: 10,
            overflow: 'hidden',
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin : 1
          }}
        />
      ))}
    </IconList>
  );
};

export default IconSelector;
