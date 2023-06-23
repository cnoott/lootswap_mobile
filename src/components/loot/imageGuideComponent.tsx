import React, {FC} from 'react';
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
import {LSModal} from '../commonComponents/LSModal';
import {
  PHOTO_GUIDE_BACK,
  PHOTO_GUIDE_FRONT,
  PHOTO_GUIDE_INNER,
  PHOTO_GUIDE_LABEL,
  PHOTO_GUIDE_OUTER,
  PHOTO_GUIDE_SOLE,
} from '../../constants/imageConstants';

export const ImageGuideComponent: FC<{}> = props => {
  const {isVisible, closeModal = () => {}} = props;
  return (
    <LSModal
      isVisible={isVisible}
      style={ImageGuideModalStyles}
      onBackdropPress={closeModal}
    >
      <LSModal.BottomContainer>
        <ImageGuideContainer>
          <ImageGuideTitleText>
            Photo Guide
          </ImageGuideTitleText>
          <ImageGuideDescText>
            Include all of the following images so your listing can be authenticated
          </ImageGuideDescText>
        <ImageGuidePhotosContainer>
          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_OUTER} />
            <ImageGuideLabel>Outer Side</ImageGuideLabel>
          </ImageGuidePhotoContainer>

          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_INNER} />
            <ImageGuideLabel>Inner Side</ImageGuideLabel>
          </ImageGuidePhotoContainer>

          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_FRONT} />
            <ImageGuideLabel>Front</ImageGuideLabel>
          </ImageGuidePhotoContainer>

          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_BACK} />
            <ImageGuideLabel>Heel</ImageGuideLabel>
          </ImageGuidePhotoContainer>

          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_LABEL} />
            <ImageGuideLabel>Size Tag</ImageGuideLabel>
          </ImageGuidePhotoContainer>

          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_SOLE} />
            <ImageGuideLabel>Insoles</ImageGuideLabel>
          </ImageGuidePhotoContainer>

          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_SOLE} />
            <ImageGuideLabel>Details & Flaws</ImageGuideLabel>
          </ImageGuidePhotoContainer>

          <ImageGuidePhotoContainer>
            <ImageGuide source={PHOTO_GUIDE_SOLE} />
            <ImageGuideLabel>Soles</ImageGuideLabel>
          </ImageGuidePhotoContainer>

        </ImageGuidePhotosContainer>


        </ImageGuideContainer>
    <LSModal.CloseButton onCloseButtonPress={() => closeModal()} />
    </LSModal.BottomContainer>
    </LSModal>
  );
};

export default ImageGuideComponent;
