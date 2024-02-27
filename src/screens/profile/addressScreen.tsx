/***
  LootSwap - EDIT ADDRESS SCREEN
 ***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, MainContent} from './editProfileStyles';
import {EditAddressComponent} from '../../components/profile/editAddressComponent';
import {useDispatch, useSelector} from 'react-redux';
import {TradeProps, AuthProps} from '../../redux/modules/offers/reducer';
import {getTrade, acceptMoneyOfferTrade} from '../../redux/modules';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'custom_top_alert';

export const AddressScreen: FC<{}> = props => {
  const {isFromTradeCheckout = false, isFromBuyCheckout = false} =
    props?.route?.params ?? {};

  const navigation: NavigationProp<any, any> = useNavigation();

  const tradeData: TradeProps = useSelector(state => state.offers);
  let offerItem = tradeData?.trade;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const dispatch = useDispatch();

  const handleNavigation = () => {
    if (isFromTradeCheckout) {
      const moneyOfferOnly =
        offerItem.senderItems.length === 0 && offerItem.senderMoneyOffer > 0;
      if (moneyOfferOnly) {
        const reqData = {
          tradeId: offerItem?._id,
          userId: userData?._id,
        };
        dispatch(
          acceptMoneyOfferTrade(
            reqData,
            () => {
              dispatch(
                getTrade({
                  userId: userData?._id,
                  tradeId: offerItem?._id,
                }),
              );
              navigation.goBack();
            },
            () => {
              Alert.showError('Error accepting trade!');
            },
          ),
        );
      } else {
        navigation?.navigate('AcceptTradeCheckoutScreen', {
          trade: offerItem,
        });
      }
    }
  };

  return (
    <MainContent>
      <InStackHeader title="Edit Shipping Address" />
      <Container>
        <EditAddressComponent
          handleNavigation={handleNavigation}
          showDisclaimer={isFromTradeCheckout || isFromBuyCheckout}
        />
      </Container>
    </MainContent>
  );
};

export default AddressScreen;
