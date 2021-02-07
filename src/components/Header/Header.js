import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderBackButton} from '@react-navigation/stack';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const HeaderWrapper = styled.View`
  width: 100%;
  padding: 20px;
  background-color: white;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const Title = styled.View`
  font-size: 20px;
  color: green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  text-align-vertical: center;
  margin: ${(props) => (props.showBackButton ? '20px' : '0px')};
`;

const Header = ({headerLeft, headerRight, headerTitle}) => {
  return (
    <HeaderWrapper>
      <Title>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {headerLeft}
          <TitleText> {headerTitle || 'Home'} </TitleText>
        </View>
        <Text> {headerRight} </Text>
      </Title>
      <SearchBar
        placeholder="Search"
        round
        showCancel
        lightTheme={true}
        containerStyle={{
          backgroundColor: 'white',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderWidth: 0,
          padding: 0,
          margin: 0,
        }}
        inputContainerStyle={{
          backgroundColor: Colors.backgroundColor,
        }}
      />
    </HeaderWrapper>
  );
};

export default Header;
