import * as React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {Container, Image} from './carouselStyles';

interface CarouselProps {
  height?: number;
  isProduct?: boolean;
}
const width = Dimensions.get('window').width;

function CarouselComponent(props: CarouselProps) {
  const {height = verticalScale(width / 2 - 50), isProduct = false} = props;
  const w = moderateScale(width) - moderateScale(63);
  return (
    <Container height={height}>
      <Carousel
        loop
        width={w}
        height={height}
        autoPlay={true}
        keyExtractor={item => item}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={2500}
        mode={isProduct ? 'horizontal-stack' : 'parallax'}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
        renderItem={({index}) => (
          <Image
            width={isProduct ? w - 20 : w}
            height={height}
            source={{uri: `https://picsum.photos/id/${index * 20}/200/300`}}
          />
        )}
      />
    </Container>
  );
}

export default CarouselComponent;
