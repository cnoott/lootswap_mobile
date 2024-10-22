import React, {useEffect, FC, useRef, useState} from 'react';
import {Dimensions, Animated} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  ImageGuideContainer,
  ImageGuideModalStyles,
  ImageGuideTitleText,
  ImageGuideDescText,
  ImageGuidePhotosContainer,
  ImageGuidePhotoContainer,
  ImageGuide,
  ImageGuideLabel,
} from './styles';
import {DotsContainer, DotsComponent} from '../Carousel/carouselStyles';
import {TRADE_MODAL_CLOSE_BUTTON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {CloseTouchable} from '../commonComponents/LSModalStyles';
import Carousel from 'react-native-reanimated-carousel';
import {moderateScale} from 'react-native-size-matters';
import {
  PHOTO_GUIDE_BACK,
  PHOTO_GUIDE_FRONT,
  PHOTO_GUIDE_INNER,
  PHOTO_GUIDE_LABEL,
  PHOTO_GUIDE_OUTER,
  PHOTO_GUIDE_SOLE,
  PHOTO_GUIDE_INSOLE,
  PHOTO_GUIDE_BOX,
  PHOTO_GUIDE_INSIDE_BOX,
  PHOTO_GUIDE_SHIRT_FRONT,
  PHOTO_GUIDE_SHIRT_BACK,
  PHOTO_GUIDE_SHIRT_TAG,
  PHOTO_GUIDE_HAT_FRONT,
  PHOTO_GUIDE_HAT_BACK,
  PHOTO_GUIDE_HAT_TAG,
} from '../../constants/imageConstants';
import ImageView from 'react-native-image-viewing';

interface ImageGuideComponentProps {
  isVisible: boolean;
  onClose: Function;
  category: String;
}

const images = [
  PHOTO_GUIDE_OUTER,
  PHOTO_GUIDE_INNER,
  PHOTO_GUIDE_FRONT,
  PHOTO_GUIDE_BACK,
  PHOTO_GUIDE_LABEL,
  PHOTO_GUIDE_INSOLE,
  PHOTO_GUIDE_SOLE,
  PHOTO_GUIDE_BOX,
  PHOTO_GUIDE_INSIDE_BOX,
];

export const ImageGuideComponent: FC<ImageGuideComponentProps> = props => {
  const {isVisible, onClose, category} = props;
  const {height, width} = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerVisible, setViewerVisible] = useState(false);

  const w = moderateScale(width) - moderateScale(63);

  const translateY = useRef(new Animated.Value(isVisible ? 0 : height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleClose = () => {
    onClose();
    Animated.timing(translateY, {
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderDots = () => {
    if (category === 'shoes' || category === 'other') {
      return (
        <DotsContainer>
          <DotsComponent
            length={3}
            active={currentIndex}
            isActiveBorder={true}
          />
        </DotsContainer>
      );
    }
    return <></>;
  };

  const handlePressImage = (index: Number) => {
    if (category !== 'shoes') {
      return;
    }
    setCurrentImage(index);
    setViewerVisible(true);
  };

  const clothingImageGuide = () => (
    <ImageGuidePhotosContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(0)}>
        <ImageGuide source={PHOTO_GUIDE_SHIRT_FRONT} />
        <ImageGuideLabel>Front</ImageGuideLabel>
      </ImageGuidePhotoContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(1)}>
        <ImageGuide source={PHOTO_GUIDE_SHIRT_BACK} />
        <ImageGuideLabel>Back</ImageGuideLabel>
      </ImageGuidePhotoContainer>

      <ImageGuidePhotoContainer onPress={() => handlePressImage(2)}>
        <ImageGuide source={PHOTO_GUIDE_SHIRT_TAG} />
        <ImageGuideLabel>Tag</ImageGuideLabel>
      </ImageGuidePhotoContainer>
    </ImageGuidePhotosContainer>
  );

  const hatsImageGuide = () => (
    <ImageGuidePhotosContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(0)}>
        <ImageGuide source={PHOTO_GUIDE_HAT_FRONT} />
        <ImageGuideLabel>Front</ImageGuideLabel>
      </ImageGuidePhotoContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(1)}>
        <ImageGuide source={PHOTO_GUIDE_HAT_BACK} />
        <ImageGuideLabel>Back</ImageGuideLabel>
      </ImageGuidePhotoContainer>

      <ImageGuidePhotoContainer onPress={() => handlePressImage(2)}>
        <ImageGuide source={PHOTO_GUIDE_HAT_TAG} />
        <ImageGuideLabel>Tag</ImageGuideLabel>
      </ImageGuidePhotoContainer>
    </ImageGuidePhotosContainer>
  );

  const stepOne = () => (
    <ImageGuidePhotosContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(0)}>
        <ImageGuide source={PHOTO_GUIDE_OUTER} />
        <ImageGuideLabel>Outer Side</ImageGuideLabel>
      </ImageGuidePhotoContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(1)}>
        <ImageGuide source={PHOTO_GUIDE_INNER} />
        <ImageGuideLabel>Inner Side</ImageGuideLabel>
      </ImageGuidePhotoContainer>

      <ImageGuidePhotoContainer onPress={() => handlePressImage(2)}>
        <ImageGuide source={PHOTO_GUIDE_FRONT} />
        <ImageGuideLabel>Front</ImageGuideLabel>
      </ImageGuidePhotoContainer>
    </ImageGuidePhotosContainer>
  );

  const stepTwo = () => (
    <ImageGuidePhotosContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(3)}>
        <ImageGuide source={PHOTO_GUIDE_BACK} />
        <ImageGuideLabel>Heel</ImageGuideLabel>
      </ImageGuidePhotoContainer>

      <ImageGuidePhotoContainer onPress={() => handlePressImage(4)}>
        <ImageGuide source={PHOTO_GUIDE_LABEL} />
        <ImageGuideLabel>Size Tag</ImageGuideLabel>
      </ImageGuidePhotoContainer>

      <ImageGuidePhotoContainer onPress={() => handlePressImage(5)}>
        <ImageGuide source={PHOTO_GUIDE_INSOLE} />
        <ImageGuideLabel>Insoles</ImageGuideLabel>
      </ImageGuidePhotoContainer>
    </ImageGuidePhotosContainer>
  );

  const stepThree = () => (
    <ImageGuidePhotosContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(6)}>
        <ImageGuide source={PHOTO_GUIDE_SOLE} />
        <ImageGuideLabel>Soles</ImageGuideLabel>
      </ImageGuidePhotoContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(7)}>
        <ImageGuide source={PHOTO_GUIDE_BOX} />
        <ImageGuideLabel>Box Label</ImageGuideLabel>
      </ImageGuidePhotoContainer>
      <ImageGuidePhotoContainer onPress={() => handlePressImage(8)}>
        <ImageGuide source={PHOTO_GUIDE_INSIDE_BOX} />
        <ImageGuideLabel>Details & Flaws (optional)</ImageGuideLabel>
      </ImageGuidePhotoContainer>
    </ImageGuidePhotosContainer>
  );

  const renderCarouselStep = (index: number) => {
    switch (index) {
      case 1:
        return stepOne();
      case 2:
        return stepTwo();
      case 3:
        return stepThree();
    }
  };

  const renderOptions = () => {
    switch (category) {
      case 'other':
      case 'shoes':
        return (
          <Carousel
            loop={true}
            width={w}
            autoPlay={false}
            keyExtractor={item => item}
            data={[1, 2, 3]}
            scrollAnimationDuration={400}
            onSnapToItem={newIndex => setCurrentIndex(newIndex)}
            mode={'default'}
            modeConfig={{
              snapDirection: 'left',
              stackInterval: 18,
              parallaxScrollingScale: 0.94,
              parallaxScrollingOffset: 50,
            }}
            renderItem={({index, item}) => renderCarouselStep(index + 1)}
          />
        );

      case 'shirts':
      case 'jackets':
      case 'hoodies':
      case 'crewnecks':
      case 'pants':
      case 'shorts':
        return clothingImageGuide();
      case 'hats':
        return hatsImageGuide();
    }
  };

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: '50%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          transform: [{translateY}],
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}>
      {renderDots()}
      <ImageGuideContainer>
        <CloseTouchable onPress={() => handleClose()}>
          <SvgXml xml={TRADE_MODAL_CLOSE_BUTTON} />
        </CloseTouchable>
        <ImageGuideTitleText>Photo Guide</ImageGuideTitleText>
        <ImageGuideDescText>
          Include 8 of the following images so that your listing can be
          authenticated.
        </ImageGuideDescText>
        <ImageView
          images={images}
          imageIndex={currentImage}
          visible={viewerVisible}
          onRequestClose={() => setViewerVisible(false)}
        />
        {renderOptions()}
      </ImageGuideContainer>
    </Animated.View>
  );
};

export default ImageGuideComponent;
