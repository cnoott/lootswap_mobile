import {getOrder} from '../redux/modules';

export const handleNavigation = (
  navigation: any,
  message: any,
  dispatch: any,
) => {
  switch (message.data.notifType) {
    case 'trade':
      navigation.reset({
        index: 0,
        routes: [{name: 'Offers/Inbox'}],
      });
      navigation.navigate('Offers/Inbox', {
        screen: 'OffersMessageScreen',
        params: {
          item: {_id: message?.data?.objectId},
        },
      });
      break;
    case 'message':
      navigation.reset({
        index: 0,
        routes: [{name: 'Offers/Inbox'}],
      });
      navigation.navigate('Offers/Inbox', {
        screen: 'UserChatScreen',
        params: {
          messageId: message?.data?.objectId,
        },
      });
      break;

    case 'trade-order':
      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
      dispatch(
        getOrder(
          {orderId: message?.data?.objectId},
          res => {
            navigation.navigate('Profile', {
              screen: 'TrackOrderScreen',
              params: {
                isTradeOrder: true,
                item: res,
              },
            });
          },
          error => {
            console.log(error);
          },
        ),
      );
    //TODO: rate notif type
    //TODO: paypal-order notif type
  }
};
