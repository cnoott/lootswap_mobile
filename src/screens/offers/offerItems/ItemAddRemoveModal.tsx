/***
LootSwap - ITEM ADD REMOVE MODAL
***/

import React, {FC} from 'react';
import {useWindowDimensions} from 'react-native';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
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

interface ItemAddRemoveModalProp {
  isModalVisible: boolean;
  isAddItem: boolean;
  onCloseModal?: Function;
  itemsData?: any;
}

export const ItemAddRemoveModal: FC<ItemAddRemoveModalProp> = props => {
  const layout = useWindowDimensions();
  const productSize = layout.width / 2 - 56;
  const {isModalVisible, isAddItem, itemsData, onCloseModal = () => {}} = props;
  const renderOfferItem = ({item}: any) => {
    return (
      <ImageContainer size={productSize}>
        <Image source={{uri: 'https://picsum.photos/200'}} size={productSize} />
        <AnimatedCheckBox isChecked={item?.isSelected} />
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
              onPress={() => onCloseModal()}
            />
          ) : (
            <LSButton
              title={'Remove Selected Items'}
              size={Size.Fit_To_Width}
              type={Type.Error}
              radius={20}
              fitToWidth={'90%'}
              onPress={() => onCloseModal()}
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
