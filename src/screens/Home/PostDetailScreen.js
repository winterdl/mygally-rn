import React, {useLayoutEffect, useEffect, useState} from 'react';
import {View, Text, Pressable, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';

import {dateFormat, timeFormat} from 'constants/App';

import {usePosts} from 'hooks/usePosts';

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

const DateInfo = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Date = styled.Text`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
`;

const Time = styled.Text`
  font-size: 15px;
  letter-spacing: 1px;
`;

const PostDetailScreen = ({route, navigation}) => {
  const {groupId, isEditMode = false, post = {}} = route.params;
  console.log('<PostDetailScreen /> params ', groupId, isEditMode, post);
  const {createPost, updatePost} = usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const date = isEditMode ? new moment(post.date) : new moment();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{marginRight: 5, padding: 5}}
          android_ripple={{color: 'lightgray'}}>
          <Icon name="photo-camera" size={30} />
        </Pressable>
      ),
      headerTitle: () => (
        <DateInfo>
          <Date> {date.format(dateFormat)} </Date>
          <Time> {date.format(timeFormat)}</Time>
        </DateInfo>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    if (!isEditMode) return;

    const {title, content} = post;
    setTitle(title);
    setContent(content);
  }, []);

  const handleSavePost = async () => {
    if (!content.trim()) {
      ToastAndroid.show('내용을 입력해주세요', ToastAndroid.SHORT);
      return;
    }

    const params = {
      groupId: parseInt(groupId),
      date: new moment().toDate().toUTCString(),
      title,
      content,
      images: '',
    };

    const query = await (isEditMode
      ? updatePost({...params, postId: parseInt(post.id)})
      : createPost(params));
    console.log('create post', post);

    if (query.error) {
      ToastAndroid.show(
        '일시적인 에러가 발생했습니다. 다시 시도해 주세요.',
        ToastAndroid.SHORT,
      );
      return;
    }

    ToastAndroid.show('글을 저장했어요 :)', ToastAndroid.SHORT);
    navigation.goBack();
  };

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
        value={title}
        onChangeText={(value) => setTitle(value)}
      />
      <Content
        editable
        multiline
        placeholder="내용을 입력해 주세요 :)"
        autoCorrect={false}
        value={content}
        onChangeText={(value) => setContent(value)}
      />

      <Button title="Save" onPress={handleSavePost} />
    </PostDetail>
  );
};

export default PostDetailScreen;
