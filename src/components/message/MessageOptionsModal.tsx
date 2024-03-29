/***
  LootSwap - MESSAGE OPTIONS MODAL
 ***/

import React, {FC} from 'react';
import {LSModal} from '../commonComponents/LSModal';
import LSButton from '../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  ModalStyles,
  ModalContainerView,
  ModalHeaderText,
  TopMargin,
} from './styles';

interface MessageOptionsModalProps {
  isModalVisible: boolean;
  onCloseModal: Function;
  onSendOfferPress: Function;
  onBuyNowPress: Function;
  onViewItemPress: Function;
  productDetails: any;
}

//TODO: conditionally render different buttons for receiver/sender

export const MessageOptionsModal: FC<MessageOptionsModalProps> = props => {
  const {
    isModalVisible,
    onCloseModal = () => {},
    onSendOfferPress = () => {},
    onBuyNowPress = () => {},
    onViewItemPress = () => {},
    productDetails = {},
  } = props;

  // XXX This code (sort of) repeats itself in productDetails
  const renderButtons = () => {
    if (!productDetails?.isVisible) {
      return (
        <LSButton
          title={'Item No Longer Available'}
          size={Size.Full}
          type={Type.View}
          radius={20}
          onPress={() => {}}
        />
      );
    }

    return (
      <>
        <LSButton
          title={'Send Offer'}
          size={Size.Full}
          type={Type.Primary}
          radius={20}
          onPress={onSendOfferPress}
        />
        {productDetails?.type !== 'trade-only' && (
          <>
            <TopMargin />
            <LSButton
              title={'Buy Now'}
              size={Size.Fit_To_Width}
              type={Type.Secondary}
              radius={20}
              fitToWidth={'90%'}
              onPress={onBuyNowPress}
            />
          </>
        )}
        <TopMargin />
        <LSButton
          title={'View Item Details'}
          size={Size.Fit_To_Width}
          type={Type.Grey}
          radius={20}
          fitToWidth={'90%'}
          onPress={onViewItemPress}
        />
      </>
    );
  };
  return (
    <LSModal
      isVisible={isModalVisible}
      style={ModalStyles}
      onBackdropPress={onCloseModal}>
      <LSModal.BottomContainer>
        <ModalContainerView>
          <ModalHeaderText>Message Options</ModalHeaderText>
          <TopMargin />
          {renderButtons()}
        </ModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default MessageOptionsModal;
