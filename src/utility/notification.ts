export const handleNavigation = (navigation: any, message: any) => {
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
  }
};
