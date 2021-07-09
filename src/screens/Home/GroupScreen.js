import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import moment from 'moment';

import Header from 'components/Header';
import {FloatingButton} from 'components/common';
import Post from 'components/Post';

import {usePosts} from 'hooks';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const Group = styled.View`
  background-color: ${Colors.backgroundColor};
  height: 100%;
`;

const Wrapper = styled.View`
  height: 100%;
  flex: 1;
  position: relative;
`;

const Divider = styled.View`
  position: absolute;
  width: 2px;
  left: 70px;
  height: 100%;
  background: ${Colors['primary-100']};
`;

const PostList = styled.FlatList``;

const PostWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Time = styled.View`
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 35px;
`;

const Month = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${Colors.fontColor};
  text-align: center;
`;

const Day = styled.Text`
  color: ${Colors.fontColor};
`;

const DotWrapper = styled.View`
  margin: 0 20px;
  position: relative;
`;

const Dot = styled.View`
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50px;
  border-color: ${Colors['primary-100']};
  border-width: 2px;
  z-index: 2;
  top: 8px;
  right: -2px;
  background-color: white;
`;

const PostView = ({post, onPress}) => {
  return (
    <PostWrapper>
      <Time>
        <Month> {moment(post.date).format('MMM')}</Month>
        <Day> {moment(post.date).format('DD')}</Day>
      </Time>
      <DotWrapper>
        <Dot></Dot>
      </DotWrapper>

      <Post
        date={post.date}
        title={post.title}
        content={post.content}
        images={post.images}
        onPress={onPress}
      />
    </PostWrapper>
  );
};
const GroupScreen = ({route, navigation}) => {
  const {
    group: {id, name},
  } = route.params;
  const {postList, getPostList} = usePosts(id);

  console.log('<GroupScreen/> groupId : ', id);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('>>postlist<<', postList);
      getPostList(id);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Group>
      <Header
        headerLeft={
          <HeaderBackButton
            style={{marginLeft: 0, marginRight: 0}}
            onPress={() => navigation.goBack()}
          />
        }
        headerTitle={name}
      />
      <Wrapper>
        <Divider />
        <PostList
          data={postList}
          renderItem={({item}) => (
            <PostView
              post={item}
              onPress={() =>
                navigation.navigate('PostDetail', {
                  groupId: id,
                  post: item,
                  isEditMode: true,
                })
              }
            />
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </Wrapper>
      <FloatingButton
        onPress={() => navigation.navigate('PostDetail', {groupId: id})}
      />
    </Group>
  );
};

export default GroupScreen;
