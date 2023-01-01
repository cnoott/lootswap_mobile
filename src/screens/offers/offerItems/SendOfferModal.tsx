/***
LootSwap - SEND OFFER MODAL
***/

import React, {FC, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import LSInput from '../../../components/commonComponents/LSInput';
import {Size, Type} from 'custom_enums';
import {USD_TEXT, DOLLOR_TEXT} from 'localsvgimages';
import {Alert} from 'custom_top_alert';
import {
  SendOfferModalContainerView,
  ModalHeaderText,
  ModalSubHeaderText,
  TopMargin,
  EditTradeModalStyle,
  ItemsListView,
  ImageContainer,
  Image,
  AnimatedCheckBox,
  MoneyOfferText,
} from '../styles';

interface SendOfferModalProp {
  isModalVisible: boolean;
  onCloseModal?: Function;
  itemsData?: any;
  updateOfferData?: Function;
  sendFinalOffer?: Function;
}

export const SendOfferModal: FC<SendOfferModalProp> = props => {
  const layout = useWindowDimensions();
  const [offerPrice, setOfferPrice] = useState(0);
  const productSize = layout.width / 2 - 56;
  const {
    isModalVisible,
    itemsData,
    onCloseModal = () => {},
    updateOfferData = () => {},
    sendFinalOffer = () => {},
  } = props;
  const onItemPress = (itemId: string) => {
    const offerItems = [...itemsData];
    const foundItemIndex = offerItems?.findIndex(
      _item => _item?._id === itemId && _item?.isSelected,
    );
    const alreadySelectedItems = offerItems?.filter(_fil => _fil?.isSelected);
    if (alreadySelectedItems?.length >= 3) {
      if (foundItemIndex >= 0) {
        const updatedData = offerItems?.map(data => {
          if (data?._id === itemId) {
            data.isSelected = data?.isSelected ? !data?.isSelected : true;
          }
          return data;
        });
        updateOfferData(updatedData);
      } else {
        Alert.showError('Already 3 items selected');
        return;
      }
    } else {
      const updatedData = offerItems?.map(data => {
        if (data?._id === itemId) {
          data.isSelected = data?.isSelected ? !data?.isSelected : true;
        }
        return data;
      });
      updateOfferData(updatedData);
    }
  };
  const onSendOfferPress = () => {
    const offerItems = [...itemsData];
    const selectedItems = offerItems?.filter(_fil => _fil?.isSelected);
    if (selectedItems?.length === 0 || offerPrice === 0) {
      Alert.showError('Please add mendatory details');
    } else {
      sendFinalOffer(selectedItems, offerPrice);
    }
  };
  const renderOfferItem = ({item}: any) => {
    return (
      <ImageContainer size={productSize}>
        <Image source={{uri: item?.primary_photo}} size={productSize} />
        <AnimatedCheckBox
          isChecked={item?.isSelected}
          onPress={() => onItemPress(item?._id)}
          disableBuiltInState
        />
      </ImageContainer>
    );
  };
  return (
    <LSModal
      isVisible={isModalVisible}
      style={EditTradeModalStyle}
      propagateSwipe={true}
      onBackdropPress={() => onCloseModal()}>
      <LSModal.BottomContainer>
        <SendOfferModalContainerView>
          <ModalHeaderText>Choose Items</ModalHeaderText>
          <ModalSubHeaderText>(maximum 3 items)</ModalSubHeaderText>
          <TopMargin />
          <TopMargin margin={2} />
          <ItemsListView data={itemsData} renderItem={renderOfferItem} />
          <MoneyOfferText>Money offer</MoneyOfferText>
          <LSInput
            onChangeText={setOfferPrice}
            value={offerPrice}
            placeholder={'0.00'}
            horizontalSpace={10}
            topSpace={1}
            rightIcon={USD_TEXT}
            leftIcon={DOLLOR_TEXT}
            keyboardType={'numeric'}
          />
          <TopMargin />
          <LSButton
            title={'Send Offer'}
            size={Size.Fit_To_Width}
            type={Type.Primary}
            radius={20}
            fitToWidth={'90%'}
            onPress={() => onSendOfferPress()}
          />
          <TopMargin margin={2} />
          <LSButton
            title={'Cancel'}
            size={Size.Fit_To_Width}
            type={Type.Grey}
            radius={20}
            fitToWidth={'90%'}
            onPress={() => onCloseModal()}
          />
        </SendOfferModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default SendOfferModal;
