/***
  LootSwap - EDIT TRADE MODAL
 ***/

import React, {FC} from 'react';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  TradeModalContainerView,
  ModalHeaderText,
  TopMargin,
  EditTradeModalStyle,
} from '../styles';

interface EditTradeModalProp {
  isModalVisible: boolean;
  onCloseModal?: Function;
  onEditTradePress?: Function;
  onEditMoneyOfferPress?: Function;
  offerItem: any;
  userData: any;
}

export const EditTradeModal: FC<EditTradeModalProp> = props => {
  const {
    isModalVisible,
    onCloseModal = () => {},
    onEditTradePress = () => {},
    onEditMoneyOfferPress = () => {},
    offerItem,
    userData,
  } = props;
  const isReceiver = userData?._id === offerItem?.receiver?._id;

  const editButtonTextConditions = () => {
    if (isReceiver) {
      return 'Send Counter Offer';
    }

    if (offerItem?.isMoneyOffer) {
      return 'Add Items to Trade';
    }

    return 'Change Offer';
  };

  return (
    <LSModal
      isVisible={isModalVisible}
      style={EditTradeModalStyle}
      onBackdropPress={() => onCloseModal()}>
      <LSModal.BottomContainer>
        <TradeModalContainerView>
          <ModalHeaderText>Edit Trade</ModalHeaderText>
          <TopMargin />
          <>
            <LSButton
              title={editButtonTextConditions()}
              size={Size.Fit_To_Width}
              type={Type.Primary}
              radius={20}
              fitToWidth={'90%'}
              onPress={() => onEditTradePress()}
            />
            <TopMargin margin={2} />
            {!isReceiver && offerItem?.isMoneyOffer && (
              <LSButton
                title={'Change Money Offer'}
                size={Size.Fit_To_Width}
                type={Type.Success}
                radius={20}
                fitToWidth={'90%'}
                onPress={() => onEditMoneyOfferPress()}
              />
            )}
          </>
        </TradeModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default EditTradeModal;
