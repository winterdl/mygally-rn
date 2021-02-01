import React, {useLayoutEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const PostDetail = styled.View`
  background-color: white;
  height: 100%;
  padding: 20px;
`;

const Title = styled.TextInput`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.fontColor};
`;

const Content = styled.TextInput`
  font-size: 18px;
  color: ${Colors.fontColor};
  height: 80%;
  margin-bottom: 20px;
  text-align-vertical: top;
`;

const PostDetailScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{marginRight: 5, padding: 5}}
          android_ripple={{color: 'lightgray'}}>
          <Icon name="photo-camera" size={30} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <PostDetail>
      <View>
        <Text> Images .. . </Text>
      </View>

      <Title
        editable
        autoFocus
        numberOfLines={1}
        placeholder="제목없음"
        autoCorrect={false}
      />
      <Content
        editable
        multiline
        placeholder="내용을 입력해 주세요 :)"
        autoCorrect={false}
      />

      <Button title="Save" />
    </PostDetail>
  );
};

export default PostDetailScreen;
