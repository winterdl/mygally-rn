import React from 'react';
import {View, Text} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from 'components/Header';

import styled from 'styled-components';
import Colors from 'datas/Colors';

import menu from 'datas/SettingsMenu';

const Settings = styled.View`
  padding: 25px;
  background-color: ${Colors.backgroundColor};
  height: 100%;
`;
const Menu = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const MenuTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #424242;
  letter-spacing: 1px;
`;

const MenuItem = styled.Pressable`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
`;

const MenuItemName = styled.Text`
  margin-left: 5px;
  color: ${Colors.fontColor};
  flex: 1;
`;

const GroupCard = ({group}) => {
  const {groupName, menuItems} = group;

  return (
    <Menu elevation={2}>
      <MenuTitle> {groupName} </MenuTitle>
      {menuItems.map(({name, icon, routeTo}, i) => (
        <View>
          <MenuItem android_ripple={{color: 'lightgray'}}>
            <Icon name={icon} size={25} color={Colors.fontColor} />
            <MenuItemName> {name}</MenuItemName>
            {routeTo && <Icon name="chevron-right" size={25} color="#9e9e9e" />}
          </MenuItem>
          {i !== menuItems.length - 1 && <Divider />}
        </View>
      ))}
    </Menu>
  );
};

const SettingsScreen = ({navigation}) => {
  return (
    <View>
      <Header
        headerLeft={
          <HeaderBackButton
            style={{marginLeft: 0, marginRight: 0}}
            onPress={() => navigation.goBack()}
          />
        }
        headerTitle={'Settings'}
        searchVisible={false}
      />
      <Settings>
        {menu.map((group) => (
          <GroupCard group={group} />
        ))}
      </Settings>
    </View>
  );
};

export default SettingsScreen;
