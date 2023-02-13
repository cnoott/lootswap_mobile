import * as React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {LSHomeStepOneCarouselItem} from './HomeItems/StepOneHomeItem';
import {LSHomeStepTwoCarouselItem} from './HomeItems/StepTwoHomeItem';
import {LSHomeStepThreeCarouselItem} from './HomeItems/StepThreeHomeItem';
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
  isHome?: boolean;
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
    isHome = false,
    showDummy = true,
    autoPlay = true,
    loop = true,
  } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const w = moderateScale(width) - moderateScale(63);
  const renderDots = () => {
    return (
      <DotsContainer>
        <DotsComponent
          length={imagesArr?.length}
          active={activeIndex}
          isActiveBorder={!isProduct}
        />
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
  const getHomeCarouselStep = (index: number) => {
    switch (index) {
      case 1:
        return <LSHomeStepOneCarouselItem />;
      case 2:
        return <LSHomeStepTwoCarouselItem />;
      case 3:
        return <LSHomeStepThreeCarouselItem />;
      default:
        return <LSHomeStepOneCarouselItem />;
    }
  };
  return (
    <Container height={height} isProduct={isProduct}>
      <Carousel
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={loop}
        width={isProduct ? w : width}
        height={isProduct ? height - 30 : height - 5}
        parallaxScrollingOffset={50}
        autoPlay={autoPlay}
        autoPlayInterval={10000}
        keyExtractor={item => item}
        data={imagesArr}
        onSnapToItem={newIndex => setActiveIndex(newIndex)}
        scrollAnimationDuration={400}
        mode={'default'}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
          parallaxScrollingScale: 0.94,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({index, item}) =>
          isHome ? (
            getHomeCarouselStep(index + 1)
          ) : (
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
          )
        }
      />
      {renderDots()}
    </Container>
  );
}

export default CarouselComponent;
