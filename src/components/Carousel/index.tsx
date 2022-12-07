import * as React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {Container, Image} from './carouselStyles';

function CarouselComponent() {
  const width = Dimensions.get('window').width;
  const w = moderateScale(width) - moderateScale(63);
  return (
    <Container>
      <Carousel
        loop
        width={w}
        height={verticalScale(width / 2 - 55)}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={2500}
        mode={'parallax'}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <Image
            width={w}
            source={{uri: `https://picsum.photos/id/${index * 20}/200/300`}}
          />
        )}
      />
    </Container>
  );
}

export default CarouselComponent;
