import React, {FC, useRef, useState, useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LSStartTradeHeader} from '../../../components/commonComponents/headers/startTradeHeader';
import {Container, ButtonContainer} from './styles';
import {ProgressBar, SwiperComponent} from '../../loot/styles';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import {StartTradeStepOne} from './startTradeStepOne';
import {StartTradeStepTwo} from './startTradeStepTwo';
import {StartTradeCheckoutScreen} from './startTradeCheckoutScreen';
import {ReviewTrade} from './reviewTrade';
import {useDispatch, useSelector} from 'react-redux';
import {useStripe} from '@stripe/stripe-react-native';
import {calculateMarketValue} from '../../../utility/utility';
import {
  getMyDetailsNoLoadRequest,
  startTradeCheckout,
  undoTradeCheckout,
} from '../../../redux/modules';
import {Alert} from 'custom_top_alert';
import RobberyModal from '../../../components/offers/RobberyModal';
import analytics from '@react-native-firebase/analytics';

type PaymentDetails = {
  platformFee: number;
  toUserRate: number;
  toWarehouseRate: number;
  total: number;
  userPayout: number;
};

const NUMBER_OF_STEPS = 5

export const StartTradeScreen: FC<any> = ({route}) => {
  const {requestedUserDetails, userData} = route?.params;
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation();
  const swiperRef = useRef<any>(null);

  const [currIndex, setCurrIndex] = useState(0);

  const [robberyModalVisible, setRobberyModalVisible] = useState(false);

  const [otherUserItems, setOtherUserItems] = useState(requestedUserDetails.my_items);
  const [myItems, setMyItems] = useState(userData?.my_items);

  const [myMoneyOffer, setMyMoneyOffer] = useState(0);
  const [requestedMoneyOffer, setRequestedMoneyOffer] = useState(0);

  const [loading, setLoading] = useState(false);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    platformFee: 0,
    toUserRate: 0,
    toWarehouseRate: 0,
    total: 0,
    userPayout: 0,
  });
  const [trade, setTrade] = useState({});

  useEffect(() => {
    console.log('STARTING');
  },[]);


  const headerTitleOptions = () => {
    switch (currIndex) {
      case 0:
        return {
          title: `${requestedUserDetails?.name}'s loot`,
          profilePicture: requestedUserDetails?.profile_picture,
        };
      case 1:
        return {
          title: 'Your loot',
          profilePicture: userData.profile_picture,
        };
      case 2:
        return {
          title: 'Review Order',
          profilePicture: '',
        };
      case 3:
        return {
          title: 'Checkout & Submit Offer',
          profilePicture: '',
       };
    }

  };

  const renderTopView = () => (
    <>
      <LSStartTradeHeader
        title={headerTitleOptions()?.title}
        profilePicture={headerTitleOptions()?.profilePicture}
        showPfp={currIndex === 0 || currIndex === 1}
        onBackPress={handleBack}
      />
      <ProgressBar progress={(currIndex + 1) / NUMBER_OF_STEPS} />
    </>
  );

  const initializePaymentSheet = () => {
    const reqData = {
      userId: userData?._id,
      tradeData: {
        receiverId: requestedUserDetails?._id,
        senderId: userData?._id,
        senderMoneyOffer: myMoneyOffer,
        receiverMoneyOffer: requestedMoneyOffer,
        receiverItems: otherUserItems.filter(item => item?.isSelected),
        senderItems: myItems.filter(item => item?.isSelected),
      },
    };
    dispatch(
      startTradeCheckout(
        reqData,
        async res => {
          setPaymentDetails(res.rateData);
          const {paymentIntent, ephemeralKey, customer} = res.stripeData;
          const {error} = await initPaymentSheet({
            merchantDisplayName: 'lootswap, Inc.',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            applePay: {
              merchantCountryCode: 'US',
            },
          });
          if (!error) {
            setLoading(true);
          }
          setTrade(res.trade);
        },
        error => {
          Alert.showError('Error in checking out')
        },
      ),
    );
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.showError(error?.message);
      console.log('error payment sheet', error);
    } else {
      navigation?.replace('OffersMessageScreen', {item: trade});
      analytics().logEvent('start_trade', {
        id: trade?._id
      });
    }
  };

  const handleNext = () => {
    if (!nextValidation()) {
      return;
    }

    if (currIndex + 1 === 3) {
      dispatch(getMyDetailsNoLoadRequest(userData?._id));
      initializePaymentSheet();
    }
    swiperRef?.current?.scrollTo(currIndex + 1);
  };

  const handleBack = () => {
    if (currIndex === 0) {
      let resetMyItems = [...myItems];
      let resetOtherUserItems = [...otherUserItems];
      resetMyItems.forEach((item, index, array) => {
        array[index] = item.isSelected = false;
      });
      resetOtherUserItems.forEach((item, index, array) => {
        array[index] = item.isSelected = false;
      });
      setMyItems(resetMyItems);
      setOtherUserItems(resetOtherUserItems);
      navigation?.goBack();
    } else if (currIndex === 4) {
      //undoTradeCheckout call is broken here, will skip for now
      swiperRef?.current?.scrollTo(currIndex - 1);
    } else {
      swiperRef?.current?.scrollTo(currIndex - 1);
    }
  };

  const nextValidation = () => {
    const otherUserSelected = otherUserItems.filter(_item => _item?.isSelected);
    const mySelected = myItems.filter(_item => _item?.isSelected);
    if (currIndex === 0 && otherUserSelected.length <= 0) {
      Alert.showError('Please select at least one item');
      return false;
    } else if (currIndex === 1 && mySelected.length <= 0) {
      Alert.showError('Please select at least one item');
      return false;
    } else if (currIndex === 2) {

      var otherUserMarketString = calculateMarketValue(otherUserSelected);
      var myMarketString = calculateMarketValue(mySelected);
      if (otherUserMarketString === 'Unknown' || myMarketString === 'Unknown') {
        return true;
      }
      var otherUserMarketValue = parseInt(otherUserMarketString.slice(1), 10);
      var myMarketValue = parseInt(myMarketString.slice(1), 10);
      otherUserMarketValue += requestedMoneyOffer;
      myMarketValue += myMoneyOffer;

      if (myMarketValue < otherUserMarketValue * 0.7) {
        setRobberyModalVisible(true);
        return false
      }
      return true;
    }
    return true;
  };

  const renderBottomButtonView = () =>
    currIndex !== 3 && (
      <ButtonContainer>
        <LSButton
          title={currIndex === 2 ? 'Checkout & Submit' : 'Next'}
          size={Size.Large}
          type={Type.Primary}
          radius={20}
          onPress={handleNext}
        />
      </ButtonContainer>
    );

  const renderSteps = () => {
    return [1, 2, 3, 4].map(data => {
      switch (data) {
        case 1:
          return (
            <StartTradeStepOne
              otherUserItems={otherUserItems}
              setOtherUserItems={setOtherUserItems}
            />
          );
        case 2:
          return (
            <StartTradeStepTwo myItems={myItems} setMyItems={setMyItems} />
          );
        case 3:
          return (
            <ReviewTrade
              otherUserItems={otherUserItems}
              myItems={myItems}
              requestedUserDetails={requestedUserDetails}
              requestedMoneyOffer={requestedMoneyOffer}
              setRequestedMoneyOffer={setRequestedMoneyOffer}
              myMoneyOffer={myMoneyOffer}
              setMyMoneyOffer={setMyMoneyOffer}
            />
          );
        case 4:
          return (
            <StartTradeCheckoutScreen
              receiverItems={otherUserItems.filter(item => item?.isSelected)}
              senderItems={myItems.filter(item => item?.isSelected)}
              receiverMoneyOffer={requestedMoneyOffer}
              senderMoneyOffer={myMoneyOffer}
              paymentDetails={paymentDetails}
              loading={loading}
              openPaymentSheet={openPaymentSheet}
            />
          );
      }
    });
  };

  return (
    <Container>
      <RobberyModal
        isModalVisible={robberyModalVisible}
        setModalVisible={setRobberyModalVisible}
      />
      {renderTopView()}
      <SwiperComponent ref={swiperRef} onIndexChanged={setCurrIndex}>
        {renderSteps()}
      </SwiperComponent>

      {renderBottomButtonView()}
    </Container>
  );
};

export default StartTradeScreen;
