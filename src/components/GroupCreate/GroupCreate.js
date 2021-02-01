import React from 'react';
import {Text, View} from 'react-native';
import {BottomSheet, Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconSelector from 'components/IconSelector';

import styled from 'styled-components';

const GroupCreateWrapper = styled.View`
  background-color: white;
  height: 500px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-color: transparent;
  overflow: hidden;
  padding: 20px;
  display: flex;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Content = styled.View`
  color: blue;
  flex: 1;
  margin-top: 16px;
`;

const PropertyLabel = styled.View`
  padding-left: 4px;
`;

const GroupCreate = ({isVisible, onClose}) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      containerStyle={{
        backgroundColor: 'rgba(0.5,0.25,0,0.2)',
      }}>
      <GroupCreateWrapper>
        <Header>
          <HeaderTitle> Add Group</HeaderTitle>
          <Icon name="close" size={26} onPress={onClose} />
        </Header>

        <Content>
          <GroupProperty title="Name">
            <Input
              placeholder="name ... "
              containerStyle={{paddingHorizontal: 0}}
              inputContainerStyle={{fontSize: '16px'}}
            />
          </GroupProperty>

          <GroupProperty title="Icon">
            <IconSelector onSelect={() => {}} selected={null} />
          </GroupProperty>

          <GroupProperty title="Preview">
            {/* <GroupPreview
            groupTitle={title}
            selected={selectedIcon}
            icons={icons}
          /> */}
          </GroupProperty>
        </Content>

        <Button title="Save" />
      </GroupCreateWrapper>
    </BottomSheet>
  );
};

const GroupProperty = ({title, children}) => (
  <PropertyLabel>
    <Text>{title}</Text>
    {children}
  </PropertyLabel>
);

export default GroupCreate;
