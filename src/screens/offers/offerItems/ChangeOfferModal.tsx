/***
  LootSwap - CHANGE OFFER MODAL
 ***/

import React, {FC, useState} from 'react';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import LSInput from '../../../components/commonComponents/LSInput';
import {Size, Type} from 'custom_enums';
import {useDispatch} from 'react-redux';
import {USD_TEXT, DOLLOR_TEXT} from 'localsvgimages';
import {ModalContainerView, ModalHeaderText, TopMargin} from '../styles';
import {changeMoneyOffer, getTradesHistory} from '../../../redux/modules';
import {Alert} from 'custom_top_alert';

interface ChangeOfferModalProp {
  isModalVisible: boolean;
  onCloseModal?: Function;
  userData?: any;
  offerItem?: any;
}

export const ChangeOfferModal: FC<ChangeOfferModalProp> = props => {
  const dispatch = useDispatch();
  const [offerPrice, setOfferPrice] = useState(0);
  const {isModalVisible, onCloseModal = () => {}, userData, offerItem} = props;

  const priceValidation = () => {
    if (offerPrice === 0 || offerPrice === 0.00) {
      onCloseModal();
      return;
    }
    var regex = new RegExp('^(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?');
    if (!offerPrice.toString().match(regex)) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = () => {
    if (!priceValidation()) {
      Alert.showError('Please enter a valid dollar amount');
      return;
    }
    const reqData = {
      userId: userData?._id,
      tradeId: offerItem?._id,
      moneyOffer: offerPrice,
    };

    dispatch(
      changeMoneyOffer(
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
          console.log(error);
        },
      ),
    );
  };
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
            onPress={() => handleSubmit()}
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
