/***
LootSwap - TRACK ORDER SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {
  Container,
  SubContainer,
  RowContainer,
  OrderDataLabel,
  TrackingNumberLabel,
  Image,
  FullDivider,
} from './trackOrderScreenStyle';
import OrderTrackSteps from '../../components/orderTrack/orderTrackSteps';
//import OrderStatusDetails from '../../components/orderTrack/orderStatusDetails';
import TradeOfferCell from '../offers/offerItems/TradeOfferCell';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {printLabel, salePrintLabel} from '../../utility/utility';
import {Linking} from 'react-native';
//TODO:
// - tracking number is a hyperlink
// - tracking
export const TrackOrderScreen: FC<any> = ({route}) => {
  const {isTradeOrder = false, item} = route?.params || {};
  const auth: AuthProps = useSelector(state => state?.auth);
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const {userData} = auth;

  const isReciever = userData?._id === item?.reciever?._id;

  const base64Img = isReciever
    ? item?.recieverUPSShipmentData?.toWarehouseLabel
    : item?.senderUPSShipmentData?.toWarehouseLabel;

  const shippingStepOptions = () => {
    if (isTradeOrder) {
      return isReciever ? item?.senderStep : item?.recieverStep;
    } else {
      return item?.shippingStep;
    }
  };

  const renderTrackingNumber = () => {
    if (!isTradeOrder && item?.shippingStep > 0) {
      return item?.shippoData?.tracking_number;
    }

    const {recieverUPSShipmentData, senderUPSShipmentData} = item;

    if (isReciever) {
      if (item.senderPaymentStatus === 'unpaid') {
        return 'Waiting for other user to pay';
      }

      if (
        item.senderStep < 3 ||
        typeof item.toSenderTrackingNumber === 'undefined'
      ) {
        return senderUPSShipmentData.toWarehouse.ShipmentResponse
          .ShipmentResults.PackageResults.TrackingNumber;
      } else {
        return item?.toSenderTrackingNumber;
      }
    } else {
      if (item.senderPaymentStatus === 'processing') {
        return 'Payment processing';
      }
      if (item.senderPaymentStatus === 'unpaid') {
        return 'Check back soon for shipping label';
      }

      if (
        item.recieverStep < 3 ||
        typeof item.toRecieverTrackingNumber === 'undefined'
      ) {
        return recieverUPSShipmentData?.toWarehouse?.ShipmentResponse
          ?.ShipmentResults?.PackageResults?.TrackingNumber;
      } else {
        return item?.toRecieverTrackingNumber;
      }
    }
  };

  const openTrackingLink = async () => {
    let trackingNumber = renderTrackingNumber();
    if (!trackingNumber) {
      return;
    }

    const url = isTradeOrder
      ? `https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=${trackingNumber}`
      : item?.shippoData?.tracking_url_provider;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const printLabelButton = () => (
    <LSButton
      title={'Print Label'}
      size={Size.Extra_Small}
      type={Type.Primary}
      radius={15}
      onPress={() =>
        isTradeOrder
          ? printLabel(base64Img)
          : salePrintLabel(item?.shippoData?.label_url)
      }
    />
  );

  const printLabelRenderOptions = () => {
    if (!isTradeOrder && item?.shippingStep > 0) {
      return printLabelButton();
    }
    if (
      item.recieverPaymentStatus === 'paid' &&
      item.senderPaymentStatus === 'paid'
    ) {
      return printLabelButton();
    }
  };

  //TODO: save carrier for purchase/sales
  const renderOrderHeaderDetails = () => {
    return (
      <>
        <RowContainer>
          <OrderDataLabel>Tracking Number</OrderDataLabel>
          <TrackingNumberLabel onPress={() => openTrackingLink()}>
            {renderTrackingNumber()}
          </TrackingNumberLabel>
        </RowContainer>
        <RowContainer>
          <OrderDataLabel>
            Shipping Carrier:{' '}
            {isTradeOrder ? 'UPS' : item?.shippoRate?.provider}
          </OrderDataLabel>
          {isTradeOrder && (
            <Image
              source={{
                uri: 'https://1000logos.net/wp-content/uploads/2021/04/UPS-logo.png',
              }}
            />
          )}
        </RowContainer>
      </>
    );
  };
  const renderMultipleOrderCell = () => {
    return <TradeOfferCell offerItem={item.tradeId} />;
  };
  const renderSingleOrderCell = () => {
    return (
      <RowContainer>
        <TradeCheckoutItemCell itemData={item?.productId} />
      </RowContainer>
    );
  };
  return (
    <Container>
      <InStackHeader
        title={'Track Order'}
        right={false}
        printLabel={true}
        printLabelButton={printLabelRenderOptions}
        onBackCall={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'ProfileScreen'}],
          });
          navigation.navigate('MyOrdersListScreen');
        }}
      />
      <SubContainer>
        {renderOrderHeaderDetails()}
        {isTradeOrder ? renderMultipleOrderCell() : renderSingleOrderCell()}
        <OrderTrackSteps
          currStep={shippingStepOptions()}
          isTradeOrder={isTradeOrder}
        />
        <FullDivider />
        {/*<OrderStatusDetails />*/}
      </SubContainer>
    </Container>
  );
};

export default TrackOrderScreen;
