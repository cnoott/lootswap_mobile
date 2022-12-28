/***
LootSwap - CHANGE OFFER MODAL
***/

import React, {FC, useState} from 'react';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import LSInput from '../../../components/commonComponents/LSInput';
import {Size, Type} from 'custom_enums';
import {USD_TEXT, DOLLOR_TEXT} from 'localsvgimages';
import {ModalContainerView, ModalHeaderText, TopMargin} from '../styles';

interface ChangeOfferModalProp {
  isModalVisible: boolean;
  onCloseModal?: Function;
}

export const ChangeOfferModal: FC<ChangeOfferModalProp> = props => {
  const [offerPrice, setOfferPrice] = useState(0);
  const {isModalVisible, onCloseModal = () => {}} = props;
  return (
    <LSModal isVisible={isModalVisible} onBackdropPress={() => onCloseModal()}>
      <LSModal.BottomContainer>
        <ModalContainerView>
          <ModalHeaderText>Change money offer to</ModalHeaderText>
          <TopMargin />
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
            title={'Submit'}
            size={Size.Fit_To_Width}
            type={Type.Primary}
            radius={20}
            fitToWidth={'90%'}
            onPress={() => onCloseModal()}
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
        </ModalContainerView>
        <LSModal.CloseButton onCloseButtonPress={() => onCloseModal()} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default ChangeOfferModal;
