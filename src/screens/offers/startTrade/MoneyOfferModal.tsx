import React, {FC, useState} from 'react';
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import LSInput from '../../../components/commonComponents/LSInput';
import {Size, Type} from 'custom_enums';
import {USD_TEXT, DOLLOR_TEXT} from 'localsvgimages';
import {ModalContainerView, ModalHeaderText, TopMargin} from '../styles';
import {Alert} from 'custom_top_alert';

interface MoneyOfferProps {
  myMoneyOffer: number;
  requestedMoneyOffer: number;
  setMyMoneyOffer: Function;
  setRequestedMoneyOffer: Function;
  isMyMoneyOffer: boolean;
  isModalVisible: boolean;
  onCloseModal: Function;
}

export const MoneyOfferModal: FC<MoneyOfferProps> = props => {
  const {
    myMoneyOffer,
    setMyMoneyOffer,
    requestedMoneyOffer,
    setRequestedMoneyOffer,
    isMyMoneyOffer,
    isModalVisible,
    onCloseModal,
  } = props;

  const [tempMyMoneyOffer, setTempMyMoneyOffer] = useState(myMoneyOffer);
  const [tempRequestedMoneyOffer, setTempRequestedMoneyOffer] =
    useState(requestedMoneyOffer);

  const priceValidation = () => {
    if (!tempMyMoneyOffer) {
      setTempMyMoneyOffer(0);
    }
    if (!tempMyMoneyOffer) {
      setTempRequestedMoneyOffer(0);
    }

    if (tempMyMoneyOffer === 0 || tempMyMoneyOffer === 0.0) {
      return true;
    }
    if (tempRequestedMoneyOffer === 0 || tempRequestedMoneyOffer === 0.0) {
      return true;
    }
    var regex = new RegExp('^(0|[1-9][0-9]{0,2})(,d{3})*(.d{1,2})?');
    if (!tempMyMoneyOffer.toString().match(regex)) {
      return false;
    }
    if (!tempRequestedMoneyOffer.toString().match(regex)) {
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!priceValidation()) {
      Alert.showError('Please enter a valid dollar amount');
      return;
    }
    if (isMyMoneyOffer) {
      setMyMoneyOffer(tempMyMoneyOffer);
    } else {
      setRequestedMoneyOffer(tempRequestedMoneyOffer);
    }
    onCloseModal();
  };

  return (
    <LSModal isVisible={isModalVisible} onBackdropPress={() => onCloseModal()}>
      <LSModal.BottomContainer>
        <ModalContainerView>
          <ModalHeaderText>Additional Money Offer</ModalHeaderText>
          <TopMargin />
          <LSInput
            onChangeText={
              isMyMoneyOffer ? setTempMyMoneyOffer : setTempRequestedMoneyOffer
            }
            value={isMyMoneyOffer ? tempMyMoneyOffer : tempRequestedMoneyOffer}
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

export default MoneyOfferModal;
