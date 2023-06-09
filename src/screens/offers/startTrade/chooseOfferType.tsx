import React, {FC} from 'react';
import {
  SelectedLootText,
  SelectLootText,
  TradeOfferButtonConatiner,
  TradeOfferTopSection,
  TradeOfferBottomSection,
  ButtonTitleText,
  ButtonSubText,
  MoneyOfferButtonConatiner,
  MoneyOfferBottomSection,
  ChooseOfferContainer,
  ORText,
  SwapIconContainer,
  Image,
} from './styles';
import {
  HOME_CAROUSEL_SHOE_ONE,
  HOME_CAROUSEL_SHOE_TWO,
  MONEY_WITH_WINGS,
} from '../../../constants/imageConstants';
import {SvgXml} from 'react-native-svg';
import {SWAP_ICON_HOME_CAROASAL} from 'localsvgimages';

interface ChooseOfferTypeProps {
  handleNext: Function;
  handleMoneyOfferNext: Function;
}


export const ChooseOfferType: FC<ChooseOfferTypeProps> = props => {
  const {
    handleNext = () => {},
    handleMoneyOfferNext = () => {},
  } = props;
  const tradeOfferButton = () => (
    <TradeOfferButtonConatiner onPress={handleNext}>
      <TradeOfferTopSection>
        <Image source={HOME_CAROUSEL_SHOE_ONE} width={95} height={59}/>
        <SwapIconContainer>
          <SvgXml xml={SWAP_ICON_HOME_CAROASAL} />
        </SwapIconContainer>
        <Image source={HOME_CAROUSEL_SHOE_TWO} width={95} height={59}/>
      </TradeOfferTopSection>
      <TradeOfferBottomSection>
        <ButtonTitleText>A Trade Offer </ButtonTitleText>
        <ButtonSubText>
          Can Trade up to 3 items & request money within the trade
        </ButtonSubText>
      </TradeOfferBottomSection>
    </TradeOfferButtonConatiner>
  );

  const myMoneyOfferButton = () => (
    <MoneyOfferButtonConatiner onPress={handleMoneyOfferNext}>
      <Image source={MONEY_WITH_WINGS} width={76} height={76}/>
      <MoneyOfferBottomSection>
        <ButtonTitleText>Only Money Offer</ButtonTitleText>
        <ButtonSubText>All offers are binding PayPal Offers</ButtonSubText>
      </MoneyOfferBottomSection>
    </MoneyOfferButtonConatiner>
  );

  return (
    <>
      <SelectLootText>Select your type of offer</SelectLootText>
      <SelectedLootText>Select Option</SelectedLootText>
      <ChooseOfferContainer>
        {tradeOfferButton()}
        <ORText> OR</ORText>
        {myMoneyOfferButton()}
      </ChooseOfferContainer>
    </>
  );
};

export default ChooseOfferType;
