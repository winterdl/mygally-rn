import React from 'react';
import {View, Text, Pressable} from 'react-native';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const PostWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Time = styled.View`
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Month = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${Colors.fontColor};
`;

const Day = styled.Text`
  color: ${Colors.fontColor};
`;

const Divider = styled.View`
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

const Wrapper = styled.Pressable`
  padding: 0 16px 16px 16px;
  width: 80%;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 10px;
  background: white;
`;

const Title = styled.Text` 
  font-weight : bold; 
  color : ${Colors.fontColor} 
  margin-bottom : 10px; 
  font-size : 16px;
`;

const Content = styled.Text`
  font-size: 14px;
  color: rgb(118, 124, 131);
`;

const Post = ({date, title, content, images, onPress}) => {
  return (
    <PostWrapper>
      <Time>
        <Month> Feb</Month>
        <Day> 03</Day>
      </Time>
      <Divider>
        <Dot></Dot>
      </Divider>

      <Wrapper android_ripple={{color : 'lightgray'}} onPress={onPress}>
        <Title numberOfLines={1}> {title} </Title>
        <Content numberOfLines={1}> {content}</Content>
      </Wrapper>
    </PostWrapper>
  );
};

export default Post;
