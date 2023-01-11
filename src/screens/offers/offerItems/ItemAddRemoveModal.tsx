/***
LootSwap - ITEM ADD REMOVE MODAL
***/

import React, {FC, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {Alert} from 'custom_top_alert';
import {useDispatch} from 'react-redux';
import {
  AddRemoveModalContainerView,
  ModalHeaderText,
  ModalSubHeaderText,
  TopMargin,
  EditTradeModalStyle,
  ItemsListView,
  ImageContainer,
  Image,
  AnimatedCheckBox,
} from '../styles';
import {addItems, removeItems, getTradesHistory} from '../../../redux/modules';

interface ItemAddRemoveModalProp {
  isModalVisible: boolean;
  isAddItem: boolean;
  onCloseModal?: Function;
  itemsData?: any;
  offerItem?: any;
  userData?: any;
}

export const ItemAddRemoveModal: FC<ItemAddRemoveModalProp> = props => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const productSize = layout.width / 2 - 56;
  const {
    isModalVisible,
    isAddItem,
    itemsData,
    onCloseModal = () => {},
    offerItem,
    userData,
  } = props;
  const [itemsToAdd, setItemsToAdd] = useState([]);
  const [itemsToRemove, setItemsToRemove] = useState([]);

  const onAddItemPress = (itemId: string) => {
    const offerItems = [...itemsData];
    const foundItemIndex = offerItems?.findIndex(
      _item => _item?._id === itemId && _item?.isSelected,
    );
    const alreadySelectedItems = offerItems?.filter(_fil => _fil?.isSelected);
    if (alreadySelectedItems?.length + offerItem?.senderItems?.length >= 3) {
      if (foundItemIndex >= 0) {
        const updatedData = offerItems?.map(data => {
          if (data?._id === itemId) {
            data.isSelected = data?.isSelected ? !data?.isSelected : true;
          }
          return data;
        });
        setItemsToAdd(updatedData);
      } else {
        Alert.showError('You cannot add more than 3 items');
        return;
      }
    } else {
      const updatedData = offerItems?.map(data => {
        if (data?._id === itemId) {
          data.isSelected = data?.isSelected ? !data?.isSelected : true;
        }
        return data;
      });
      setItemsToAdd(updatedData);
    }
  };
  const onRemoveItemPress = (itemId: string) => {
    const offerItems = [...itemsData];
    const alreadySelectedItems = offerItems?.filter(_fil => _fil?.isSelected);
    if (
      alreadySelectedItems.length + 1 === offerItem?.senderItems.length &&
      offerItem?.senderMoneyOffer === 0
    ) {
      Alert.showError(
        'You cannot remove all your items without a money offer!',
      );
      return;
    }
    const updatedData = offerItems?.map(data => {
      if (data?._id === itemId) {
        data.isSelected = data?.isSelected ? !data?.isSelected : true;
      }
      return data;
    });
    setItemsToRemove(updatedData);
  };
  const submitAddItem = () => {
    const filteredItems = itemsToAdd.filter(item => item?.isSelected);
    if (filteredItems.length === 0) {
      onCloseModal();
      return;
    }
    const reqData = {
      userId: userData?._id,
      tradeId: offerItem?._id,
      itemIds: filteredItems,
    };
    dispatch(
      addItems(
        reqData,
        () => {
          dispatch(
            getTradesHistory({
              userId: userData?._id,
            }),
          );
          onCloseModal();
        },
        error => {
          console.log('err: ', error);
        },
      ),
    );
  };
  const submitRemoveItem = () => {
    const filteredItems = itemsToRemove.filter(item => item?.isSelected);
    if (filteredItems.length === 0) {
      onCloseModal();
      return;
    }
    const reqData = {
      userId: userData?._id,
      tradeId: offerItem?._id,
      itemIds: filteredItems,
    };
    dispatch(
      removeItems(
        reqData,
        () => {
          dispatch(
            getTradesHistory({
              userId: userData?._id,
            }),
          );
          onCloseModal();
        },
        error => {
          console.log('err: ', error);
        },
      ),
    );
  };
  const renderOfferItem = ({item}: any) => {
    return (
      <ImageContainer
        size={productSize}
        onPress={() => {
          isAddItem ? onAddItemPress(item?._id) : onRemoveItemPress(item?._id);
        }}>
        <Image source={{uri: item.primary_photo}} size={productSize} />
        <AnimatedCheckBox
          isChecked={item?.isSelected}
          onPress={() => {
            isAddItem
              ? onAddItemPress(item?._id)
              : onRemoveItemPress(item?._id);
          }}
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
        <AddRemoveModalContainerView>
          <ModalHeaderText>
            {isAddItem ? 'Choose Items to Add' : 'Choose Items to Remove '}
          </ModalHeaderText>
          <ModalSubHeaderText>(maximum 3 items)</ModalSubHeaderText>
          <TopMargin />
          <TopMargin margin={2} />
          <ItemsListView data={itemsData} renderItem={renderOfferItem} />
          {isAddItem ? (
            <LSButton
              title={'Add Selected Items'}
              size={Size.Fit_To_Width}
              type={Type.Primary}
              radius={20}
              fitToWidth={'90%'}
              onPress={() => submitAddItem()}
            />
          ) : (
            <LSButton
              title={'Remove Selected Items'}
              size={Size.Fit_To_Width}
              type={Type.Error}
              radius={20}
              fitToWidth={'90%'}
              onPress={() => submitRemoveItem()}
            />
          )}
          <TopMargin margin={2} />
          <LSButton
            title={'Cancel'}
            size={Size.Fit_To_Width}
            type={Type.Grey}
            radius={20}
            fitToWidth={'90%'}
            onPress={() => onCloseModal()}
          />
        </AddRemoveModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default ItemAddRemoveModal;
