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
  OrderCellContainer,
  ImageContainer,
  OrderImage,
  OrderDetails,
  OrderNameLabel,
  RowView,
  ColorCircle,
  OrderSubDetailsText,
  DetailsVerticalBar,
  FullDivider,
} from './trackOrderScreenStyle';
import OrderTrackSteps from '../../components/orderTrack/orderTrackSteps';
//import OrderStatusDetails from '../../components/orderTrack/orderStatusDetails';
import TradeOfferCell from '../offers/offerItems/TradeOfferCell';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';

export const TrackOrderScreen: FC<any> = ({route}) => {
  const {isTradeOrder = false, item} = route?.params || {};
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;

  const isReciever = userData?._id === item?.reciever;

  const renderTrackingNumber = () => {
    if (!isTradeOrder) {
      return;
    }

    const {recieverUPSShipmentData, senderUPSShipmentData} = item;

    if (isReciever) {
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
      if (
        item.recieverStep < 3 ||
        typeof item.toRecieverTrackingNumber === 'undefined'
      ) {
        return recieverUPSShipmentData.toWarehouse.ShipmentResponse
          .ShipmentResults.PackageResults.TrackingNumber;
      } else {
        return item?.toRecieverTrackingNumber;
      }
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
    const color = 'Black';
    const size = '42';
    const qty = 1;
    const price = 105.0;
    return (
      <OrderCellContainer>
        <ImageContainer>
          <OrderImage source={{uri: 'https://picsum.photos/200'}} />
        </ImageContainer>
        <OrderDetails>
          <OrderNameLabel>Air Jordan 3 Retro</OrderNameLabel>
          <RowView>
            <ColorCircle />
            <OrderSubDetailsText>{color}</OrderSubDetailsText>
            <DetailsVerticalBar />
            <OrderSubDetailsText>Size = {size}</OrderSubDetailsText>
            <DetailsVerticalBar />
            <OrderSubDetailsText>Qty = {qty}</OrderSubDetailsText>
          </RowView>
          <OrderNameLabel>${price}</OrderNameLabel>
        </OrderDetails>
      </OrderCellContainer>
    );
  };
  return (
    <Container>
      <InStackHeader title={'Track Order'} right={true} />
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
