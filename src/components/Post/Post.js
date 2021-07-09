import React from 'react';
import {View, Image} from 'react-native';

import styled from 'styled-components';
import Colors from 'datas/Colors';
import {APP_DIRECTORY} from 'constants/App';

const Wrapper = styled.Pressable`
  padding: 0 16px 16px 16px;
  width: 77%;
  border-radius: 5px;
  padding: 10px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const Post = ({title, content, images, style = {}, onPress}) => {
  const thumbNail = images ? images.split(',')[0] : null;

  return (
    <Wrapper
      android_ripple={{color: 'lightgray'}}
      elevation={5}
      style={{
        ...style,
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

      {thumbNail && (
        <Image
          source={{
            uri: `file://${APP_DIRECTORY}/${thumbNail}.jpg`,
          }}
          style={{
            aspectRatio: 1.5,
            borderRadius: 10,
          }}
        />
      )}
    </Wrapper>
  );
};

export default Post;
