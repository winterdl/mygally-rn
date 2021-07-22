import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components';
import Colors from 'datas/Colors';

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
  height: auto;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: 5px;
`;
const MenuItemName = styled.Text`
  color: ${Colors.fontColor};
`;

const Description = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  color: #696969;
`;

const GroupCard = ({group, navigation}) => {
  const {groupName, menuItems} = group;

  return (
    <Menu elevation={2}>
      {groupName && <MenuTitle> {groupName} </MenuTitle>}
      {menuItems.map((group, i) => {
        const {name, icon, routeTo, children, description, callback} = group;
        return (
          <>
            <MenuItem
              android_ripple={{color: 'lightgray'}}
              onPress={() => {
                routeTo &&
                  navigation.navigate(routeTo, {title: name, children});
                callback && callback();
              }}>
              <Icon name={icon} size={25} color={Colors.fontColor} />
              <Wrapper>
                <MenuItemName> {name}</MenuItemName>
                {description && <Description> {description}</Description>}
              </Wrapper>
              {routeTo && (
                <Icon name="chevron-right" size={25} color="#9e9e9e" />
              )}
            </MenuItem>
            {i !== menuItems.length - 1 && <Divider />}
          </>
        );
      })}
    </Menu>
  );
};

export default GroupCard;
