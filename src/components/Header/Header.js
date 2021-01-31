import React from 'react';
import {View, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const HeaderWrapper = styled.View`
  width: 100%;
  padding: 25px;
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
  margin-bottom: 16px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Title>
        <TitleText> Home </TitleText>
        <Text> Button Here </Text>
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
