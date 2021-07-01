import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';

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

const PostWrapper = styled.View`
  height: 100%;
  flex : 1;
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
      <PostWrapper>
        <Divider />
        <PostList
          data={postList}
          renderItem={({item}) => (
            <Post
              date={item.date}
              title={item.title}
              content={item.content}
              images={item.images}
              onPress={() =>
                navigation.navigate('PostDetail', {
                  groupId: id,
                  isEditMode: true,
                  post: item,
                })
              }
            />
          )}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </PostWrapper>
      <FloatingButton
        onPress={() => navigation.navigate('PostDetail', {groupId: id})}
      />
    </Group>
  );
};

export default GroupScreen;
