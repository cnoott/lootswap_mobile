import React, {FC, useState, useRef, useEffect} from 'react';
import {ProgressBar, SwiperComponent} from '../loot/styles';
import {LSStartTradeHeader} from '../../components/commonComponents/headers/startTradeHeader';
import {Container, ButtonContainer} from './startTrade/styles';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {StartTradeStepTwo} from './startTrade/startTradeStepTwo';
import {StartTradeStepOne} from './startTrade/startTradeStepOne';
import {StartTradeCheckoutScreen} from './startTrade/startTradeCheckoutScreen';
import {ReviewTrade} from './startTrade/reviewTrade';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {editTradeCheckout, getTrade} from '../../redux/modules';
import {useStripe} from '@stripe/stripe-react-native';
import {Alert} from 'custom_top_alert';
import {LoadingRequest} from '../../redux/modules/loading/actions';
import {LoadingProps} from '../../redux/modules/loading/reducer';
import {calculateMarketValue} from '../../utility/utility';
import RobberyModal from '../../components/offers/RobberyModal';
import {TradeProps} from '../../redux/modules/offers/reducer';

type PaymentDetails = {
  platformFee: number;
  toUserRate: number;
  toWarehouseRate: number;
  total: number;
  userPayout: number;
};

export const EditTradeScreen: FC<any> = ({route}) => {
  const {isReciever} = route?.params;
  const tradeData: TradeProps = useSelector(state => state.offers);
  let trade = tradeData?.trade;
  const [currIndex, setCurrIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const loadingStockxData: LoadingProps = useSelector(state => state.loading);
  const [loading, setLoading] = useState(false);

  const [robberyModalVisible, setRobberyModalVisible] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    platformFee: 0,
    toUserRate: 0,
    toWarehouseRate: 0,
    total: 0,
    userPayout: 0,
  });

  const [senderItems, setSenderItems] = useState(() => {
    let selectedItems;
    let combinedItems;

    selectedItems = trade.senderItems.map(item => ({ ...item, isSelected: true }));
    combinedItems = [...selectedItems, ...trade.sender.my_items];

    const uniqueItems = combinedItems.reduce((acc, item) => {
      if (!acc.some(accItem => accItem._id === item._id)) {
        return [...acc, item];
      } else {
        return acc;
      }
    }, []);

    return uniqueItems;
  });



  const [recieverItems, setRecieverItems] = useState(() => {
    let selectedItems;
    let combinedItems;
    selectedItems = trade.recieverItems.map(item => ({ ...item, isSelected: true }));
    combinedItems = [...selectedItems, ...trade?.reciever.my_items];

    const uniqueItems = combinedItems.reduce((acc, item) => {
      if (!acc.some(accItem => accItem._id === item._id)) {
        return [...acc, item];
      } else {
        return acc;
      }
    }, []);
    return uniqueItems;
  });

  const [senderMoneyOffer, setSenderMoneyOffer] = useState(
    parseFloat(trade.senderMoneyOffer)
  );
  const [recieverMoneyOffer, setRecieverMoneyOffer] = useState(
    parseFloat(trade.recieverMoneyOffer)
  );

  useEffect(() => {
    // Update senderItems based on trade prop
    const updatedSenderItems = (() => {
      let selectedItems;
      let combinedItems;

      selectedItems = trade.senderItems.map(item => ({ ...item, isSelected: true }));
      combinedItems = [...selectedItems, ...trade.sender.my_items];

      return combinedItems.reduce((acc, item) => {
        if (!acc.some(accItem => accItem._id === item._id)) {
          return [...acc, item];
        } else {
          return acc;
        }
      }, []);
    })();

    // Update recieverItems based on trade prop
    const updatedRecieverItems = (() => {
      let selectedItems;
      let combinedItems;
      selectedItems = trade.recieverItems.map(item => ({ ...item, isSelected: true }));
      combinedItems = [...selectedItems, ...trade?.reciever.my_items];

      return combinedItems.reduce((acc, item) => {
        if (!acc.some(accItem => accItem._id === item._id)) {
          return [...acc, item];
        } else {
          return acc;
        }
      }, []);
    })();

    // Set the state with the updated values
    setSenderItems(updatedSenderItems);
    setRecieverItems(updatedRecieverItems);

  }, [trade]); // The useEffect will run when the trade prop changes

  const headerTitleOptions = () => {
    switch (currIndex) {
      case 0:
        return {
        title: `${
          isReciever ? trade.sender?.name : trade.reciever?.name
        }'s loot`,
        profilePicture: isReciever
          ? trade.sender?.profile_picture
          : trade.reciever?.profile_picture
      };
      case 1:
        return {
        title: `Your loot`,
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

  const renderSteps = () => {
    if (loadingStockxData.isLoading) {
      return;
    }
    return [1, 2, 3, 4].map(data => {
      switch (data) {
        case 1:
          return (
            <StartTradeStepOne
              otherUserItems={isReciever ? senderItems : recieverItems}
              setOtherUserItems={isReciever ? setSenderItems : setRecieverItems}
            />
        );
        case 2:
          return (
            <StartTradeStepTwo
              myItems={isReciever ? recieverItems : senderItems}
              setMyItems={isReciever ? setRecieverItems : setSenderItems} />
        );
        case 3:
          return (
            <ReviewTrade
              otherUserItems={isReciever ? senderItems : recieverItems}
              myItems={isReciever ? recieverItems : senderItems}
              requestedUserDetails={isReciever ? trade.sender : trade.reciever}
              requestedMoneyOffer={isReciever ? senderMoneyOffer : recieverMoneyOffer}
              setRequestedMoneyOffer={isReciever ? setSenderMoneyOffer : setRecieverMoneyOffer}
              myMoneyOffer={isReciever ? recieverMoneyOffer : senderMoneyOffer}
              setMyMoneyOffer={isReciever ? setRecieverMoneyOffer : setSenderMoneyOffer}
            />
        );
        case 4:
          return (
            <StartTradeCheckoutScreen
              recieverItems={recieverItems.filter(item => item?.isSelected)}
              senderItems={senderItems.filter(item => item?.isSelected)}
              paymentDetails={paymentDetails}
              loading={loading}
              openPaymentSheet={openPaymentSheet}
              isReciever={isReciever}
            />
        );
      }
    });
  };

  const initializePaymentSheet = () => {
    const reqData = {
      recieverItems: recieverItems.filter(item => item?.isSelected),
        senderItems: senderItems.filter(item => item?.isSelected),
        recieverMoneyOffer: recieverMoneyOffer,
      senderMoneyOffer: senderMoneyOffer,
      tradeId: trade._id,
      userId: userData?._id,
    };
    dispatch(
      editTradeCheckout(
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
            swiperRef?.current?.scrollTo(currIndex + 1);
          }
        },
        error => {
          console.log('ERRRO');
        },
      ),
    );
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    console.log('CALLING HERE ASDFLKJDSLF');
    if (error) {
      Alert.showError(error?.message);
    } else {
      dispatch(LoadingRequest());
      setTimeout(async () => {
        await dispatch(
          getTrade({
            userId: userData?._id,
            tradeId: trade._id,
          })
        );
        navigation.goBack();
      }, 1000);
      //settimeout then refetch trade
    }
  };

  //TODO; nextValidation()

  const handleNext = () => {
    if (currIndex === 2) {
      const selectedRecieverItems = recieverItems.filter(
        _item => _item?.isSelected
      );
      const selectedSenderItems = senderItems.filter(
        _item => _item?.isSelected
      );
      let myItems = isReciever ? selectedRecieverItems : selectedSenderItems;
      let otherUserItems = isReciever ? selectedSenderItems : selectedRecieverItems;

      const myMoneyOffer = parseInt(isReciever ? recieverMoneyOffer : senderMoneyOffer);
      const otherMoneyOffer = parseInt(isReciever ? senderMoneyOffer : recieverMoneyOffer);

      const myMarketValueString = calculateMarketValue(myItems);
      const otherUserMarketValueString = calculateMarketValue(otherUserItems);

      var otherUserMarketValue = parseInt(otherUserMarketValueString.slice(1), 10);
      var myMarketValue = parseInt(myMarketValueString.slice(1), 10);
      otherUserMarketValue += otherMoneyOffer;
      myMarketValue += myMoneyOffer;

      if (myMarketValue < otherUserMarketValue * 0.7) {
        setRobberyModalVisible(true);
        return;
      }
    }
    if (currIndex + 1 === 3) {
      initializePaymentSheet();
      return;
    }
    swiperRef?.current?.scrollTo(currIndex + 1);
  };
  const handleBack = () => {
    if (currIndex === 0) {
      //TODO: reset items
      navigation?.goBack();
    } else {
      swiperRef?.current?.scrollTo(currIndex - 1);
    }
  };

  const renderBottomButtonView = () =>
  currIndex !== 3 && (
    <ButtonContainer>
      <LSButton
        title={currIndex === 3 ? 'Checkout & Edit' : 'Next'}
        size={Size.Large}
        type={Type.Primary}
        radius={20}
        onPress={handleNext}
      />
    </ButtonContainer>
  );

  return (
    <Container>
      <RobberyModal
        isModalVisible={robberyModalVisible}
        setModalVisible={setRobberyModalVisible}
      />
      <LSStartTradeHeader
        title={headerTitleOptions()?.title}
        profilePicture={headerTitleOptions()?.profilePicture}
        isReview={currIndex === 2 || currIndex === 3}
        onBackPress={handleBack}
      />
      <ProgressBar progress={(currIndex + 1) / 4} />
      {!loadingStockxData.isLoading && (
        <SwiperComponent ref={swiperRef} onIndexChanged={setCurrIndex}>
          {renderSteps()}
        </SwiperComponent>
      )}

      {renderBottomButtonView()}
    </Container>
  );
};

export default EditTradeScreen;
