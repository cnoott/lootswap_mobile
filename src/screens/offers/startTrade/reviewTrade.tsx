import React, {FC, useState} from 'react';
import {
  ScrollSubContainer,
  TradeReviewText,
  TradeReviewTextTwo,
  AddMoneyContainer,
  EditMoneyContainer,
  MoneyOfferText,
} from './styles';
import StartTradeItemCell from '../../../components/startTrade/startTradeItemCell';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import MonyOfferModal from './MoneyOfferModal.tsx';
import MoneyOfferModal from './MoneyOfferModal';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMyMoneyOffer, setIsMyMoneyOffer] = useState(true);
  const onCloseModal = () => setIsModalVisible(false);


  const showMyLoot = () => (
    <>
      <TradeReviewText> Your loot </TradeReviewText>
      {myItems.filter(item => item?.isSelected).map(item => (
        <StartTradeItemCell item={item} isReview={true} />
      ))}
    </>
  );

  const showOtherUserLoot = () => (
    <>
      <TradeReviewTextTwo>
        For {requestedUserDetails.name}'s loot
      </TradeReviewTextTwo>
      {otherUserItems.filter(item => item?.isSelected).map(item => (
        <StartTradeItemCell item={item} isReview={true} />
      ))}
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
      <ScrollSubContainer>
        {showMyLoot()}
        {renderMoneyOffer(true)}
        {showOtherUserLoot()}
        {renderMoneyOffer(false)}
      </ScrollSubContainer>
    </>
  );
};

export default ReviewTrade;
