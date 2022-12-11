import * as React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {Container, Image} from './carouselStyles';

interface CarouselProps {
  height?: number;
  isProduct?: boolean;
  imagesArr?: Array<string>;
  showDummy: boolean;
}
const width = Dimensions.get('window').width;

function CarouselComponent(props: CarouselProps) {
  const {
    imagesArr = [...new Array(6).keys()],
    height = verticalScale(width / 2 - 50),
    isProduct = false,
    showDummy = true,
  } = props;
  const w = moderateScale(width) - moderateScale(63);
  return (
    <Container height={height}>
      <Carousel
        loop
        width={w}
        height={height}
        autoPlay={true}
        keyExtractor={item => item}
        data={imagesArr}
        scrollAnimationDuration={2500}
        mode={isProduct ? 'horizontal-stack' : 'parallax'}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
        renderItem={({index, item}) => (
          <Image
            width={isProduct ? w - 20 : w}
            height={height}
            source={{
              uri: showDummy
                ? `https://picsum.photos/id/${index * 20}/200/300`
                : item,
            }}
          />
        )}
      />
    </Container>
  );
}

export default CarouselComponent;
