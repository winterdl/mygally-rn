import React from 'react';

import Header from 'components/Header';
import {FloatingButton} from 'components/common';
import Post from 'components/Post';

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

const GroupScreen = ({navigation}) => {
  return (
    <Group>
      <Header />
      <PostList>
        <Divider />
        <Post />
        <Post />
        <Post />
        <Post />
      </PostList>
      <FloatingButton onPress={() => navigation.navigate('PostDetail')} />
    </Group>
  );
};

export default GroupScreen;
