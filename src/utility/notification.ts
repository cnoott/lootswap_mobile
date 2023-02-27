import {getOrder, getPaypalOrder} from '../redux/modules';

export const handleNavigation = (
  navigation: any,
  message: any,
  dispatch: any,
) => {
  switch (message.data.notifType) {
    case 'trade':
      navigation.navigate('OffersMessageScreen', {
        item: {_id: message?.data?.objectId},
      });
      break;
    case 'message':
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
  }
};
