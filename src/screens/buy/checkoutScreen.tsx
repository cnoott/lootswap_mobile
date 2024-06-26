import React, {FC, useEffect, useState} from 'react';
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
  getProductDetails,
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
  const {userData} = auth;
  const userNoAddress =
    Object.keys(userData?.shipping_address || {}).length < 5;

  const [paypalOrderId, setPaypalOrderId] = useState('');
  const [costBreakdown, setCostBreakdown] = useState({
    buyerFee: 0,
    shippingCost: 0,
    total: 0,
  });

  useEffect(() => {
    if (userNoAddress) {
      return;
    }
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
        };
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
    if (isMoneyOffer) {
      dispatch(getMyDetailsRequest(userData?._id));
    }
    const reqData = {
      productId: productData?._id,
      userId: userData?._id,
      isMoneyOffer: isMoneyOffer,
      tradeId: tradeData?._id,
    };

    dispatch(
      createPaypalOrder(
        reqData,
        res => {
          console.log(res);
          PayPalModule.setupPayPal(res.clientId, __DEV__ ? 'sandbox' : 'live');
          setPaypalOrderId(res.id);
          console.log(res.breakdown);
          setCostBreakdown(res.breakdown);
        },
        err => {
          Alert.showError('Error checking out, please try again');
        },
      ),
    );

    return () => subscription.remove();
  }, [
    userData?._id,
    dispatch,
    productData?.userId,
    userData?.shipping_address.street1,
  ]);

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
      dispatch(getProductDetails(productData?._id));
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
    return costBreakdown.total.toFixed(2);
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
        {renderSummaryDetail('Shipping', costBreakdown.shippingCost.toFixed(2))}
        {renderSummaryDetail('Taxes and Fees', costBreakdown.buyerFee.toFixed(2))}
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
    if (userNoAddress) {
      Alert.showError('Please edit your shipping address at the top');
      return;
    }
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

      const result = await PayPalModule.startPayPalCheckout(paypalOrderId);
    } else {
      Alert.showError('There was an issue with checkout, please try again');
    }
  };

  const renderCheckOutButton = () => {
    return (
      <LSButton
        title={'Checkout with PayPal'}
        size={Size.Fit_To_Width}
        type={userNoAddress ? Type.Disabled : Type.Primary}
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
      <ScrollSubContainer>
        <DeliveryAddressComponent
          userDetails={userData}
          onPress={() =>
            navigation?.navigate('AddressScreenBuyCheckout', {
              isFromBuyCheckout: true,
            })
          }
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
