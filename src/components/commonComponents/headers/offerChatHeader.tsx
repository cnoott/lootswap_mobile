/***
  LOOTSWAP - OFFERS MESSAGE HEADER COMPONENT
 ***/
import React, {FC, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {Alert} from 'custom_top_alert';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  OfferChatHeaderText,
  ProfileHeaderContainer,
  ProfileLeftTouchable,
  EmptyRowView,
  TouchableOpacity,
  SpaceRowView,
  ChatOfferContainer,
  OfferStatusContainer,
  OfferStatusTitleText,
  OfferStatusLeftView,
  OfferStatusRightView,
  OfferStatusText,
  ArrowContainer,
  EmptyColumnView,
  OfferEditedStatusContainer,
  OfferEditedStatusTitleText,
} from './styles';
import {
  LEFT_BLACK_ARROW,
  ACCORDIAN_DOWN_ELLIPSE,
  OFFER_ACCEPTED_HEADER_ICON,
  OFFER_REJECTED_HEADER_ICON,
  ACCORDIAN_UP_ELLIPSE,
} from 'localsvgimages';
import {PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import LSButton from '../LSButton';
import {Size, Type} from '../../../enums';
import {LSProfileImageComponent} from '../profileImage';
import TradeOfferCell from '../../../screens/offers/offerItems/TradeOfferCell';
//import OfferForSellOnlyCell from '../../../screens/offers/offerItems/OfferForSellOnlyCell';
import {Trade_Status} from 'custom_enums';
import Collapsible from 'react-native-collapsible';
import {LSModal} from '../LSModal';
import ShippingInstructionModalComponent from '../../orders/shippingInstructionModalComponent';

interface HeaderProps {
  profilePicture: string;
  title: string;
  onAcceptPress: Function;
  onDeclinePress: Function;
  onTrippleDotPress: Function;
  offerItem: any;
  userData: any;
  profileUrl?: string;
  tradeStatus: string;
}

export const LSOfferChatHeader: FC<HeaderProps> = React.memo(
  ({
    title,
    onAcceptPress,
    onDeclinePress,
    onTrippleDotPress,
    profilePicture,
    offerItem,
    userData,
    tradeStatus,
  }) => {
    const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
    const [accOpen, setAccOpen] = useState(false);
    const [isShipInsModalVisible, setShipInsModalVisible] = useState(false);
    const isAccepted = tradeStatus === Trade_Status?.Accepted;
    const isCanceled = tradeStatus === Trade_Status?.Canceled;
    const isPending = !isAccepted && !isCanceled;
    const isReciever = userData?._id === offerItem?.reciever?._id;
    const paidByBothUsers =
      isReciever || offerItem?.orderId?.senderPaymentStatus === 'paid';

    const isMoneyOffer =
      offerItem?.senderMoneyOffer > 0 && offerItem?.senderItems.length === 0;

    const renderOfferCellView = () => {
      return (
        <TradeOfferCell offerItem={offerItem} topMargin={5} isInTrade={true} />
      );
    };

    const RenderTradeOfferEditedView = () => {
      let name;
      let changeMade = offerItem?.isCounterOffer
        ? 'has sent a counter offer. '
        : 'has changed the trade offer.';
      if (isReciever) {
        name = offerItem?.recieverHasEdited
          ? 'You have'
          : offerItem?.reciever?.name;
      } else {
        name = offerItem?.senderHasEdited
          ? 'You have'
          : offerItem?.reciever?.name;
      }

      return (
        <OfferEditedStatusContainer>
          <OfferEditedStatusTitleText>
            {name} {changeMade}
          </OfferEditedStatusTitleText>
        </OfferEditedStatusContainer>
      );
    };

    const renderShippingInstructionModal = () => {
      //remove
      return (
        <LSModal isVisible={isShipInsModalVisible}>
          <LSModal.Container>
            <ShippingInstructionModalComponent
              onButtonPress={() => goToShippingLabelScreen()}
            />
            <LSModal.CloseButton
              onCloseButtonPress={() => setShipInsModalVisible(false)}
            />
          </LSModal.Container>
        </LSModal>
      );
    };

    const goToShippingLabelScreen = () => {
      setShipInsModalVisible(false);
      navigation?.navigate('Profile', {
        screen: 'ShippingLabelScreen',
        params: {
          productId: offerItem?.paypalOrderId?.productId?._id,
          paypalOrderId: offerItem?.paypalOrderId?._id,
        },
      });
    };

    const viewOrderTextOptions = () => {
      if (isMoneyOffer) {
        if (!isReciever && !offerItem?.paypalOrderId) {
          return 'Checkout';
        } else if (isReciever && offerItem?.paypalOrderId?.shippingStep < 1) {
          return 'Ship Item';
        } else {
          return 'View Order';
        }
      } else {
        if (paidByBothUsers) {
          return 'View Order';
        } else {
          return 'Checkout';
        }
      }
    };

    const viewOrderPressOptions = () => {
      const moneyOfferOnly =
        offerItem.senderItems.length === 0 && offerItem.senderMoneyOffer > 0;
      if (moneyOfferOnly) {
        if (isReciever && !offerItem?.paypalOrderId) {
          Alert.showError(
            `${offerItem?.sender?.name} must checkout in order to view order. Check back soon`,
          );
          return;
        } else if (isReciever && offerItem?.paypalOrderId?.shippingStep < 1) {
          setShipInsModalVisible(true);
          return;
        }

        if (offerItem?.paypalOrderId) {
          navigation.navigate('TrackOrderScreen', {
            isTradeOrder: false,
            item: offerItem?.paypalOrderId,
          });
        } else {
          //checkout
          navigation.navigate('MoneyOfferCheckoutScreen', {
            productData: offerItem.recieverItem,
            isMoneyOffer: true,
            tradeData: offerItem,
          });
        }
        return;
      }
      offerItem.orderId.tradeId = offerItem;
      let orderData = offerItem.orderId;
      orderData.tradeId = offerItem;
      orderData.reciever = offerItem.reciever;
      orderData.sender = offerItem.sender;

      if (paidByBothUsers) {
        navigation.navigate('TrackOrderScreen', {
          isTradeOrder: true,
          item: orderData,
        });
      } else {
        //Checkout trade order
        navigation?.navigate('TradeCheckoutScreen', {
          tradeData: offerItem,
          orderData: orderData,
        });
      }
    };

    const RenderOfferStatusAccrordianView = () => {
      const name =
        offerItem?.reciever?._id === userData?._id
          ? offerItem?.reciever?.name
          : offerItem?.sender?.name;

      const acceptDeclineText = isReciever
        ? `You have ${isAccepted ? 'accepted' : 'declined'} the offer!`
        : `${name} has ${isAccepted ? 'accepted' : 'declined'} your offer!`;
      return (
        <OfferStatusContainer isAccepted={isAccepted}>
          <OfferStatusLeftView>
            <OfferStatusTitleText>{acceptDeclineText}</OfferStatusTitleText>
            <EmptyRowView>
              <SvgXml
                xml={
                  isAccepted
                    ? OFFER_ACCEPTED_HEADER_ICON
                    : OFFER_REJECTED_HEADER_ICON
                }
              />
              <OfferStatusText isAccepted={isAccepted}>{`${
                isAccepted ? `Trade Accepted!` : 'Trade Declined'
              }`}</OfferStatusText>
            </EmptyRowView>
          </OfferStatusLeftView>
          <OfferStatusRightView>
            {!isCanceled && (
              <LSButton
                title={viewOrderTextOptions()}
                size={Size.Extra_Small}
                type={Type.Custom}
                radius={20}
                onPress={() => viewOrderPressOptions()}
                buttonCustomColor={'#FF981F'}
              />
            )}
          </OfferStatusRightView>
        </OfferStatusContainer>
      );
    };

    const getOfferStatusView = () => {
      const isTradeEdited =
        (isReciever && offerItem?.senderHasEdited) ||
        (!isReciever && offerItem?.recieverHasEdited);

      if (isTradeEdited) {
        return <RenderTradeOfferEditedView />; // TODO -> NEED TO ADD RENDER CONDITION
      } else if (isPending) {
        return <></>;
      } else {
        return <RenderOfferStatusAccrordianView />;
      }
    };

    const renderOfferStatusContainer = () => {
      return (
        <EmptyColumnView>
          {getOfferStatusView()}
          <Collapsible collapsed={accOpen} renderChildrenCollapsed={true}>
            {renderOfferCellView()}
          </Collapsible>
          <ArrowContainer onPress={() => setAccOpen(!accOpen)}>
            <SvgXml
              xml={accOpen ? ACCORDIAN_DOWN_ELLIPSE : ACCORDIAN_UP_ELLIPSE}
            />
          </ArrowContainer>
        </EmptyColumnView>
      );
    };

    return (
      <ChatOfferContainer>
        <ProfileHeaderContainer>
          <EmptyRowView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgXml xml={LEFT_BLACK_ARROW} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PublicProfileScreen', {
                  requestedUserDetails: isReciever
                    ? offerItem.sender
                    : offerItem.reciever,
                })
              }>
              <LSProfileImageComponent
                profileUrl={profilePicture}
                imageHeight={34}
                imageWidth={34}
                imageRadius={17}
              />
              <OfferChatHeaderText>{title}</OfferChatHeaderText>
            </TouchableOpacity>
          </EmptyRowView>
          {isPending && (
            <EmptyRowView>
              {userData?._id === offerItem?.reciever._id && (
                <>
                  <LSButton
                    title={'Accept'}
                    size={Size.Extra_Small}
                    type={Type.Success}
                    radius={20}
                    onPress={() => onAcceptPress()}
                  />
                  <SpaceRowView />
                  <SpaceRowView />
                </>
              )}
              <LSButton
                title={'Decline'}
                size={Size.Extra_Small}
                type={Type.Error}
                radius={20}
                onPress={() => onDeclinePress()}
              />
              <SpaceRowView />
              <SpaceRowView />
              <ProfileLeftTouchable onPress={() => onTrippleDotPress()}>
                <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
              </ProfileLeftTouchable>
            </EmptyRowView>
          )}
        </ProfileHeaderContainer>
        {offerItem && renderOfferStatusContainer()}
        {renderShippingInstructionModal()}
      </ChatOfferContainer>
    );
  },
);
