import React, {FC, useEffect, useState, useRef} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import DeliveryAddressComponent from '../../components/orders/deliveryAddressComponent';
import {Size, Type} from 'custom_enums';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
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
} from '../../components/offers/tradeCheckoutStyle';
import {
  getMyDetailsRequest,
  getUsersDetailsRequest,
  getTrade,
  createPaypalOrder,
  capturePaypalOrder,
} from '../../redux/modules';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';
import {loggingService} from '../../services/loggingService';

const {PayPalModule} = NativeModules;
const payPalModuleEmitter = new NativeEventEmitter(PayPalModule);

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

  const [paypalOrderId, setPaypalOrderId] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    const subscription = payPalModuleEmitter.addListener(
      'onPayPalCheckoutFinished',
      resultData => {
        if (resultData.status === 'error') {
          Alert.showError('Error checking out, please try again');
          return;
        }
        console.log('paypal checkout finished', resultData);
        const reqData = {
          productId: productData?._id,
          userId: userData?._id,
          isMoneyOffer: isMoneyOffer,
          tradeId: tradeData?._id,
          paypalId: resultData.orderID,
          email: userData?.email,
        }
        dispatch(
          capturePaypalOrder(
            reqData,
            res => {
              handleNavigation(res);
            },
            err => {
              Alert.showError('Error finishing checkout, please try again');
            },
          ),
        );
      },
    );

    dispatch(getMyDetailsRequest(userData?._id));
    dispatch(getUsersDetailsRequest(productData?.userId));
    const reqData = {
      productId: productData?._id,
      userId: userData?._id,
      isMoneyOffer: isMoneyOffer,
      tradeId: tradeData?._id
    };

    dispatch(
      createPaypalOrder(
        reqData,
        res => {
          console.log(res);
          PayPalModule.setupPayPal(res.clientId);
          setPaypalOrderId(res.id)
        },
        err => {
          // TODO: better handle error
          Alert.showError('Error checking out');
        },
      ),
    );

    return () => subscription.remove();
  }, [userData?._id, dispatch, productData?.userId]);
 
  const handleNavigation = (responseData: any) => {
    if (isMoneyOffer) {
      dispatch(
        getTrade({
          userId: userData?._id,
          tradeId: tradeData?._id,
        }),
      );
      loggingService().logEvent('purchase', {
        transaction_id: responseData.paypalOrder._id,
        items: [
          {
            item_id: productData?._id,
            item_category: productData?.category,
            item_brand: productData?.item_brand,
            price: productData?.price,
            item_name: productData?.name,
          },
        ],
      });
      console.log('paypalinfo', responseData.paypalOrder);
      navigation?.replace('TradeCheckoutSuccessScreen', {
        isSale: true,
        total: renderTotal(),
        paypalOrderData: responseData.paypalOrder,
      });
    } else {
      navigation?.replace('BuyCheckoutSuccessScreen', {
        isSale: true,
        total: renderTotal(),
        paypalOrderData: responseData.paypalOrder,
      });
    }

  };

  const renderShippingCost = () => {
    if (productData.type === 'trade-only') {
      return 0;
    }
    switch (productData.who_pays) {
      case 'buyer-pays':
        return parseFloat(productData.sellerShippingCost);
      case 'seller-pays':
        return 0;
      default:
        return 0;
    }
  };

  const renderTotal = () => {
    if (isMoneyOffer) {
      return parseFloat(parseFloat(tradeData?.senderMoneyOffer) + parseFloat(renderShippingCost())).toFixed(2);
    } else {
      return parseFloat(parseFloat(renderShippingCost()) + parseFloat(productData?.price)).toFixed(2);
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
        {renderSummaryDetail(
          'Product cost',
          isMoneyOffer
            ? tradeData?.senderMoneyOffer.toFixed(2)
            : productData?.price.toFixed(2),
        )}
        {renderSummaryDetail('Shipping', renderShippingCost().toFixed(2))}
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

  const startPaypal = async () => {
    if (paypalOrderId) {
      loggingService().logEvent('begin_checkout', {
        items: [
          {
            item_id: productData?._id,
            item_category: productData?.category,
            item_brand: productData?.item_brand,
            price: productData?.price,
            item_name: productData?.name,
          },
        ],
      });

      const result = await PayPalModule.startPayPalCheckout(paypalOrderId)
    } else {
      Alert.showError('There was an issue with checkout, please try again');
    }
  };

  const renderCheckOutButton = () => {
    return (
      <LSButton
        title={'Checkout with PayPal'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'100%'}
        onPress={startPaypal}
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

  return (
    <Container>
      <InStackHeader title={'Checkout'} onlyTitleCenterAlign={true} />
      <HorizontalBar />
      <ScrollSubContainer ref={scrollViewRef}>
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
      </ScrollSubContainer>
    </Container>
  );
};
export default CheckoutScreen;
