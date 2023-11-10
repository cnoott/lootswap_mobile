/***
LootSwap - TRACK ORDER SCREEN
***/

import React, {FC, useState, useEffect} from 'react';
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
import PublicOfferCell from '../../components/publicOffer/PublicOfferCell';
import RateUserButton from '../../components/orders/rateUserButton';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  setFirstTimeOpenFalseRequest,
  setOrderNotifAsReadRequest,
  setPaypalNotifAsReadRequest,
} from '../../redux/modules/';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {printLabel, salePrintLabel} from '../../utility/utility';
import {Linking} from 'react-native';
import ShippingInstructionModalComponent from '../../components/orders/shippingInstructionModalComponent';
import {LSModal} from '../../components/commonComponents/LSModal';

export const TrackOrderScreen: FC<any> = ({route}) => {
  const {isTradeOrder = false, item} = route?.params || {};
  const auth: AuthProps = useSelector(state => state?.auth);
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const {userData} = auth;

  const isReciever = userData?._id === item?.reciever?._id;
  const isSeller = userData?._id === item?.sellerId?._id;

  const [isShipInsModalVisible, setShipInsModalVisible] = useState(
    isReciever && item?.recieverFirstTimeOpen || !isReciever && item?.senderFirstTimeOpen
  );

  const base64Img = isReciever
    ? item?.recieverUPSShipmentData?.toWarehouseLabel
    : item?.senderUPSShipmentData?.toWarehouseLabel;

  useEffect(() => {
    if (isTradeOrder) {
      dispatch(
        setOrderNotifAsReadRequest({
          userId: userData?._id,
          orderId: item?._id,
        }),
      );
    } else {
      dispatch(
        setPaypalNotifAsReadRequest({
          userId: userData?._id,
          paypalOrderId: item?._id,
        }),
      );
    }

  }, [dispatch, isTradeOrder, item?._id, userData?._id]);

  const shippingStepOptions = () => {
    if (isTradeOrder) {
      return isReciever ? item?.senderStep : item?.recieverStep;
    } else {
      return item?.shippingStep;
    }
  };

  const handleShippingInsPress = () => {
    console.log('YOOO');
    setShipInsModalVisible(false);
    dispatch(
      setFirstTimeOpenFalseRequest({userId: userData?._id, orderId: item?._id}),
    );
  };

  const renderShippingInstructionModal = () => {
    return (
      <LSModal isVisible={isShipInsModalVisible}>
        <LSModal.Container>
          <ShippingInstructionModalComponent
            onButtonPress={() => handleShippingInsPress()}
            isTradeOrder={true}
          />
        </LSModal.Container>
      </LSModal>
    );
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
        typeof item?.toSenderTrackingData?.trackingNumber === 'undefined'
      ) {
        return senderUPSShipmentData?.toWarehouse?.ShipmentResponse
          .ShipmentResults.PackageResults.TrackingNumber;
      } else {
        return item?.toSenderTrackingData?.trackingNumber;
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
        typeof item?.toRecieverTrackingData?.trackingNumber === 'undefined'
      ) {
        return recieverUPSShipmentData?.toWarehouse?.ShipmentResponse
          ?.ShipmentResults?.PackageResults?.TrackingNumber;
      } else {
        return item?.toRecieverTrackingData?.trackingNumber;
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
    if (!isTradeOrder && item?.shippingStep == 3) {
      return (
        <RateUserButton
          isTradeOrder={isTradeOrder}
          isReciever={isReciever}
          isSeller={isSeller}
          order={item}
          navigation={navigation}
        />
      );
    }

    if (isTradeOrder && item?.recieverStep == 5 && item?.senderStep === 5) {
      return (
        <RateUserButton
          isTradeOrder={isTradeOrder}
          isReciever={isReciever}
          isSeller={isSeller}
          order={item}
          navigation={navigation}
        />
      );
    }

    if (!isTradeOrder && item?.shippingStep > 0) {
      return printLabelButton();
    }
    if (
      item.recieverPaymentStatus === 'paid' &&
      item.senderPaymentStatus === 'paid'
    ) {
      return printLabelButton();
    }

    return <></>;
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
    if (item?.tradeId) {
      return <TradeOfferCell offerItem={item.tradeId} />;
    } else {
      return (
        <PublicOfferCell
          receivingStockxProducts={item?.publicOfferId?.receivingStockxProducts}
          sendingProductIds={item?.publicOfferId?.sendingProductIds}
          receivingMoneyOffer={item?.publicOfferId?.receivingMoneyOffer}
          sendingMoneyOffer={item?.publicOfferId?.sendingMoneyOffer}
       />
      );
    }
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
      {renderShippingInstructionModal()}
      <InStackHeader
        title={'Track Order'}
        right={false}
        printLabel={true}
        printLabelButton={printLabelRenderOptions}
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
