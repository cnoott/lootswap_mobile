import React, {FC, useRef} from 'react';
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

  const handleSnapchatShare = async () => {
    viewShotRef.current.capture().then(async uri => {
      console.log("URI", uri)
      const photoContent = {
        content: {
          uri: `file://${uri.trim()}`,
        },
        sticker: {
          uri: `file://${uri.trim()}`,
          width: 550,
          height: 900,
          posX: 0.5,
          posY: 0.6,
          rotationDegreesInClockwise: 0,
          isAnimated: false,
        },
        caption: 'Get on lootswap',
        attachmentUrl: 'https://download.lootswap.com',
      };

      CreativeKit.sharePhoto(photoContent).then(() => {
        console.log('done')
      })
      .catch(err => console.log(err));
    });
  };

  return (
    <LSModal
      isVisible={isVisible}
      style={ModalStyles}
      onBackdropPress={onCloseModal}>
      <LSModal.BottomContainer>
        <ModalHeaderText>Share Listing</ModalHeaderText>
        <View style={{position: 'absolute', bottom: -999999}}>
        <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
          <LSProductCard
            item={productDetails}
            isHorizontalView={true}
            key={productDetails?._id}
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
