import React from 'react';
import {View, Image} from 'react-native';

import moment from 'moment';

import styled from 'styled-components';
import Colors from 'datas/Colors'; 

const PostWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding-left : 20px; 
  padding-right: 20px;
  padding-top: 10px; 
  padding-bottom : 10px;
`;

const Time = styled.View`
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width : 35px;
`;

const Month = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${Colors.fontColor};
  text-align : center;
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
  width: 77%;
  border-radius: 5px;
  padding: 10px;
  background: white; 
  display : flex;
  flex-direction : row;
  justify-content : space-between;
`;

const Title = styled.Text` 
  font-weight : bold; 
  color : ${Colors.fontColor} 
  margin-bottom : 10px; 
  font-size : 16px;
  max-width : 150;
`;

const Content = styled.Text`
  font-size: 14px;
  color: rgb(118, 124, 131);
`;

const Post = ({date, title, content, images, onPress}) => {

  return (
    <PostWrapper>
      <Time>
        <Month> {moment(date).format('MMM')}</Month>
        <Day> {moment(date).format('DD')}</Day>
      </Time>
      <Divider>
        <Dot></Dot>
      </Divider>

      <Wrapper
        android_ripple={{color: 'lightgray'}}
        elevation={5}
        style={{
          shadowColor: 'red',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={onPress}>
        <View>
          <Title numberOfLines={1}> {title} </Title>
          <Content numberOfLines={1}> {content}</Content>
        </View>

      </Wrapper>
    </PostWrapper>
  );
};

export default Post;
