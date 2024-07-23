import React, {FC, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSButton from '../../components/commonComponents/LSButton';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Size, Type} from '../../enums';
import {
  KeyboardAvoidingView,
  MoneyOfferInputContainer,
  MoneyOfferInput,
  MoneySign,
  Line,
  InvalidText,
  OfferPriceText,
  SendOfferContainer,
  SubText,
} from './startTrade/styles';
import {View} from 'react-native';
import StartTradeItemCell from '../../components/startTrade/startTradeItemCell';
import {
  startMoneyOfferTrade,
  getTradesHistory,
  getAllMyMessages,
} from '../../redux/modules';
import {Alert} from 'custom_top_alert';

export const SendMoneyOfferScreen: FC<any> = ({route}) => {
  const isFromMessageScreen = route?.params?.isFromMessageScreen ?? false;
  const [notValidMsg, setNotValidMsg] = useState('');
  const [moneyOffer, setMoneyOffer] = useState(null);

  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const homeStates: AuthProps = useSelector(state => state.home);
  const auth: AuthProps = useSelector(state => state.auth);
  const {selectedProductDetails} = homeStates;
  const {requestedUserDetails, userData} = auth;

  const validateInput = (offer: string) => {
    if (!offer) {
      return;
    }
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    if (!regex.test(offer)) {
      setNotValidMsg('Please enter a valid dollar amount');
      return;
    }
    const minimumPrice = selectedProductDetails?.price * 0.6;
    if (selectedProductDetails?.price && parseFloat(offer) < minimumPrice) {
      setNotValidMsg(`Please make an offer of at least ${minimumPrice}`);
      return;
    }

    setNotValidMsg('');
  };

  const handleTextChange = (offer: string) => {
    setMoneyOffer(offer);
    validateInput(offer);
  };

  const handleSubmit = () => {
    if (notValidMsg) {
      return;
    }
    // TODO: handle submit here
    const reqData = {
      userId: userData?._id,
      tradeData: {
        receiverId: requestedUserDetails?._id,
        senderId: userData?._id,
        senderMoneyOffer: moneyOffer,
        receiverItems: [selectedProductDetails],
      },
    };
    dispatch(
      startMoneyOfferTrade(
        reqData,
        res => {
          dispatch(getAllMyMessages(userData?._id));
          dispatch(
            getTradesHistory({
              userId: userData?._id,
            }),
          );
          if (isFromMessageScreen) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Inbox'}],
            });
            navigation?.navigate('OffersMessageScreen', {item: res.trade});
          } else {
            navigation?.replace('OffersMessageScreen', {item: res.trade});
          }
        },
        error => {
          Alert.showError('Error sending offer');
        },
      ),
    );
  };

  return (
    <KeyboardAvoidingView>
      <InStackHeader title={'Send Money Offer'} back={true} />
      <SendOfferContainer>
        <View>
          <StartTradeItemCell
            item={selectedProductDetails}
            isReview={true}
            isMoneyOffer={true}
          />
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

export default SendMoneyOfferScreen;
