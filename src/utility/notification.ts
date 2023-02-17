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
          item: JSON.parse(message.data.notifData),
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
          ...message.data.notifData,
        },
      });
    //TODO default case
  }
};
