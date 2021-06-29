import React from 'react';
import {ScrollView, Dimensions, Image, View, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import styled from 'styled-components';

const ITEM_WIDTH = Dimensions.get('window').width * 0.8 - 10; //takes 80% of current width
const ITEM_HEIGHT = Dimensions.get('window').height * 0.2; //takes 20% of current height

const DeleteButton = styled.View`
  position: absolute;
  top: 10;
  right: 10;
`;
const Carousel = ({items, onDelete}) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      decelerationRate={0}
      snapToInterval={ITEM_WIDTH + 10}>
      {items.map((item, i) => (
        <View key={item}>
          <Image
            source={{uri: item}}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              aspectRatio: 1.5,
              margin: 5,
              borderRadius: 15,
            }}
          />
          <DeleteButton>
            <Icon
              name="close"
              type="material"
              color={'#00000070'}
              onPress={() => onDelete(i)}
              raised
              reverse
              size={15}
              containerStyle={{
                backgroundColor: '#00000070',
                height: 20,
                width: 20,
                borderRadius: 50,
                padding: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </DeleteButton>
        </View>
      ))}
    </ScrollView>
  );
};

export default Carousel;
