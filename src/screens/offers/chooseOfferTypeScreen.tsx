import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
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
} from './startTrade/styles';
import {
  HOME_CAROUSEL_SHOE_ONE,
  HOME_CAROUSEL_SHOE_TWO,
  MONEY_WITH_WINGS,
} from '../../constants/imageConstants';
import {SvgXml} from 'react-native-svg';
import {SWAP_ICON_HOME_CAROASAL} from 'localsvgimages';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import analytics from '@react-native-firebase/analytics';

export const ChooseOfferTypeScreen: FC<any> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const {requestedUserDetails, userData} = auth;
  const homeStates: AuthProps = useSelector(state => state.home);
  const {selectedProductDetails} = homeStates;

  const handleTradeNext = () => {
    navigation.navigate('StartTradeScreen', {
      requestedUserDetails: requestedUserDetails,
      userData: userData,
      initialIsMoneyOffer: false,
      selectedProduct: selectedProductDetails,
    });
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    analytics().logEvent('begin_start_trade_offer', {
      id: trade?._id,
      timestamp: currentEpochTime
    });
  };

  const handleMoneyOfferNext = () => {
    navigation.navigate('SendMoneyOfferScreen');
  };

  const tradeOfferButton = () => (
    <TradeOfferButtonConatiner onPress={handleTradeNext}>
      <TradeOfferTopSection>
        <Image source={HOME_CAROUSEL_SHOE_ONE} width={95} height={59} />
        <SwapIconContainer>
          <SvgXml xml={SWAP_ICON_HOME_CAROASAL} />
        </SwapIconContainer>
        <Image source={HOME_CAROUSEL_SHOE_TWO} width={95} height={59} />
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
      <Image source={MONEY_WITH_WINGS} width={76} height={76} />
      <MoneyOfferBottomSection>
        <ButtonTitleText>Only Money Offer</ButtonTitleText>
        <ButtonSubText>All offers are binding PayPal Offers</ButtonSubText>
      </MoneyOfferBottomSection>
    </MoneyOfferButtonConatiner>
  );

  return (
    <>
      <InStackHeader back={true} title={'Send Offer'} />
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

export default ChooseOfferTypeScreen;
