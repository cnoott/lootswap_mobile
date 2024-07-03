/***
  LOOTSWAP - OFFERS MESSAGE HEADER COMPONENT
 ***/
import React, {FC, useState, useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import {Alert} from 'custom_top_alert';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  ProfileHeaderContainer,
  ProfileLeftTouchable,
  EmptyRowView,
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
  ACCORDIAN_DOWN_ELLIPSE,
  OFFER_ACCEPTED_HEADER_ICON,
  OFFER_REJECTED_HEADER_ICON,
  ACCORDIAN_UP_ELLIPSE,
  PROFILE_TRIPPLE_DOT_ICON,
} from 'localsvgimages';
import LSButton from '../LSButton';
import {Size, Type} from '../../../enums';
import TradeOfferCell from '../../../screens/offers/offerItems/TradeOfferCell';
//import OfferForSellOnlyCell from '../../../screens/offers/offerItems/OfferForSellOnlyCell';
import {Trade_Status} from 'custom_enums';
import Collapsible from 'react-native-collapsible';
import {LSModal} from '../LSModal';
import ShippingInstructionModalComponent from '../../orders/shippingInstructionModalComponent';
import {ProfileHeaderComponent} from './profileHeaderComponent';
import Rate from 'react-native-rate';
import {updateUser} from '../../../redux/modules/';
import {useDispatch} from 'react-redux';

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
  drawerOpen: Boolean;
  setDrawerOpen: Function;
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
    drawerOpen,
    setDrawerOpen,
  }) => {
    const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
    const [isShipInsModalVisible, setShipInsModalVisible] = useState(false);
    const isAccepted = tradeStatus === Trade_Status?.Accepted;
    const isCanceled = tradeStatus === Trade_Status?.Canceled;
    const isDeclined = tradeStatus === Trade_Status?.Declined;
    const isPending = !isAccepted && !isCanceled && !isDeclined;
    const isReceiver = userData?._id === offerItem?.receiver?._id;
    const paidByBothUsers =
      isReceiver || offerItem?.orderId?.senderPaymentStatus === 'paid';

    const isMoneyOffer =
      offerItem?.senderMoneyOffer > 0 && offerItem?.senderItems.length === 0;

    const dispatch = useDispatch();
    useEffect(() => {
      const receiverRate = !isMoneyOffer && isReceiver && offerItem?.orderId.senderStep === 5;
      const senderRate = !isMoneyOffer && !isReceiver && offerItem?.receiverStep === 5;
      const purchaseRate = isMoneyOffer && offerItem?.paypalOrderId?.shippingStep === 3;
      if ((receiverRate || senderRate || purchaseRate) && !userData?.hasGivenAppStoreRating) {
        const rateOptions = {
          AppleAppId: '6445904189',
          preferInApp: true,
          inAppDelay: 3.5,
          openAppStoreIfInAppFails: true,
        };
        Rate.rate(rateOptions, (success, errorMessage) => {
          if (success) {
            dispatch(
              updateUser({
                userId: userData?._id,
                userData: {hasGivenAppStoreRating: true},
                noLoad: true,
              }),
            );
          }
          if (errorMessage) {
            console.log('ERR giving review', errorMessage);
          }
        });

      }
    }, []);

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
      if (isReceiver) {
        name = offerItem?.receiverHasEdited
          ? 'You have'
          : offerItem?.sender?.name;
      } else {
        name = offerItem?.senderHasEdited
          ? 'You have'
          : offerItem?.receiver?.name;
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
        if (!isReceiver && !offerItem?.paypalOrderId) {
          return 'Checkout';
        } else if (isReceiver && offerItem?.paypalOrderId?.shippingStep < 1) {
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
        if (isReceiver && !offerItem?.paypalOrderId) {
          Alert.showError(
            `${offerItem?.sender?.name} must checkout in order to view order. Check back soon`,
          );
          return;
        } else if (isReceiver && offerItem?.paypalOrderId?.shippingStep < 1) {
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
            productData: offerItem.receiverItems[0],
            isMoneyOffer: true,
            tradeData: offerItem,
          });
        }
        return;
      }

      offerItem.orderId.tradeId = offerItem;
      let orderData = offerItem.orderId;
      orderData.tradeId = offerItem;
      orderData.receiver = offerItem.receiver;
      orderData.sender = offerItem.sender;

      if (paidByBothUsers) {
        console.log('TRACK ORDER');
        navigation.navigate('TrackOrderScreen', {
          isTradeOrder: true,
          item: orderData,
        });
      } else {
        console.log('track checkout');
        //Checkout trade order
        navigation?.navigate('AcceptTradeCheckoutScreen', {
          trade: offerItem,
        });
      }
    };

    const RenderOfferStatusAccrordianView = () => {
      const otherUsername = isReceiver
        ? offerItem?.sender?.name
        : offerItem?.receiver?.name;

      let headerText = '';

      if (isCanceled) {
        headerText = 'The trade has been canceled!';
      } else if (isDeclined) {
        headerText = isReceiver
          ? 'You have declined the trade!'
          : `${otherUsername} has declined the trade!`;
      } else if (isAccepted) {
        headerText = isReceiver
          ? `You have accepted the offer!`
          : `${otherUsername} has accepted your offer!`;
      }

      return (
        <OfferStatusContainer isAccepted={isAccepted}>
          <OfferStatusLeftView>
            <OfferStatusTitleText>{headerText}</OfferStatusTitleText>
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
            {!isCanceled && !isDeclined && (
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
        (isReceiver && offerItem?.senderHasEdited) ||
        (!isReceiver && offerItem?.receiverHasEdited);

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
          <Collapsible collapsed={!drawerOpen} renderChildrenCollapsed={true}>
            {renderOfferCellView()}
          </Collapsible>
          <ArrowContainer onPress={() => setDrawerOpen(!drawerOpen)}>
            <SvgXml
              xml={drawerOpen ? ACCORDIAN_DOWN_ELLIPSE : ACCORDIAN_UP_ELLIPSE}
            />
          </ArrowContainer>
        </EmptyColumnView>
      );
    };

    return (
      <ChatOfferContainer>
        <ProfileHeaderContainer>
          <EmptyRowView>
            <ProfileHeaderComponent
              otherUserName={title}
              otherUserData={
                isReceiver ? offerItem?.sender : offerItem?.receiver
              }
              otherUserPfp={profilePicture}
            />
          </EmptyRowView>
          {isPending && (
            <EmptyRowView>
              {userData?._id === offerItem?.receiver._id && (
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
