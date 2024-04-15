import React, {FC, useRef, useState} from 'react';
import {LSModal} from '../commonComponents/LSModal';
import {
  ModalStyles,
  ModalHeaderText,
  ModalSubText,
  ScrollView,
  Image,
  IconTouchable,
  IconText,
} from './ProductShareModalStyles';
import {
  IG_SHARE,
  IG_STORIES_SHARE,
  IMESSAGE,
  COPY_LINK_ICON,
} from '../../constants/imageConstants';
import {SNAPCHAT_ICON, IMESSAGE_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {CreativeKit} from '@snapchat/snap-kit-react-native';
import ViewShot from 'react-native-view-shot';
import LSProductCard from '../productCard';

import {Share, View} from 'react-native';

interface ProductShareModalProps {
  isVisible: Boolean;
  onCloseModal: Function;
  productDetails: any;
}

export const ProductShareModal: FC<ProductShareModalProps> =
 ({
  isVisible,
  onCloseModal,
  productDetails,
}) => {

  const viewShotRef = useRef();

  const [uri, setUri] = useState('');

  const handleCaptureProductImage = () => {
    viewShotRef.current.capture().then(async uriData => {
      setUri(uriData);
    });
  };

  const handleSnapchatShare = async () => {
    // TODO: handle image loading first
    const photoContent = {
      sticker: {
        uri: `file://${uri.trim()}`,
        posX: 0.5,
        posY: 0.34,
        rotationDegreesInClockwise: 0,
        isAnimated: false,
      },
      caption: 'Get this item on lootswap! (Download on AppStore)',
      attachmentUrl: 'https://download.lootswap.com',
    };


    if (uri) {
      CreativeKit.shareToCameraPreview(photoContent).then(() => {
        console.log('done')
      })
      .catch(err => console.log(err));
    } else {
      setTimeout(() => {
        CreativeKit.shareToCameraPreview(photoContent).then(() => {
          console.log('done')
        }).catch(err => console.log(err));
      }, 1000);
    }
  };

  return (
    <LSModal
      isVisible={isVisible}
      style={ModalStyles}
      onBackdropPress={onCloseModal}>
      <LSModal.BottomContainer>
        <ModalHeaderText>Share Listing</ModalHeaderText>
        <View
          style={{
          position: 'absolute',
          bottom: -999999,
          backgroundColor: 'white',
          borderRadius: 20,
          }}>
          <ViewShot
            ref={viewShotRef}
            options={{format: 'png', quality: 0.9, width: 140, height: 225}}
            captureMode={'none'}
          >
            <LSProductCard
              item={productDetails}
              isHorizontalView={true}
              key={productDetails?._id}
              onImageLoad={handleCaptureProductImage}
            />
          </ViewShot>
        </View>
        <ModalSubText>Share To</ModalSubText>
        <ScrollView horizontal>
          <IconTouchable onPress={handleSnapchatShare}>
            <SvgXml xml={SNAPCHAT_ICON} width={scale(60)} height={scale(60)} />
            <IconText>Snapchat</IconText>
          </IconTouchable>
          <IconTouchable>
            <Image source={IG_STORIES_SHARE}/>
            <IconText>Stories</IconText>
          </IconTouchable>
          <IconTouchable>
            <Image source={IG_SHARE}/>
            <IconText>Instagram</IconText>
          </IconTouchable>

          <IconTouchable>
            <Image source={IMESSAGE}/>
            <IconText>iMessage</IconText>
          </IconTouchable>
          <IconTouchable>
            <Image source={COPY_LINK_ICON}/>
            <IconText>Copy Link</IconText>
          </IconTouchable>
        </ScrollView>
        <LSModal.CloseButton onCloseButtonPress={onCloseModal} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default ProductShareModal;
