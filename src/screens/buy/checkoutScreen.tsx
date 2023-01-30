import React, {FC, useEffect, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {StyleSheet, Modal, View, Text, TouchableOpacity} from 'react-native';
import {
  Container,
  HorizontalBar,
  ScrollSubContainer,
  DeliveryAddContainer,
  DeliveryAddressLabel,
  DeliveryAddressText,
  EditLabelContainer,
  EditLabel,
  DeliveryAddSubContainer,
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
import {getMyDetailsRequest, getUsersDetailsRequest} from '../../redux/modules';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';
import {EDIT_PRIMARY_ICON_BOTTOM_LINE} from '../../assets/images/svgs';
import {SvgXml} from 'react-native-svg';

//TODO:
//-handle money offer trades
//- move styles out of file
export const CheckoutScreen: FC<{}> = props => {
  const {productData} = props.route?.params;
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData, requestedUserDetails} = auth;

  const [showGateway, setShowGateway] = useState(false);

  useEffect(() => {
    dispatch(getMyDetailsRequest(userData?._id));
    dispatch(getUsersDetailsRequest(productData?.userId));
  }, [userData?._id, dispatch, productData?.userId]);

  const renderShippingCost = () => {
    switch (productData.type) {
      case 'trade-only':
        return 0;
      case 'buyer-pays':
        return productData.sellerShippingCost;
      case 'seller-pays':
        return 0;
      default:
        return 0;
    }
  };

  const renderHeading = (label: string) => {
    return <HeadingLabel>{label}</HeadingLabel>;
  };

  const renderDeliveryAddressContainer = () => {
    return (
      <DeliveryAddContainer>
        <DeliveryAddSubContainer>
          <DeliveryAddressLabel>Delivery Address</DeliveryAddressLabel>
          <DeliveryAddressText>
            {userData?.shipping_address?.street1}
            {', '}
            {userData?.shipping_address?.street2}
            {userData?.shipping_address?.city}{' '}
            {userData?.shipping_address?.state}{' '}
            {userData?.shipping_address?.zip}
          </DeliveryAddressText>
        </DeliveryAddSubContainer>
        <EditLabelContainer>
          <SvgXml xml={EDIT_PRIMARY_ICON_BOTTOM_LINE} />
          <EditLabel>Edit</EditLabel>
        </EditLabelContainer>
      </DeliveryAddContainer>
    );
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
        {renderSummaryDetail('Shipping', renderShippingCost())}
        {renderSummaryDetail('Product cost', productData?.price)}
        {/*renderSummaryDetail('Taxes and fees', paymentDetails?.)*/}
      </EmptyView>
    );
  };
  const renderTotalView = () => {
    return (
      <StretchedRowView>
        <HeadingLabel>Total</HeadingLabel>
        <HeadingLabel isBlack={true}>
          ${parseFloat(renderShippingCost()) + parseFloat(productData?.price)}
        </HeadingLabel>
      </StretchedRowView>
    );
  };

  const renderCheckOutButton = () => {
    return (
      <LSButton
        title={'CHECK OUT'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'100%'}
        onPress={() => setShowGateway(true)}
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
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 30}}
                onPress={() => setShowGateway(false)}>
                <Text> Close </Text>
              </TouchableOpacity>
            </View>

            <WebView
              source={{
                uri: `http://localhost:3000/mobile-checkout?email=${userData?.email}&merchantId=${requestedUserDetails?.paypal_info?.merchantIdInPayPal}&itemId=${productData?._id}&userId=${userData?._id}`,
              }}
              style={{flex: 1}}
            />
          </View>
        </Modal>
      );
    }
  };

  return (
    <Container>
      <InStackHeader title={'Checkout'} onlyTitleCenterAlign={true} />
      <HorizontalBar />
      <ScrollSubContainer>
        {renderDeliveryAddressContainer()}
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
