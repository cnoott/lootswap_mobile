import React, {FC, useState} from 'react';
import LSButton from '../../../components/commonComponents/LSButton';
import {
  KeyboardAvoidingView,
  MoneyOfferInputContainer,
  MoneyOfferInput,
  MoneySign,
  Line,
  InvalidText,
  ButtonContainer,
  OfferPriceText,
  SendOfferContainer,
  SubText,
} from './styles';
import {View} from 'react-native';
import StartTradeItemCell from '../../../components/startTrade/startTradeItemCell';
import {Size, Type} from '../../../enums';

interface SendMoneyOfferStepOneProps {
  item: any;
  moneyOffer: string;
  setMoneyOffer: Function;
  handleMoneyOfferNext: Function;
}

export const SendMoneyOfferStepOne: FC<SendMoneyOfferStepOneProps> = props => {
  const {item = {}, moneyOffer, setMoneyOffer, handleMoneyOfferNext} = props;
  const [notValidMsg, setNotValidMsg] = useState('');

  const validateInput = (offer: string) => {
    if (!offer) {
      return;
    }
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    if (!regex.test(offer)) {
      setNotValidMsg('Please enter a valid dollar amount');
      return;
    } else {
      setNotValidMsg('');
    }

    if (
      item?.price &&
      parseFloat(item?.price) / 2 > parseFloat(offer) &&
      parseFloat(item?.price) >= 40
    ) {
      setNotValidMsg('Please enter a valid dollar amount');
      setNotValidMsg(
        `Please make an offer of at least ${parseFloat(item?.price) / 2}`,
      );
    }
  };

  const handleTextChange = (offer: string) => {
    setMoneyOffer(offer);
    validateInput(offer);
  };

  const handleSubmit = () => {
    if (notValidMsg) {
      return;
    }
    handleMoneyOfferNext();
  };

  return (
    <KeyboardAvoidingView>
      <SendOfferContainer>
        <View>
          <StartTradeItemCell item={item} isReview={true} isMoneyOffer={true} />
        </View>
        <View>
          <OfferPriceText>Offer Price</OfferPriceText>
        </View>
        <View>
          <MoneyOfferInputContainer>
            <MoneySign notValid={notValidMsg}>$</MoneySign>
            <MoneyOfferInput
              notValid={notValidMsg}
              autoFocus={true}
              keyboardType={'numeric'}
              autoComplete={'off'}
              value={moneyOffer}
              onChangeText={handleTextChange}
              onChange={validateInput}
              placeholder={'0'}
            />
          </MoneyOfferInputContainer>
          <Line notValid={notValidMsg} />
          {notValidMsg && <InvalidText>{notValidMsg}</InvalidText>}
          <SubText>Shipping and taxes calculated in the next step</SubText>
        </View>

        <View>
          <LSButton
            title={'Submit Money Offer'}
            size={Size.Large}
            type={notValidMsg ? Type.Grey : Type.Primary}
            radius={20}
            onPress={() => handleSubmit()}
          />
        </View>
      </SendOfferContainer>
    </KeyboardAvoidingView>
  );
};

export default SendMoneyOfferStepOne;
