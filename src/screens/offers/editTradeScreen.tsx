import React, {FC, useState, useRef, useEffect} from 'react';
import {ProgressBar, SwiperComponent} from '../loot/styles';
import {LSStartTradeHeader} from '../../components/commonComponents/headers/startTradeHeader';
import {Container, ButtonContainer} from './startTrade/styles';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {StartTradeStepTwo} from './startTrade/startTradeStepTwo';
import {StartTradeStepOne} from './startTrade/startTradeStepOne';
import {ReviewTrade} from './startTrade/reviewTrade';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {editTradeCheckout, getTrade} from '../../redux/modules';
import {Alert} from 'custom_top_alert';
import {LoadingProps} from '../../redux/modules/loading/reducer';
import {calculateMarketValue} from '../../utility/utility';
import RobberyModal from '../../components/offers/RobberyModal';
import {TradeProps} from '../../redux/modules/offers/reducer';

export const EditTradeScreen: FC<any> = ({route}) => {
  const {isReceiver} = route?.params;
  const tradeData: TradeProps = useSelector(state => state.offers);
  let trade = tradeData?.trade;
  const [currIndex, setCurrIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();
  const loadingStockxData: LoadingProps = useSelector(state => state.loading);

  const [robberyModalVisible, setRobberyModalVisible] = useState(false);

  const [senderItems, setSenderItems] = useState(() => {
    let selectedItems;
    let combinedItems;

    selectedItems = trade.senderItems.map(item => ({
      ...item,
      isSelected: true,
    }));
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

  const [receiverItems, setReceiverItems] = useState(() => {
    let selectedItems;
    let combinedItems;
    selectedItems = trade.receiverItems.map(item => ({
      ...item,
      isSelected: true,
    }));
    combinedItems = [...selectedItems, ...trade?.receiver.my_items];

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
    parseFloat(trade?.senderMoneyOffer),
  );
  const [receiverMoneyOffer, setReceiverMoneyOffer] = useState(
    parseFloat(trade?.receiverMoneyOffer),
  );

  useEffect(() => {
    // Update senderItems based on trade prop
    const updatedSenderItems = (() => {
      let selectedItems;
      let combinedItems;

      selectedItems = trade.senderItems.map(item => ({
        ...item,
        isSelected: true,
      }));
      combinedItems = [...selectedItems, ...trade.sender.my_items];

      return combinedItems.reduce((acc, item) => {
        if (!acc.some(accItem => accItem._id === item._id)) {
          return [...acc, item];
        } else {
          return acc;
        }
      }, []);
    })();

    // Update receiverItems based on trade prop
    const updatedReceiverItems = (() => {
      let selectedItems;
      let combinedItems;
      selectedItems = trade.receiverItems.map(item => ({
        ...item,
        isSelected: true,
      }));
      combinedItems = [...selectedItems, ...trade?.receiver.my_items];

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
    setReceiverItems(updatedReceiverItems);
  }, [trade]); // The useEffect will run when the trade prop changes

  const headerTitleOptions = () => {
    switch (currIndex) {
      case 0:
        return {
          title: `${
            isReceiver ? trade.sender?.name : trade.receiver?.name
          }'s loot`,
          profilePicture: isReceiver
            ? trade.sender?.profile_picture
            : trade.receiver?.profile_picture,
        };
      case 1:
        return {
          title: `Your loot`,
          profilePicture: userData.profile_picture,
        };
      case 2:
        return {
          title: 'Review New Offer',
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
              otherUserItems={isReceiver ? senderItems : receiverItems}
              setOtherUserItems={isReceiver ? setSenderItems : setReceiverItems}
            />
          );
        case 2:
          return (
            <StartTradeStepTwo
              myItems={isReceiver ? receiverItems : senderItems}
              setMyItems={isReceiver ? setReceiverItems : setSenderItems}
            />
          );
        case 3:
          return (
            <ReviewTrade
              otherUserItems={isReceiver ? senderItems : receiverItems}
              myItems={isReceiver ? receiverItems : senderItems}
              requestedUserDetails={isReceiver ? trade.sender : trade.receiver}
              requestedMoneyOffer={
                isReceiver ? senderMoneyOffer : receiverMoneyOffer
              }
              setRequestedMoneyOffer={
                isReceiver ? setSenderMoneyOffer : setReceiverMoneyOffer
              }
              myMoneyOffer={isReceiver ? receiverMoneyOffer : senderMoneyOffer}
              setMyMoneyOffer={
                isReceiver ? setReceiverMoneyOffer : setSenderMoneyOffer
              }
            />
          );
      }
    });
  };

  const completeEditTrade = () => {
    const reqData = {
      receiverItems: receiverItems.filter(item => item?.isSelected),
      senderItems: senderItems.filter(item => item?.isSelected),
      receiverMoneyOffer: receiverMoneyOffer,
      senderMoneyOffer: senderMoneyOffer,
      tradeId: trade._id,
      userId: userData?._id,
    };
    dispatch(
      editTradeCheckout(
        reqData,
        async res => {
          dispatch(
            getTrade({
              userId: userData?._id,
              tradeId: trade._id,
            }),
          );
        },
        error => {
          console.log('ERRRO');
          Alert.showError(error);
        },
      ),
    );
  };

  const handleNext = () => {
    if (currIndex === 2) {
      const selectedReceiverItems = receiverItems.filter(
        _item => _item?.isSelected,
      );
      const selectedSenderItems = senderItems.filter(
        _item => _item?.isSelected,
      );
      let myItems = isReceiver ? selectedReceiverItems : selectedSenderItems;
      let otherUserItems = isReceiver
        ? selectedSenderItems
        : selectedReceiverItems;

      const myMoneyOffer = parseInt(
        isReceiver ? receiverMoneyOffer : senderMoneyOffer,
      );
      const otherMoneyOffer = parseInt(
        isReceiver ? senderMoneyOffer : receiverMoneyOffer,
      );

      const myMarketValueString = calculateMarketValue(myItems);
      const otherUserMarketValueString = calculateMarketValue(otherUserItems);

      var otherUserMarketValue = parseInt(
        otherUserMarketValueString.slice(1),
        10,
      );
      var myMarketValue = parseInt(myMarketValueString.slice(1), 10);
      otherUserMarketValue += otherMoneyOffer;
      myMarketValue += myMoneyOffer;

      if (myMarketValue < otherUserMarketValue * 0.7) {
        setRobberyModalVisible(true);
        return;
      }
    }
    if (currIndex + 1 === 3) {
      completeEditTrade();
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
          title={currIndex === 2 ? 'Submit' : 'Next'}
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
