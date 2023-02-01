import * as React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {NIKE_SHOES_IMAGE} from '../../constants/imageConstants';
import {
  Container,
  Image,
  BottomText,
  DotsContainer,
  DotsComponent,
  ItemCenterContainer,
  HomeBottomItemContainer,
  PercentageText,
} from './carouselStyles';

interface CarouselProps {
  height?: number;
  isProduct?: boolean;
  imagesArr?: Array<string>;
  showDummy?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}
const width = Dimensions.get('window').width;

function CarouselComponent(props: CarouselProps) {
  const {
    imagesArr = [...new Array(3).keys()],
    height = verticalScale(width / 2 - (props?.isProduct ? 50 : 20)),
    isProduct = false,
    showDummy = true,
    autoPlay = true,
    loop = true,
  } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const w = moderateScale(width) - moderateScale(63);
  const renderDots = () => {
    return (
      <DotsContainer>
        <DotsComponent length={imagesArr?.length} active={activeIndex} />
      </DotsContainer>
    );
  };
  const homeBottomView = () => {
    return (
      <HomeBottomItemContainer>
        <BottomText>
          Get <PercentageText>40%</PercentageText> off for all items
        </BottomText>
      </HomeBottomItemContainer>
    );
  };
  return (
    <Container height={height} isProduct={isProduct}>
      <Carousel
        loop={loop}
        width={isProduct ? w : width}
        height={isProduct ? height - 30 : height - 50}
        parallaxScrollingOffset={50}
        autoPlay={autoPlay}
        autoPlayInterval={9000}
        keyExtractor={item => item}
        data={imagesArr}
        onSnapToItem={newIndex => setActiveIndex(newIndex)}
        scrollAnimationDuration={1500}
        mode={'default'}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
          parallaxScrollingScale: 0.94,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({index, item}) => (
          <>
            <ItemCenterContainer>
              <Image
                width={isProduct ? w - 10 : width - 30}
                height={height - (isProduct ? 0 : 120)}
                source={
                  isProduct
                    ? {
                        uri: showDummy
                          ? `https://picsum.photos/id/${index * 20}/200/300`
                          : item,
                      }
                    : NIKE_SHOES_IMAGE
                }
              />
            </ItemCenterContainer>
            {!isProduct && homeBottomView()}
          </>
        )}
      />
      {renderDots()}
    </Container>
  );
}

export default CarouselComponent;
