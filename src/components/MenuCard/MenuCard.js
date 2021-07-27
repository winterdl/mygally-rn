import React from 'react';

import MenuItem from './MenuItem';

import styled from 'styled-components';

const Menu = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
`;
const MenuTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #424242;
  letter-spacing: 1px;
`;

const MenuCard = ({group, navigation}) => {
  const {groupName, menuItems} = group;

  return (
    <Menu elevation={2}>
      {groupName && <MenuTitle> {groupName} </MenuTitle>}
      {menuItems.map((item, i) => {
        return (
          <>
            <MenuItem item={item} navigation={navigation} />
            {i !== menuItems.length - 1 && <Divider />}
          </>
        );
      })}
    </Menu>
  );
};

export default MenuCard;
