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
import {View} from 'react-native';
import ProductShareCard from './ProductShareCard';
import {META_APP_ID} from '@env';
import Share from 'react-native-share';


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
    const photoContent = {
      sticker: {
        uri: `file://${uri.trim()}`,
        width: 200,
        height: 200,
        posX: 0.5,
        posY: 0.34,
        rotationDegreesInClockwise: 0,
        isAnimated: false,
      },
      attachmentUrl: 'https://download.lootswap.com',
      url: 'https://google.com'
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

  const handleInstagramShare = async () => {
    const shareOptions = {
      appId: META_APP_ID,
      social: Share.Social.INSTAGRAM_STORIES,
      stickerImage: `file://${uri.trim()}`,
      attributionURL: 'https://download.lootswap.com',
      url: 'https://download.lootswap.com',
      message: 'lootswap!',
      title: 'LOOTSWAP',
    };

    Share.shareSingle(shareOptions);
  };

  return (
    <LSModal
      isVisible={isVisible}
      style={ModalStyles}
      onBackdropPress={onCloseModal}>
      <LSModal.BottomContainer>
        <ModalHeaderText>Share Listing</ModalHeaderText>
        <ProductShareCard
          productDetails={productDetails}
          viewShotRef={viewShotRef}
          handleCaptureProductImage={handleCaptureProductImage}
        />
        <ModalSubText>Share To</ModalSubText>
        <ScrollView horizontal>
          <IconTouchable onPress={handleSnapchatShare}>
            <SvgXml xml={SNAPCHAT_ICON} width={scale(60)} height={scale(60)} />
            <IconText>Snapchat</IconText>
          </IconTouchable>
          <IconTouchable onPress={handleInstagramShare}>
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
