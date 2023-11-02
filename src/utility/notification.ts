import {getOrder, getPaypalOrder, getMessagesHistory} from '../redux/modules';

export const countNotifs = (
  notifications: Array<any>,
  notifTypes: Array<string>,
) => {
  if (!notifications) 
    return 0;
  const count = notifications.filter(
    notif => notifTypes.includes(notif.notifType) && !notif.isRead,
  );

  return count.length;
};

export const handleNavigation = (
  navigation: any,
  message: any,
  dispatch: any,
  userData: any,
) => {
  switch (message.data.notifType) {
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
  }
};
