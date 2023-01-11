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
  onAddItemPress?: Function;
  onRemoveItemPress?: Function;
  onChangeOfferPress?: Function;
  offerItem: any;
  userData: any;
}

export const EditTradeModal: FC<EditTradeModalProp> = props => {
  const {
    isModalVisible,
    onCloseModal = () => {},
    onAddItemPress = () => {},
    onRemoveItemPress = () => {},
    onChangeOfferPress = () => {},
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
          <ModalHeaderText>Edit Trade Options</ModalHeaderText>
          <TopMargin />
          {userData?._id === offerItem.sender?._id && (
            <>
              <LSButton
                title={'Add Items'}
                size={Size.Fit_To_Width}
                type={Type.Primary}
                radius={20}
                fitToWidth={'90%'}
                onPress={() => onAddItemPress()}
              />
              <TopMargin margin={2} />
              <LSButton
                title={'Remove Items'}
                size={Size.Fit_To_Width}
                type={Type.Error}
                radius={20}
                fitToWidth={'90%'}
                onPress={() => onRemoveItemPress()}
              />
              <TopMargin margin={2} />
            </>
          )}
          <LSButton
            title={'Add/Change Money Offer'}
            size={Size.Fit_To_Width}
            type={Type.Secondary}
            radius={20}
            fitToWidth={'90%'}
            onPress={() => onChangeOfferPress()}
          />
        </TradeModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default EditTradeModal;
