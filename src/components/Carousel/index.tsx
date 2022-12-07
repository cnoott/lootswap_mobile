import * as React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {scale, verticalScale} from 'react-native-size-matters';
import {Container, Image} from './carouselStyles';

function CarouselComponent() {
  const width = Dimensions.get('window').width;
  return (
    <Container>
      <Carousel
        loop
        width={scale(width - 110)}
        height={verticalScale(width / 2 - 55)}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        mode={'parallax'}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <Image
            source={{uri: `https://picsum.photos/id/${index * 20}/200/300`}}
          />
        )}
      />
    </Container>
  );
}

export default CarouselComponent;
