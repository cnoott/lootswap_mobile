/***
  LOOTSWAP - OFFERS MESSAGE HEADER COMPONENT
 ***/
import React, {FC, useState} from 'react';
import {SvgXml} from 'react-native-svg';
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
    const isAccepted = tradeStatus === Trade_Status?.Accepted;
    const isCanceled = tradeStatus === Trade_Status?.Canceled;
    const isPending = !isAccepted && !isCanceled;
    const isReciever = userData?._id === offerItem?.reciever?._id;
    const paidByBothUsers =
      isReciever || offerItem?.orderId?.senderPaymentStatus === 'paid';

    const isMoneyOffer = offerItem?.senderMoneyOffer > 0 && offerItem?.senderItems.length === 0;

    const renderOfferCellView = () => {
      return (
        <TradeOfferCell offerItem={offerItem} topMargin={5} isInTrade={true} />
      );
    };

    const RenderTradeOfferEditedView = () => {
      const name =
        offerItem?.reciever?._id === userData?._id
          ? offerItem?.reciever?.name
          : offerItem?.sender?.name;

      return (
        <OfferEditedStatusContainer>
          <OfferEditedStatusTitleText>
            {name} has edited their trade offer
          </OfferEditedStatusTitleText>
        </OfferEditedStatusContainer>
      );
    };

    const viewOrderTextOptions = () => {
      if (isMoneyOffer) {
        if (offerItem?.paypalOrderId) {
          return 'View Order';
        }
        if (isReciever && !offerItem?.paypalOrderId) {
          return 'Waiting for checkout';
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
        if (isReciever || offerItem?.paypalOrderId) {
          navigation.navigate('Profile', {
            screen: 'TrackOrderScreen',
            params: {
              isTradeOrder: false,
              item: offerItem?.paypalOrderId,
            },
          });
        } else {
          //checkout
          navigation.navigate('Home', {
            screen: 'CheckoutScreen',
            params: {
              productData: offerItem.recieverItem,
              isMoneyOffer: true,
              tradeData: offerItem,
            },
          });
          //if paid navigate to track order screen
        }
        return;
      }
      offerItem.orderId.tradeId = offerItem;
      let orderData = offerItem.orderId;
      orderData.tradeId = offerItem;
      orderData.reciever = offerItem.reciever;
      orderData.sender = offerItem.sender;

      if (paidByBothUsers) {
        navigation.navigate('Profile', {
          screen: 'TrackOrderScreen',
          params: {
            isTradeOrder: true,
            item: orderData,
          },
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
            <LSButton
              title={viewOrderTextOptions()}
              size={Size.Extra_Small}
              type={Type.Custom}
              radius={20}
              onPress={() => viewOrderPressOptions()}
              buttonCustomColor={'#FF981F'}
            />
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
            <LSProfileImageComponent
              profileUrl={profilePicture}
              imageHeight={34}
              imageWidth={34}
              imageRadius={17}
            />
            <OfferChatHeaderText>{title}</OfferChatHeaderText>
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
      </ChatOfferContainer>
    );
  },
);
