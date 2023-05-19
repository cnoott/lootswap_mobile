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
  offerItem: any;
  userData: any;
}

export const EditTradeModal: FC<EditTradeModalProp> = props => {
  const {
    isModalVisible,
    onCloseModal = () => {},
    onEditTradePress = () => {},
    offerItem,
    userData,
  } = props;
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
              title={'Change Offer'}
              size={Size.Fit_To_Width}
              type={Type.Primary}
              radius={20}
              fitToWidth={'90%'}
              onPress={() => onEditTradePress()}
            />
            <TopMargin margin={2} />
          </>
        </TradeModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default EditTradeModal;
