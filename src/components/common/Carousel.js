import React from 'react';
import {ScrollView, Dimensions, Image} from 'react-native';

const ITEM_WIDTH = Dimensions.get('window').width * 0.8 - 10; //takes 80% of current width
const ITEM_HEIGHT = Dimensions.get('window').height * 0.2; //takes 20% of current height

console.log(Dimensions.get('window').width, ITEM_WIDTH);
const Carousel = ({items}) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      decelerationRate={0}
      snapToInterval={ITEM_WIDTH + 10}>
      {items.map((item) => (
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
      ))}
    </ScrollView>
  );
};

export default Carousel;
