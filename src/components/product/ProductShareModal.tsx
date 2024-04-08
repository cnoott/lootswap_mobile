import React, {FC} from 'react';
import {LSModal} from '../commonComponents/LSModal';
import {
  ModalStyles,
  ModalHeaderText,
} from './ProductShareModalStyles';
import {ScrollView} from 'react-native';

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
        <LSModal.CloseButton onCloseButtonPress={onCloseModal} />
        {/* HOriztonal scroll */}
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default ProductShareModal;
