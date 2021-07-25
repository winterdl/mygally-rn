import React from 'react';
import {View} from 'react-native';

import Header from 'components/Header';
import MenuCard from 'components/MenuCard';

import styled from 'styled-components';
import Colors from 'datas/Colors';

import menu from 'datas/SettingsMenu';

const Settings = styled.View`
  padding: 25px;
  background-color: ${Colors.backgroundColor};
  height: 100%;
`;

const SettingsScreen = ({navigation}) => {
  return (
    <View>
      <Header headerTitle={'Settings'} searchVisible={false} />
      <Settings>
        {menu.map((group) => (
          <MenuCard group={group} navigation={navigation} />
        ))}
      </Settings>
    </View>
  );
};

export default SettingsScreen;
