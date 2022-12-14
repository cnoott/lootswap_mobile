import * as React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {Container, Image, BottomText} from './carouselStyles';

interface CarouselProps {
  height?: number;
  isProduct?: boolean;
  imagesArr?: Array<string>;
  showDummy?: boolean;
}
const width = Dimensions.get('window').width;

function CarouselComponent(props: CarouselProps) {
  const {
    imagesArr = [...new Array(6).keys()],
    height = verticalScale(width / 2 - (props?.isProduct ? 50 : 20)),
    isProduct = false,
    showDummy = true,
  } = props;
  const w = moderateScale(width) - moderateScale(63);
  return (
    <Container height={height}>
      <Carousel
        loop
        width={isProduct ? w : width}
        height={height}
        autoPlay={true}
        autoPlayInterval={6000}
        keyExtractor={item => item}
        data={imagesArr}
        scrollAnimationDuration={1500}
        mode={isProduct ? 'horizontal-stack' : 'default'}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
        renderItem={({index, item}) => (
          <>
            <Image
              width={isProduct ? w - 20 : width}
              height={height - (isProduct ? 0 : 50)}
              source={{
                uri: showDummy
                  ? `https://picsum.photos/id/${index * 20}/200/300`
                  : item,
              }}
            />
            {!isProduct && (
              <BottomText>
                Swap Clothing and Sneakers Safely and Securely
              </BottomText>
            )}
          </>
        )}
      />
    </Container>
  );
}

export default CarouselComponent;
