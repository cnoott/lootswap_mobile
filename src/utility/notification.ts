import {
  getOrder,
  getPaypalOrder,
  getMessagesHistory,
  getProductDetails,
} from '../redux/modules';

export const countNotifs = (
  notifications: Array<any>,
  notifTypes: Array<string>,
) => {
  if (!notifications) {
    return 0;
  }
  let count;
  if (notifTypes[0] === 'All') {
    count = notifications.filter(notif => !notif.isRead);
  } else {
    count = notifications.filter(
      notif => notifTypes.includes(notif.notifType) && !notif.isRead,
    );
  }

  return count.length;
};

function formatNotificationPayload(originalPayload: any) {
  return {
    data: {
      body: originalPayload?.data?.body ?? originalPayload?.aps?.alert?.body,
      dateAdded: originalPayload?.data?.dateAdded,
      isRead: originalPayload?.data?.isRead,
      notifType: originalPayload?.data?.notifType ?? originalPayload?.notifType,
      objectId: originalPayload?.data?.objectId ?? originalPayload?.objectId,
      title: originalPayload?.data?.title ?? originalPayload?.aps?.alert?.title,
    },
    from: originalPayload?.['google.c.sender.id'],
    messageId: originalPayload?.['gcm.message_id'],
    notification: {
      body: originalPayload?.data?.body ?? originalPayload?.aps?.alert?.body,
      title: originalPayload?.data?.title ?? originalPayload?.aps?.alert?.title,
    },
  };
}


export const handleNavigation = (
  navigation: any,
  message: any,
  dispatch: any,
  userData: any,
) => {
  const fomrattedMessage = formatNotificationPayload(message);
  console.log('FROM HANDLE NAVIGATION', JSON.stringify(fomrattedMessage));
  switch (fomrattedMessage.data.notifType) {
    case 'trade':
      navigation.navigate('OffersMessageScreen', {
        item: {_id: message?.data?.objectId},
      });
      break;
    case 'message':
      dispatch(
        getMessagesHistory({
          userId: userData?._id,
          messageId: message?.data?.objectId,
        }),
      );
      navigation.navigate('UserChatScreen', {
        messageId: message?.data?.objectId,
      });
      break;

    case 'trade-order':
      dispatch(
        getOrder(
          {orderId: message?.data?.objectId},
          res => {
            navigation.navigate('TrackOrderScreen', {
              isTradeOrder: true,
              item: res,
            });
          },
          error => {
            console.log(error);
          },
        ),
      );
      break;

    case 'new-paypal-order':
      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
      navigation.navigate('Profile', {
        screen: 'MyOrdersListScreen',
        params: {
          initialState: 1,
        },
      });
      break;
    case 'paypal-order':
      dispatch(
        getPaypalOrder(
          {paypalOrderId: message?.data?.objectId},
          res => {
            navigation.navigate('TrackOrderScreen', {
              isTradeOrder: false,
              item: res,
            });
          },
          error => {
            console.log(error);
          },
        ),
      );
      break;
    case 'product':
      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
      navigation.navigate('Profile', {
        screen: 'MyLootScreen',
      });
      break;
    case 'product-promo':
      dispatch(
        getProductDetails(message?.data?.objectId, product => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          navigation.navigate('ProductDetailsScreen', {
            productData: product,
            likedParam: false,
          });
        }),
      );
      break;
    case 'wallet':
      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
      navigation.navigate('Profile', {
        screen: 'WalletScreen',
      });
      break;
    case 'rate-trade':
      dispatch(
        getOrder(
          {orderId: message?.data?.objectId},
          res => {
            navigation.navigate('SubmitReviewScreen', {
              orderDetails: res,
              isTradeOrder: true,
            });
          },
          error => {
            console.log(error);
          },
        ),
      );
      break;
    case 'public-offer':
      navigation.reset({
        index: 0,
        routes: [{name: 'Inbox'}],
      });
      navigation.navigate('OffersScreen');
      break;
    default:
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      navigation.navigate('HomeScreen');
  }
};
