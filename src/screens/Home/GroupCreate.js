import React, {useState} from 'react';
import {Text, ScrollView, ToastAndroid} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconSelector from 'components/IconSelector';
import {icons} from 'components/IconSelector/Icons';

import {useGroups} from 'hooks';

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
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
`;

const GroupCreate = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(icons[0]);
  const {createGroup} = useGroups();

  const handleSave = async () => {
    if (!title.trim()) {
      ToastAndroid.show('제목을 입력해 주세요.', ToastAndroid.SHORT);
      return;
    }

    const create = await createGroup({title, icon});
    console.log('create group', create);
    if (create.error) {
      ToastAndroid.show(
        '일시적인 에러가 발생했습니다. 다시 시도해주세요.',
        ToastAndroid.SHORT,
    );
      return;
    }

    ToastAndroid.show('그룹을 생성했어요 :)', ToastAndroid.SHORT);
    navigation.goBack();
  };

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
              onChangeText={(value) => setTitle(value)}
            />
          </GroupProperty>

          <GroupProperty title="Icon">
            <IconSelector onSelect={(icon) => setIcon(icon)} selected={icon} />
          </GroupProperty>

          <GroupProperty title="Preview">
            <GroupPreview groupTitle={title} selected={icon} />
          </GroupProperty>
        </Content>

        <Button title="저장" onPress={handleSave} />
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

const GroupPreview = ({groupTitle, selected}) => {
  return (
    <GroupPreviewWrapper>
      <Preview>
        <Icon name={selected} size={35} />
        <Title> {groupTitle || '제목'}</Title>
      </Preview>
    </GroupPreviewWrapper>
  );
};

export default GroupCreate;
