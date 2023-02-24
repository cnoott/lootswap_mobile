import React, {FC, useEffect, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import DeliveryAddressComponent from '../../components/orders/deliveryAddressComponent';
import {Size, Type} from 'custom_enums';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {StyleSheet, Modal} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {WEB_APP_URL} from '@env';
import {Alert} from 'custom_top_alert';
import {
  Container,
  HorizontalBar,
  ScrollSubContainer,
  HeadingLabel,
  EmptyView,
  VerticalMargin,
  //  AppliedPromoContainer,
  //  PromoText,
  //  AppliedLabel,
  //  PromoContainer,
  //  PromoDes,
  //  PromoAppliedLabel,
  StretchedRowView,
  ItemSubLabel,
  SummaryText,
} from '../offers/tradeCheckoutStyle';
import {getMyDetailsRequest, getUsersDetailsRequest, getTrade} from '../../redux/modules';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';

//TODO:
//-handle money offer trades
//- move styles out of file
//- put url in env
export const CheckoutScreen: FC<{}> = props => {
  const {
    productData,
    isMoneyOffer = false,
    tradeData = {},
  } = props.route?.params;
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData, requestedUserDetails} = auth;
  const [showGateway, setShowGateway] = useState(false);

  useEffect(() => {
    dispatch(getMyDetailsRequest(userData?._id));
    dispatch(getUsersDetailsRequest(productData?.userId));
  }, [userData?._id, dispatch, productData?.userId]);

  const renderShippingCost = () => {
    if (productData.type === 'trade-only' || isMoneyOffer) {
      return 0;
    }
    switch (productData.who_pays) {
      case 'buyer-pays':
        return productData.sellerShippingCost;
      case 'seller-pays':
        return 0;
      default:
        return 0;
    }
  };

  const renderTotal = () => {
    if (isMoneyOffer) {
      return tradeData?.senderMoneyOffer.toFixed(2);
    } else {
      return (
        parseFloat(renderShippingCost()) + parseFloat(productData?.price)
      ).toFixed(2);
    }
  };

  const onMessage = msg => {
    const data = JSON.parse(msg.nativeEvent.data);
    switch (data.status) {
      case 'success':
        setShowGateway(false);
      if (isMoneyOffer) {
        dispatch(
          getTrade({
            userId: userData?._id,
            tradeId: tradeData?._id,
          }),
        );
        navigation?.replace('TradeCheckoutSuccessScreen', {
            isSale: true,
            total: renderTotal(),
            paypalOrderData: data.info.paypalOrder,
          });

      } else {
          navigation?.replace('BuyCheckoutSuccessScreen', {
            isSale: true,
            total: renderTotal(),
            paypalOrderData: data.info.paypalOrder,
          });
      }
        break;
      case 'error':
        console.log(msg);
        Alert.showError(
          'There was an error with your transaction. Please try again',
        );
        break;
    }
  };

  const renderHeading = (label: string) => {
    return <HeadingLabel>{label}</HeadingLabel>;
  };

  const renderSummaryDetail = (label: string, value: number) => {
    return (
      <StretchedRowView topMargin={5}>
        <ItemSubLabel>{label}</ItemSubLabel>
        <SummaryText>${value}</SummaryText>
      </StretchedRowView>
    );
  };
  const renderPurchaseSummary = () => {
    return (
      <EmptyView>
        {renderHeading('Purchase Summary')}
        {renderSummaryDetail('Shipping', renderShippingCost().toFixed(2))}
        {renderSummaryDetail(
          'Product cost',
          isMoneyOffer
            ? tradeData?.senderMoneyOffer.toFixed(2)
            : productData?.price.toFixed(2),
        )}
        {/*renderSummaryDetail('Taxes and fees', paymentDetails?.)*/}
      </EmptyView>
    );
  };
  const renderTotalView = () => {
    return (
      <StretchedRowView>
        <HeadingLabel>Total</HeadingLabel>
        <HeadingLabel isBlack={true}>${renderTotal()}</HeadingLabel>
      </StretchedRowView>
    );
  };
  const webViewUri =
    `${WEB_APP_URL}/mobile-checkout?` +
    `email=${encodeURIComponent(userData?.email)}` +
    `&merchantId=${encodeURIComponent(
      requestedUserDetails?.paypal_info?.merchantIdInPayPal,
    )}` +
    `&itemId=${encodeURIComponent(productData?._id)}` +
    `&userId=${encodeURIComponent(userData?._id)}` +
    `&isMoneyOffer=${encodeURIComponent(isMoneyOffer)}` +
    `&tradeId=${isMoneyOffer && encodeURIComponent(tradeData?._id)}`;

  const renderCheckOutButton = () => {
    return (
      <LSButton
        title={'CHECK OUT'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'100%'}
        onPress={() => {
          setShowGateway(true);
          console.log(webViewUri);
        }}
      />
    );
  };
  const renderItem = () => {
    return (
      <EmptyView>
        {renderHeading('Product')}
        <TradeCheckoutItemCell itemData={productData} />
      </EmptyView>
    );
  };

  const paypalGateway = () => {
    if (showGateway) {
      return (
        <Modal
          visible={true}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'slide'}
          presentationStyle={'fullScreen'}
          transparent={true}>
          <Container style={styles.webViewCon}>
            <InStackHeader title={'Checkout'} />

            <WebView
              source={{
                uri: webViewUri,
              }}
              onMessage={onMessage}
              style={{flex: 1}}
            />
          </Container>
        </Modal>
      );
    }
  };

  return (
    <Container>
      <InStackHeader title={'Checkout'} onlyTitleCenterAlign={true} />
      <HorizontalBar />
      <ScrollSubContainer>
        <DeliveryAddressComponent
          userDetails={userData}
          onPress={() => navigation?.navigate('AddressScreenBuyCheckout')}
        />
        {renderItem()}
        <VerticalMargin />
        <HorizontalBar />
        <VerticalMargin />
        {renderPurchaseSummary()}
        <VerticalMargin />
        <HorizontalBar />
        <VerticalMargin />
        {renderTotalView()}
        <VerticalMargin />
        {renderCheckOutButton()}
        <VerticalMargin margin={20} />
        {paypalGateway()}
      </ScrollSubContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
export default CheckoutScreen;
