import React, {FC, useState} from 'react';
import {
  ScrollSubContainer,
  TradeReviewText,
  TradeReviewTextTwo,
  AddMoneyContainer,
  EditMoneyContainer,
  MoneyOfferText,
  MarketValueContainer,
  MarketValueTitle,
  MarketValueText,
} from './styles';
import StartTradeItemCell from '../../../components/startTrade/startTradeItemCell';
import DeliveryAddressComponent from '../../../components/orders/deliveryAddressComponent';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import MoneyOfferModal from './MoneyOfferModal';
import {calculateMarketValue} from '../../../utility/utility';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface ReviewTradeProps {
  otherUserItems: any;
  myItems: any;
  requestedUserDetails: any;
  requestedMoneyOffer: Number;
  setRequestedMoneyOffer: Function;
  myMoneyOffer: Number;
  setMyMoneyOffer: Function;
}

export const ReviewTrade: FC<ReviewTradeProps> = props => {
  const {
    otherUserItems,
    myItems,
    requestedUserDetails,
    requestedMoneyOffer,
    setRequestedMoneyOffer,
    myMoneyOffer,
    setMyMoneyOffer,
  } = props;
  const navigation: NavigationProp<any, any> = useNavigation();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMyMoneyOffer, setIsMyMoneyOffer] = useState(true);
  const onCloseModal = () => setIsModalVisible(false);

  const showMyLoot = () => (
    <>
      <TradeReviewText> Your loot </TradeReviewText>
      {myItems
        .filter(item => item?.isSelected)
        .map(item => (
          <StartTradeItemCell item={item} isReview={true} />
        ))}
      <MarketValueContainer>
        <MarketValueTitle>Total Est. Market Value: </MarketValueTitle>
        <MarketValueText>
          {calculateMarketValue(myItems.filter(item => item?.isSelected))}
        </MarketValueText>
      </MarketValueContainer>
    </>
  );

  const showOtherUserLoot = () => (
    <>
      <TradeReviewTextTwo>
        For {requestedUserDetails.name}'s loot
      </TradeReviewTextTwo>
      {otherUserItems
        .filter(item => item?.isSelected)
        .map(item => (
          <StartTradeItemCell item={item} isReview={true} />
        ))}
      <MarketValueContainer>
        <MarketValueTitle>Total Est. Market Value: </MarketValueTitle>
        <MarketValueText>
          {calculateMarketValue(
            otherUserItems.filter(item => item?.isSelected),
          )}
        </MarketValueText>
      </MarketValueContainer>
    </>
  );

  const renderMoneyOffer = (isMyMoneyOffer: boolean) => {
    if (isMyMoneyOffer) {
      if (myMoneyOffer <= 0) {
        return (
          <AddMoneyContainer>
            <LSButton
              title={'+ Add money'}
              size={Size.Small}
              type={Type.Success}
              radius={30}
              onPress={() => handleMyMoneyOfferPress()}
            />
          </AddMoneyContainer>
        );
      }
      return (
        <EditMoneyContainer>
          <MoneyOfferText>+${myMoneyOffer}</MoneyOfferText>
          <LSButton
            title={'Edit Offer'}
            size={Size.Small}
            type={Type.Success}
            radius={30}
            onPress={() => handleMyMoneyOfferPress()}
          />
        </EditMoneyContainer>
      );
    }

    if (requestedMoneyOffer <= 0) {
      return (
        <AddMoneyContainer>
          <LSButton
            title={'Request Money'}
            size={Size.Small}
            type={Type.Success}
            radius={30}
            onPress={() => handleRequestedOfferPress()}
          />
        </AddMoneyContainer>
      );
    }
    return (
      <EditMoneyContainer>
        <MoneyOfferText>+${requestedMoneyOffer}</MoneyOfferText>
        <LSButton
          title={'Edit Request'}
          size={Size.Small}
          type={Type.Success}
          radius={30}
          onPress={() => handleRequestedOfferPress()}
        />
      </EditMoneyContainer>
    );
  };

  const handleMyMoneyOfferPress = () => {
    setIsMyMoneyOffer(true);
    setIsModalVisible(true);
  };

  const handleRequestedOfferPress = () => {
    setIsMyMoneyOffer(false);
    setIsModalVisible(true);
  };

  return (
    <>
      <MoneyOfferModal
        myMoneyOffer={myMoneyOffer}
        setMyMoneyOffer={setMyMoneyOffer}
        requestedMoneyOffer={requestedMoneyOffer}
        setRequestedMoneyOffer={setRequestedMoneyOffer}
        isMyMoneyOffer={isMyMoneyOffer}
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
      />
      <ScrollSubContainer contentInset={{bottom: 80}}>
        <DeliveryAddressComponent
          userDetails={userData}
          onPress={() =>
            navigation.navigate('AddressScreenCheckout', {
              isFromBuyCheckout: true,
            })
          }
        />
        {showMyLoot()}
        {renderMoneyOffer(true)}
        {showOtherUserLoot()}
        {renderMoneyOffer(false)}
      </ScrollSubContainer>
    </>
  );
};

export default ReviewTrade;
