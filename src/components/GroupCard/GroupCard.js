import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const GroupCardWrapper = styled.Pressable`
  padding: 16px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  flex: 1;
  margin: 7px;
  min-height: 150px;
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.Text`
  margin-top: 6px;
  color: ${Colors.fontColor};
  font-size: 19px;
  font-weight: 700;
  overflow: hidden;
`;

const Count = styled.Text`
  margin-top: 6px;
  color: #9da6c3;
  font-size: 15px;
  padding-left: 5px;
`;

const GroupCard = ({
  name,
  icon,
  count,
  groupIcon,
  color,
  empty = false,
  onClick,
  ...props
}) => {
  return (
    <GroupCardWrapper
      android_ripple={{color: 'lightgray'}}
      disabled={empty}
      style={{
        elevation: 1,
      }}
      {...props}>
      <View>
        {icon && <Icon name={icon} size={35} color={Colors.fontColor} />}
      </View>

      <Title numberOfLines={1}> {name} </Title>
      <Count>{count >= 0 ? `${count} items` : ''} </Count>
    </GroupCardWrapper>
  );
};

export default GroupCard;
