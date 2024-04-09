import React, {FC} from 'react';
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

  return (
    <LSModal
      isVisible={isVisible}
      style={ModalStyles}
      onBackdropPress={onCloseModal}>
      <LSModal.BottomContainer>
        <ModalHeaderText>Share Listing</ModalHeaderText>
        <ModalSubText>Share To</ModalSubText>
        <ScrollView horizontal>
          <IconTouchable>
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
