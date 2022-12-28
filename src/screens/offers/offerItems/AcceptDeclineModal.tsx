/***
LootSwap - ACCEPT DECLINE MODAL
***/

import React, {FC} from 'react';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {ModalContainerView, ModalHeaderText, TopMargin} from '../styles';

interface AcceptDeclineModalProp {
  isModalVisible: boolean;
  isDecline: boolean;
  onCloseModal?: Function;
  onAcceptOfferPress?: Function;
  onDeclineOfferPress?: Function;
}

export const AcceptDeclineModal: FC<AcceptDeclineModalProp> = props => {
  const {
    isModalVisible,
    isDecline,
    onCloseModal = () => {},
    onAcceptOfferPress = () => {},
    onDeclineOfferPress = () => {},
  } = props;
  return (
    <LSModal isVisible={isModalVisible} onBackdropPress={() => onCloseModal()}>
      <LSModal.BottomContainer>
        <ModalContainerView>
          <ModalHeaderText>
            {`Are you sure you would like to ${
              isDecline ? 'Decline' : 'Accept'
            } this trade?`}
          </ModalHeaderText>
          <TopMargin />
          <LSButton
            title={
              isDecline ? 'Yes, Decline the Trade' : 'Yes, Accept the Trade'
            }
            size={Size.Fit_To_Width}
            type={isDecline ? Type.Error : Type.Success}
            radius={20}
            onPress={() =>
              isDecline ? onDeclineOfferPress() : onAcceptOfferPress()
            }
          />
          <TopMargin margin={2} />
          <LSButton
            title={'Not this time'}
            size={Size.Fit_To_Width}
            type={Type.Grey}
            radius={20}
            onPress={() => onCloseModal()}
          />
        </ModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default AcceptDeclineModal;
