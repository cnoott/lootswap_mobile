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
}

export const MessageOptionsModal: FC<MessageOptionsModalProps> = props => {
  const {isModalVisible, onCloseModal = () => {}, onSendOfferPress} = props;

  return (
    <LSModal
      isVisible={isModalVisible}
      style={ModalStyles}
      onBackdropPress={onCloseModal}>
      <LSModal.BottomContainer>
        <ModalContainerView>
          <ModalHeaderText>Message Options</ModalHeaderText>
          <TopMargin />
          <>
            <LSButton
              title={'Send Offer'}
              size={Size.Fit_To_Width}
              type={Type.Primary}
              radius={20}
              fitToWidth={'90%'}
              onPress={onSendOfferPress}
            />
          </>
        </ModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default MessageOptionsModal;
