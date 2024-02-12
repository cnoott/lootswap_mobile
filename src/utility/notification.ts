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

const testPublicOfferDataRaw = `{"_id":"65c8d9da4d41532a4403040a","receivingStockxProducts":[{"stockxId":{"_id":"64f0eb1f11ead15212824af4","name":"Jordan 1 Retro High OG Chicago Lost and Found","image":"https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-Reimagined-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1665691099","urlKey":"air-jordan-1-retro-high-og-chicago-reimagined-lost-and-found","sizes":[{"sizeUS":"3.5","lastSale":282,"_id":"65c8d9d34d41532a440303e9"},{"sizeUS":"4","lastSale":249,"_id":"65c8d9d34d41532a440303ea"},{"sizeUS":"4.5","lastSale":299,"_id":"65c8d9d34d41532a440303eb"},{"sizeUS":"5","lastSale":306,"_id":"65c8d9d34d41532a440303ec"},{"sizeUS":"5.5","lastSale":300,"_id":"65c8d9d34d41532a440303ed"},{"sizeUS":"6","lastSale":316,"_id":"65c8d9d34d41532a440303ee"},{"sizeUS":"6.5","lastSale":387,"_id":"65c8d9d34d41532a440303ef"},{"sizeUS":"7","lastSale":335,"_id":"65c8d9d34d41532a440303f0"},{"sizeUS":"7.5","lastSale":325,"_id":"65c8d9d34d41532a440303f1"},{"sizeUS":"8","lastSale":451,"_id":"65c8d9d34d41532a440303f2"},{"sizeUS":"8.5","lastSale":386,"_id":"65c8d9d34d41532a440303f3"},{"sizeUS":"9","lastSale":419,"_id":"65c8d9d34d41532a440303f4"},{"sizeUS":"9.5","lastSale":365,"_id":"65c8d9d34d41532a440303f5"},{"sizeUS":"10","lastSale":390,"_id":"65c8d9d34d41532a440303f6"},{"sizeUS":"10.5","lastSale":420,"_id":"65c8d9d34d41532a440303f7"},{"sizeUS":"11","lastSale":412,"_id":"65c8d9d34d41532a440303f8"},{"sizeUS":"11.5","lastSale":580,"_id":"65c8d9d34d41532a440303f9"},{"sizeUS":"12","lastSale":405,"_id":"65c8d9d34d41532a440303fa"},{"sizeUS":"12.5","lastSale":369,"_id":"65c8d9d34d41532a440303fb"},{"sizeUS":"13","lastSale":385,"_id":"65c8d9d34d41532a440303fc"},{"sizeUS":"14","lastSale":450,"_id":"65c8d9d34d41532a440303fd"},{"sizeUS":"15","lastSale":443,"_id":"65c8d9d34d41532a440303fe"},{"sizeUS":"16","lastSale":601,"_id":"65c8d9d34d41532a440303ff"},{"sizeUS":"17","lastSale":493,"_id":"65c8d9d34d41532a44030400"},{"sizeUS":"18","lastSale":246,"_id":"65c8d9d34d41532a44030401"}],"createdAt":"2023-08-31T19:33:51.153Z","updatedAt":"2024-02-11T14:29:39.925Z","__v":86,"category":""},"chosenSize":"10","_id":"65c8d9da4d41532a4403040b"}],"acceptingProducts":[],"sendingProductIds":[{"_id":"65c799c54dbbadada9c674c9","name":"Sp5der Web Hoodie Purple","description":"New with tags,\nSp5der Web Hoodie Purple,\nSize: L","condition":"New with tags","size":"L","brand":"Sp5der","interestedIn":"","type":"trade-only","userId":"65c789964dbbadada9c66e19","price":0,"category":"hoodies","primary_photo":"https://lootswap-storage.s3-accelerate.dualstack.amazonaws.com/mobile_upload7621","secondary_photos":["https://lootswap-storage.s3-accelerate.dualstack.amazonaws.com/mobile_upload7012","https://lootswap-storage.s3-accelerate.dualstack.amazonaws.com/mobile_upload9277","https://lootswap-storage.s3-accelerate.dualstack.amazonaws.com/mobile_upload3216"],"who_pays":"seller-pays","sellerShippingCost":0,"isVisible":true,"isVirtuallyVerified":true,"deniedState":0,"isInTrade":false,"stockxId":"65c78b384dbbadada9c66fe1","timesLiked":0,"name_fuzzy":["5der","p5de","sp5d","p5der","sp5de","sp5der","web","odie","oodi","hood","oodie","hoodi","hoodie","rple","urpl","purp","urple","purpl","purple","sp5der web hoodie purple"],"brand_fuzzy":["5der","p5de","sp5d","p5der","sp5de","sp5der"],"unixTimeStamp":1707579845431,"createdAt":"2024-02-10T15:44:05.433Z","updatedAt":"2024-02-10T15:45:23.357Z","__v":0}],"receivingMoneyOffer":0,"sendingMoneyOffer":0,"status":"pending","userCompletedCheckout":true,"createdAt":"2024-02-11T14:29:46.320Z","updatedAt":"2024-02-11T14:29:59.546Z","__v":0,"orderId":"65c8d9db4d41532a4403040d"}`;
const testPublicOfferData = testPublicOfferDataRaw.replace(/[\u0000-\u001F]+/g, "");

export const handleNavigation = (
  navigation: any,
  message: any,
  dispatch: any,
  userData: any,
) => {
  var formattedMessage = formatNotificationPayload(message);
  if (!formattedMessage?.data?.body) {
    formattedMessage = message.remoteMessage;
    console.log(formattedMessage.data, 'new!');
  }
  switch (formattedMessage.data.notifType) {
    case 'trade':
      navigation.navigate('OffersMessageScreen', {
        item: {_id: formattedMessage?.data?.objectId},
      });
      break;
    case 'message':
      dispatch(
        getMessagesHistory({
          userId: userData?._id,
          messageId: formattedMessage?.data?.objectId,
        }),
      );
      navigation.navigate('UserChatScreen', {
        messageId: formattedMessage?.data?.objectId,
      });
      break;

    case 'trade-order':
      dispatch(
        getOrder(
          {orderId: formattedMessage?.data?.objectId},
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
          {paypalOrderId: formattedMessage?.data?.objectId},
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
        getProductDetails(formattedMessage?.data?.objectId, product => {
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
          {orderId: formattedMessage?.data?.objectId},
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
    case 'public-offer-notif':
      navigation.navigate('PublicOfferScreen', {
        publicOffer: JSON.parse(testPublicOfferData),
      });
      break;

    case 'shipping_notif':
      navigation.navigate('AddressScreen');
      break;
    default:
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      navigation.navigate('HomeScreen');
  }
};
