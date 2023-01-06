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
import OrderStatusDetails from '../../components/orderTrack/orderStatusDetails';

export const TrackOrderScreen: FC<{}> = () => {
  const renderOrderHeaderDetails = () => {
    return (
      <>
        <RowContainer>
          <OrderDataLabel>Tracking Number</OrderDataLabel>
          <TrackingNumberLabel>987665231069340553</TrackingNumberLabel>
        </RowContainer>
        <RowContainer>
          <OrderDataLabel>Shipping Carrier: USPS</OrderDataLabel>
          <Image source={{uri: 'https://picsum.photos/200'}} />
        </RowContainer>
      </>
    );
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
        {renderSingleOrderCell()}
        <OrderTrackSteps currStep={2} />
        <FullDivider />
        <OrderStatusDetails />
      </SubContainer>
    </Container>
  );
};

export default TrackOrderScreen;
