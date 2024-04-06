import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {LSHomeStepOneCarouselItem} from './HomeItems/StepOneHomeItem';
import {LSHomeStepTwoCarouselItem} from './HomeItems/StepTwoHomeItem';
import {LSHomeStepThreeCarouselItem} from './HomeItems/StepThreeHomeItem';
import {LSHomeStepFourCarouselItem} from './HomeItems/StepFourHomeItem';
import {LSGiveawayHomeItem} from './HomeItems/GiveawayHomeItem';
import {
  Container,
  Image,
  BottomText,
  DotsContainer,
  DotsComponent,
  ItemCenterContainer,
  HomeBottomItemContainer,
  PercentageText,
  SearchBarWrapper,
} from './carouselStyles';
import ImageView from 'react-native-image-viewing';
import {Animated} from 'react-native';

interface CarouselProps {
  height?: number;
  isProduct?: boolean;
  isHome?: boolean;
  imagesArr?: Array<string>;
  showDummy?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  renderSearchBar?: Function;
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
    renderSearchBar = () => <></>,
  } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerVisible, setViewerVisible] = useState(false);

  const [imageLoading, setImageLoading] = useState(true);
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    const animLoop = Animated.loop(blink);
    animLoop.start();

    return () => animLoop.stop();
  }, []);

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

  const renderFullScreenDots = ({imageIndex}) => {
    console.log('IND', imageIndex);
    return (
      <DotsContainer fullScreen={true}>
        <DotsComponent
          length={imagesArr?.length}
          active={imageIndex}
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
        return <LSGiveawayHomeItem />;
      case 2:
        return <LSHomeStepTwoCarouselItem />;
      case 3:
        return <LSHomeStepFourCarouselItem />;
      default:
        return <LSHomeStepFourCarouselItem />;
    }
  };

  const LoadingImage = () => {
    return (
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          backgroundColor: 'lightgrey',
          opacity,
        }}
      />
    );
  };
  return (
    <Container height={height} isProduct={isProduct}>
      <SearchBarWrapper>{renderSearchBar()}</SearchBarWrapper>
      <ImageView
        images={imagesArr.map(image => ({uri: image}))}
        imageIndex={activeIndex}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        FooterComponent={renderFullScreenDots}
      />
      <Carousel
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={loop}
        width={width}
        height={isProduct ? height - 30 : height - 25}
        parallaxScrollingOffset={50}
        autoPlay={false}
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
              <ItemCenterContainer onPress={() => setViewerVisible(true)}>
                <View>
                  {imageLoading && <LoadingImage />}
                  <Image
                    width={'100%'}
                    height={height}
                    source={{uri: item}}
                    onLoad={() => setImageLoading(false)}
                  />
                </View>
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
