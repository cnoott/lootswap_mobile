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
import {senderEditTradeCheckout, getTrade} from '../../redux/modules';
import {useStripe} from '@stripe/stripe-react-native';
import {Alert} from 'custom_top_alert';
import {LoadingRequest} from '../../redux/modules/loading/actions';

type PaymentDetails = {
  platformFee: number;
  toUserRate: number;
  toWarehouseRate: number;
  total: number;
  userPayout: number;
};

export const EditTradeScreen: FC<any> = ({route}) => {
  const {trade, isReciever} = route?.params;
  const [currIndex, setCurrIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    platformFee: 0,
    toUserRate: 0,
    toWarehouseRate: 0,
    total: 0,
    userPayout: 0,
  });

  const [myItems, setMyItems] = useState(() => {
    let selectedItems;
    let combinedItems;
    if (isReciever) {
      selectedItems = trade.recieverItems.map(item => ({ ...item, isSelected: true }));
      combinedItems = [...selectedItems, ...trade.reciever.my_items];
    } else {
      selectedItems = trade.senderItems.map(item => ({ ...item, isSelected: true }));
      combinedItems = [...selectedItems, ...trade.sender.my_items];
    }

    const uniqueItems = combinedItems.reduce((acc, item) => {
      if (!acc.some(accItem => accItem._id === item._id)) {
        return [...acc, item];
      } else {
        return acc;
      }
    }, []);

    return uniqueItems;
  });

  const [otherUserItems, setOtherUserItems] = useState(() => {
    let selectedItems;
    let combinedItems;
    if (isReciever) {
      selectedItems = trade.senderItems.map(item => ({ ...item, isSelected: true }));
      combinedItems = [...selectedItems, ...trade?.sender.my_items];
    } else {
      selectedItems = trade.recieverItems.map(item => ({ ...item, isSelected: true }));
      combinedItems = [...selectedItems, ...trade?.reciever.my_items];
    }

    const uniqueItems = combinedItems.reduce((acc, item) => {
      if (!acc.some(accItem => accItem._id === item._id)) {
        return [...acc, item];
      } else {
        return acc;
      }
    }, []);

    return uniqueItems;
  });

  const [myMoneyOffer, setMyMoneyOffer] = useState(
    isReciever ? trade.recieverMoneyOffer : trade.senderMoneyOffer,
  );
  const [otherUserMoneyOffer, setOtherUserMoneyOffer] = useState(
    isReciever ? trade.senderMoneyOffer : trade.recieverMoneyOffer,
  );

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
              requestedUserDetails={trade.reciever}
              requestedMoneyOffer={otherUserMoneyOffer}
              setRequestedMoneyOffer={setOtherUserMoneyOffer}
              myMoneyOffer={myMoneyOffer}
              setMyMoneyOffer={setMyMoneyOffer}
            />
          );
        case 4:
          return (
            <StartTradeCheckoutScreen
              recieverItems={
                isReciever
                  ? myItems.filter(item => item?.isSelected)
                  : otherUserItems.filter(item => item?.isSelected)
              }
              senderItems={
                isReciever
                  ? otherUserItems.filter(item => item?.isSelected)
                  : myItems.filter(item => item?.isSelected)
              }
              paymentDetails={paymentDetails}
              loading={loading}
              openPaymentSheet={openPaymentSheet}
            />
          );
      }
    });
  };

  const senderInitializePaymentSheet = () => {
    const reqData = {
      recieverItems: isReciever
        ? myItems.filter(item => item?.isSelected)
        : otherUserItems.filter(item => item?.isSelected),
      senderItems: isReciever
        ? otherUserItems.filter(item => item?.isSelected)
        : myItems.filter(item => item?.isSelected),
      recieverMoneyOffer: isReciever ? myMoneyOffer : otherUserMoneyOffer,
      senderMoneyOffer: isReciever ? otherUserMoneyOffer : myMoneyOffer,
      tradeId: trade._id,
      userId: userData?._id,
    };
    dispatch(
      senderEditTradeCheckout(
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
    if (currIndex + 1 === 3) {
      senderInitializePaymentSheet();
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
      <LSStartTradeHeader
        title={headerTitleOptions()?.title}
        profilePicture={headerTitleOptions()?.profilePicture}
        isReview={currIndex === 2 || currIndex === 3}
        onBackPress={handleBack}
      />
      <ProgressBar progress={(currIndex + 1) / 4} />
      <SwiperComponent ref={swiperRef} onIndexChanged={setCurrIndex}>
        {renderSteps()}
      </SwiperComponent>

      {renderBottomButtonView()}
    </Container>
  );
};

export default EditTradeScreen;
