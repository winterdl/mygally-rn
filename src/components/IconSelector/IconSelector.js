import React from 'react';
import {Pressable} from 'react-native';
import {Icon} from 'react-native-elements';

import {icons} from './Icons';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const IconList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const IconSelector = ({onSelect, selected}) => {
  return (
    <IconList>
      {icons.map((iconName) => (
        <Pressable
          android_ripple={{color: Colors['primary-100']}}
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: iconName === selected ? Colors.active : 'lightgray',
            borderStyle: 'solid',
            borderRadius: 10,
            overflow: 'hidden',
            width: 50,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 1,
          }}
          onPress={() => onSelect(iconName)}>
          <Icon
            name={iconName}
            type="material"
            size={30}
            color={iconName === selected ? Colors.active : 'lightgray'}
          />
        </Pressable>
      ))}
    </IconList>
  );
};

export default IconSelector;
