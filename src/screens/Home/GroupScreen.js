import React, {useEffect} from 'react';
import {HeaderBackButton} from '@react-navigation/stack';

import Header from 'components/Header';
import {FloatingButton} from 'components/common';
import Post from 'components/Post';

import {usePosts} from 'hooks/usePosts';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const Group = styled.View`
  background-color: ${Colors.backgroundColor};
  height: 100%;
`;

const PostList = styled.View`
  padding: 20px;
  height: 100%;
  position: relative;
`;

const Divider = styled.View`
  position: absolute;
  width: 2px;
  left: 65px;
  height: 100%;
  background: ${Colors['primary-100']};
`;

const GroupScreen = ({route, navigation}) => {
  console.log('GroupScreen', route, route.params);
  const {postList, getPostList} = usePosts();
  const {
    group: {id},
  } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPostList(id);
    });
    console.log('>>postlist<<',postList);
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
      />
      <PostList>
        <Divider />
        <Post />
        <Post />
        <Post />
        <Post />
      </PostList>
      <FloatingButton
        onPress={() => navigation.navigate('PostDetail', {groupId: id})}
      />
    </Group>
  );
};

export default GroupScreen;
