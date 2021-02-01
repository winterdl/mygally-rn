import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconSelector from 'components/IconSelector';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const GroupCreateWrapper = styled.View`
  background-color: white;
  height: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-color: transparent;
  overflow: hidden;
  padding: 20px;
  display: flex;
`;

const Content = styled.View`
  color: blue;
  flex: 1;
  margin-top: 16px;
`;

const GroupPropertyWrapper = styled.View`
  margin-bottom: 16px;
`;

const GroupPreviewWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Preview = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 150px;
  height: 150px;
  border: 1px solid #bdbdbd;
  border-radius: 15px;
  color: ${Colors.fontColor};
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-top : 5px;
`;

const GroupCreate = ({}) => {
  return (
    <GroupCreateWrapper>
      <ScrollView>
        <Content>
          <GroupProperty title="Name">
            <Input
              placeholder="name ... "
              containerStyle={{
                paddingHorizontal: 0,
              }}
              inputContainerStyle={{fontSize: '16px'}}
            />
          </GroupProperty>

          <GroupProperty title="Icon">
            <IconSelector onSelect={() => {}} selected={null} />
          </GroupProperty>

          <GroupProperty title="Preview">
            <GroupPreview />
          </GroupProperty>
        </Content>

        <Button title="Save" />
      </ScrollView>
    </GroupCreateWrapper>
  );
};

const GroupProperty = ({title, children}) => (
  <GroupPropertyWrapper>
    <Text>{title}</Text>
    {children}
  </GroupPropertyWrapper>
);

const GroupPreview = ({title, selected, icons}) => {
  return (
    <GroupPreviewWrapper>
      <Preview>
        <Icon name="home" size={35} />
        <Title> title here</Title>
      </Preview>
    </GroupPreviewWrapper>
  );
};

export default GroupCreate;
