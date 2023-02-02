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
import RNPrint from 'react-native-print';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';
import {NavigationProp, useNavigation} from '@react-navigation/native';
//TODO:
// - tracking number is a hyperlink
// - tracking
export const TrackOrderScreen: FC<any> = ({route}) => {
  const {isTradeOrder = false, item} = route?.params || {};
  const auth: AuthProps = useSelector(state => state?.auth);
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const {userData} = auth;

  const isReciever = userData?._id === item?.reciever?._id;

  const printLabel = async () => {
    const htmlString = isReciever
      ? `<img src="data:image/png;base64,${item?.recieverUPSShipmentData?.toWearhouseLabel}"`
      : `<img src="data:image/png;base64,${item?.senderUPSShipmentData?.toWearhouseLabel}"`;
    RNPrint.print({
      html: htmlString,
    });
  };

  const renderTrackingNumber = () => {
    if (!isTradeOrder) {
      return;
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

  const printLabelButton = () => (
    <LSButton
      title={'Print Label'}
      size={Size.Extra_Small}
      type={Type.Primary}
      radius={15}
      onPress={() => printLabel()}
    />
  );

  const printLabelRenderOptions = () => {
    if (!isTradeOrder) {
      return;
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
          <TrackingNumberLabel>{renderTrackingNumber()}</TrackingNumberLabel>
        </RowContainer>
        <RowContainer>
          <OrderDataLabel>
            Shipping Carrier: {isTradeOrder ? 'UPS' : 'USPS'}
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
        onBackCall={() => navigation.navigate('MyOrdersListScreen')}
      />
      <SubContainer>
        {renderOrderHeaderDetails()}
        {isTradeOrder ? renderMultipleOrderCell() : renderSingleOrderCell()}
        <OrderTrackSteps
          currStep={isReciever ? item?.senderStep : item?.recieverStep}
          isTradeOrder={isTradeOrder}
        />
        <FullDivider />
        {/*<OrderStatusDetails />*/}
      </SubContainer>
    </Container>
  );
};

export default TrackOrderScreen;
