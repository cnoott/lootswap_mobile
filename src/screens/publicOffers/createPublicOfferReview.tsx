import React, {FC, useState} from 'react';
import {StepContainer} from './styles';
import StartTradeItemCell from '../../components/startTrade/startTradeItemCell';
import MoneyOfferModal from '../offers/startTrade/MoneyOfferModal';
import {
  calculateMarketValue,
  findMarketDataFromSize,
} from '../../utility/utility';
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
} from '../offers/startTrade/styles';
import {ScrollView} from 'react-native';
import ReviewStockxItemCell from '../../components/publicOffer/reviewStockxItemCell';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';

interface ReviewProps {
  myItems: Array<any>;
  setMyItems: Function;
  publicOffersData: any;
  setPublicOffersData: Function;
}

export const CreatePublicOfferReview: FC<ReviewProps> = props => {
  const {myItems, setMyItems, publicOffersData, setPublicOffersData} = props;
  const {receivingStockxProducts, receivingMoneyOffer, sendingMoneyOffer} =
    publicOffersData;

  const [moneyModalVisible, setMoneyModalVisible] = useState(false);
  const [isSendingOffer, setIsSendingOffer] = useState(true);

  const setSendingMoneyOffer = (moneyOffer: number) => {
    setPublicOffersData({
      ...publicOffersData,
      sendingMoneyOffer: moneyOffer,
    });
  };

  const setReceivingMoneyOffer = (moneyOffer: number) => {
    setPublicOffersData({
      ...publicOffersData,
      receivingMoneyOffer: moneyOffer,
    });
  };

  const showMyLoot = () => {
    return (
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
  };

  const renderSendingMoneyOffer = (sendingOffer: Boolean) => {
    if (
      (sendingMoneyOffer <= 0 && sendingOffer) ||
      (receivingMoneyOffer <= 0 && !sendingOffer)
    ) {
      return (
        <AddMoneyContainer>
          <LSButton
            title={'+ Add money'}
            size={Size.Small}
            type={Type.Success}
            radius={30}
            onPress={() => {
              sendingOffer ? setIsSendingOffer(true) : setIsSendingOffer(false);
              setMoneyModalVisible(true);
            }}
          />
        </AddMoneyContainer>
      );
    }
    return (
      <EditMoneyContainer>
        <MoneyOfferText>
          +${sendingOffer ? sendingMoneyOffer : receivingMoneyOffer}
        </MoneyOfferText>
        <LSButton
          title={'Edit Offer'}
          size={Size.Small}
          type={Type.Success}
          radius={30}
          onPress={() => {
            sendingOffer ? setIsSendingOffer(true) : setIsSendingOffer(false);
            setMoneyModalVisible(true);
          }}
        />
      </EditMoneyContainer>
    );
  };

  const showReceivingProducts = () => {
    return (
      <>
        <TradeReviewText>Public Offer</TradeReviewText>
        {publicOffersData.receivingStockxProducts.map(item => (
          <ReviewStockxItemCell stockxProduct={item} />
        ))}
        <MarketValueContainer>
          <MarketValueTitle>Total Est. Market Value: </MarketValueTitle>
          <MarketValueText>
            $
            {receivingStockxProducts.reduce(
              (sum, product) =>
                sum +
                findMarketDataFromSize(product, product.chosenSize)?.lastSale,
              0,
            )}
          </MarketValueText>
        </MarketValueContainer>
      </>
    );
  };

  return (
    <>
      <MoneyOfferModal
        myMoneyOffer={sendingMoneyOffer}
        setMyMoneyOffer={setSendingMoneyOffer}
        requestedMoneyOffer={receivingMoneyOffer}
        setRequestedMoneyOffer={setReceivingMoneyOffer}
        isMyMoneyOffer={isSendingOffer}
        isModalVisible={moneyModalVisible}
        onCloseModal={() => setMoneyModalVisible(false)}
      />

      <StepContainer>
        <ScrollView contentInset={{bottom: 80}}>
          {showMyLoot()}
          {renderSendingMoneyOffer(true)}
          {showReceivingProducts()}
          {renderSendingMoneyOffer(false)}
        </ScrollView>
      </StepContainer>
    </>
  );
};

export default CreatePublicOfferReview;
