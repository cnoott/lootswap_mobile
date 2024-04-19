/* eslint-disable react-hooks/exhaustive-deps */
/***
LOOTSWAP - OFFERS MESSAGE SCREEN
***/

import React, {FC, useEffect, useState, useRef} from 'react';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {useTheme} from 'styled-components';
import {moderateScale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LSOfferChatHeader} from '../../components/commonComponents/headers/offerChatHeader';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  acceptMoneyOfferTrade,
  cancelTrade,
  getTrade,
  getTradeStockx,
  sendTradeMessage,
  joinOrLeaveChannel,
  receiveTradeMessage,
  clearTradeNotif,
} from '../../redux/modules';
import LSInput from '../../components/commonComponents/LSInput';
import MessageCell from '../../components/message/messageCell';
import EditTradeModal from './offerItems/EditTradeModal';
import AcceptDeclineModal from './offerItems/AcceptDeclineModal';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Alert} from 'custom_top_alert';
import {
  OfferMessageContainer,
  ChatContainer,
  KeyboardAvoidingView,
  InputContainer,
  Touchable,
  InputRightButtonView,
  InputView,
} from './styles';
import {FlatList, AppState} from 'react-native';
import {TradeProps} from '../../redux/modules/offers/reducer';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
import {setNotifAsRead} from '../../redux/modules';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';

export const OffersMessageScreen: FC<{}> = props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const messageListref = useRef<FlatList>(null);
  const tradeId = props.route?.params.item._id;
  const tradeData: TradeProps = useSelector(state => state.offers);
  let offerItem = tradeData?.trade;

  const dispatch = useDispatch();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const isReceiver = offerItem?.receiver?._id === userData?._id;
  const [messageText, setMessageText] = useState('');
  const appState = useRef(AppState.currentState);

  const [isAcceptDeclineModalVisible, setAcceptDeclineModalVisible] =
    useState(false);
  const [isDecline, setDecline] = useState(false);
  const [isEditTradeModalVisible, setEditTradeModalVisible] = useState(false);

  useEffect(() => {
    const initPusher = async () => {
      const pusher = await Pusher.getInstance();
      await pusher.subscribe({
        channelName: tradeId,
        onEvent: (event: PusherEvent) => {
          console.log('event', event);
          const newMessage = JSON.parse(event.data);
          dispatch(receiveTradeMessage(newMessage));
        },
      });
    };

    initPusher();

    return async () => {
      console.log('unsuscribing');
      const pusher = await Pusher.getInstance();
      pusher.unsubscribe(tradeId);
    };
  },[]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('back from bg');
        const showLoad = false;
        // TODO: show load
        dispatch(
          getTrade(
            {
              userId: userData?._id,
              tradeId: tradeId,
            },
            showLoad,
          ),
        );
        dispatch(
          joinOrLeaveChannel({
            userId: userData?._id,
            join: true,
            channel: tradeId,
          }),
        );
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('going to bg');
        dispatch(
          joinOrLeaveChannel({
            userId: userData?._id,
            join: false,
            channel: tradeId,
          }),
        );
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    dispatch(
      getTrade({
        userId: userData?._id,
        tradeId: tradeId,
      }),
    );

    dispatch(
      joinOrLeaveChannel({
        userId: userData?._id,
        join: true,
        channel: tradeId,
      }),
    );

    return () => {
      dispatch(
        joinOrLeaveChannel({
          userId: userData?._id,
          join: false,
          channel: tradeId,
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (tradeData?.trade) {
      messageListref.current?.scrollToEnd({animated: true})
      dispatch(
        clearTradeNotif({
          userId: userData?._id,
          tradeData: tradeData.trade,
        }),
      );
      dispatch(setNotifAsRead({objectId: tradeId}));
    }
  }, [tradeData.trade]);

  const sendMessage = () => {
    if (messageText === '') {
      return;
    }
    const messageObj = {
      message: messageText,
      userName: userData?.name,
      userId: userData?._id,
      tradeId,
      isReceiver,
    };
    dispatch(sendTradeMessage(messageObj));
    setMessageText('');
  };

  const onEditTradePress = async () => {
    closeModal();
    await dispatch(
      getTradeStockx({
        userId: userData?._id,
        tradeId: tradeId,
      }),
    );
    navigation.navigate('EditTradeScreen', {
      trade: offerItem,
      isReceiver: isReceiver,
    });
  };
  const onEditMoneyOfferPress = async () => {
    closeModal();
    navigation.navigate('EditMoneyOfferTradeScreen', {
      trade: offerItem,
      userData: userData,
    });
  };
  const closeModal = () => {
    setDecline(false);
    setEditTradeModalVisible(false);
    setAcceptDeclineModalVisible(false);
  };
  const renderRightInputView = () => {
    return (
      <Touchable onPress={sendMessage}>
        <InputRightButtonView>
          <PaperAirplaneIcon
            size={moderateScale(20)}
            color={theme?.colors?.white}
          />
        </InputRightButtonView>
      </Touchable>
    );
  };
  const renderLeftInputView = () => {
    return (
      <InputView>
        <LSInput
          onChangeText={setMessageText}
          value={messageText}
          placeholder={'Type something...'}
          homeSearch={true}
          inputRadius={20}
          multiline={true}
        />
      </InputView>
    );
  };
  const renderMessage = (isSelf = false, item: any) => {
    return <MessageCell self={isSelf} item={item?.message} />;
  };

  // This code sorta repeats itself in the addressScreen.
  // Too many side effects to generalize
  const handleAcceptTrade = () => {
    const addressNotFilled =
      Object.keys(auth.userData?.shipping_address).length < 4;
    if (addressNotFilled) {
      navigation?.navigate('AddressScreenCheckout', {
        isFromTradeCheckout: true,
      });
      closeModal();
      return;
    }

    setAcceptDeclineModalVisible(false);
    const reqData = {
      tradeId: tradeId,
      userId: userData?._id,
    };

    const moneyOfferOnly =
      offerItem.senderItems.length === 0 && offerItem.senderMoneyOffer > 0;
    if (moneyOfferOnly) {
      dispatch(
        acceptMoneyOfferTrade(
          reqData,
          () => {
            closeModal();
            dispatch(
              getTrade({
                userId: userData?._id,
                tradeId: tradeId,
              }),
            );
          },
          () => {
            Alert.showError('Error accepting trade!');
          },
        ),
      );
    } else {
      navigation?.navigate('AcceptTradeCheckoutScreen', {
        trade: offerItem,
      });
    }
  };
  const handleCancelTrade = () => {
    const reqData = {
      userId: userData?._id,
      tradeId: offerItem?._id,
    };
    dispatch(
      cancelTrade(
        reqData,
        () => {
          dispatch(
            getTrade({
              userId: userData?._id,
              tradeId: tradeId,
            }),
          );
        },
        error => {
          console.log('error:', error);
        },
      ),
    );
    closeModal();
  };
  const renderChatView = () => {
    return (
      <ChatContainer>
        <FlatList
          ref={it => messageListref.current = it}
          data={offerItem ? offerItem.messages : []}
          keyExtractor={(item, index) => item.message + index}
          //extraData={messagesList}
          renderItem={({item}) =>
            renderMessage(item?.userName === userData?.name, item)
          }
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
            data,
          })}
          onContentSizeChange={() =>
            messageListref.current?.scrollToEnd({animated: true})
          }
        />
      </ChatContainer>
    );
  };
  const renderCounterOfferButton = () => {
    if (!isReceiver) {
      return <></>
    }
    return (
      <LSButton
        title={'Send Counter Offer'}
        size={Size.Full}
        type={Type.Primary}
        radius={10}
        onPress={onEditTradePress}
      />
    );
  };
  return (
    <OfferMessageContainer>
      <LSOfferChatHeader
        title={
          offerItem?.receiver?._id === userData?._id
            ? offerItem?.sender?.name
            : offerItem?.receiver?.name
        }
        onAcceptPress={() => setAcceptDeclineModalVisible(true)}
        onDeclinePress={() => {
          setDecline(true);
          setAcceptDeclineModalVisible(true);
        }}
        onTrippleDotPress={() => setEditTradeModalVisible(true)}
        profilePicture={
          offerItem?.receiver?._id === userData?._id
            ? offerItem?.sender?.profile_picture
            : offerItem?.receiver?.profile_picture
        }
        offerItem={offerItem}
        userData={userData}
        tradeStatus={offerItem?.status}
      />
      <KeyboardAvoidingView>
        {renderChatView()}
        {renderCounterOfferButton()}
        <InputContainer bottomSpace={insets.bottom}>
          {renderLeftInputView()}
          {renderRightInputView()}
        </InputContainer>
      </KeyboardAvoidingView>
      <AcceptDeclineModal
        isModalVisible={isAcceptDeclineModalVisible}
        isDecline={isDecline}
        onCloseModal={closeModal}
        onAcceptOfferPress={handleAcceptTrade}
        onDeclineOfferPress={handleCancelTrade}
      />
      <EditTradeModal
        isModalVisible={isEditTradeModalVisible}
        onCloseModal={closeModal}
        onEditTradePress={onEditTradePress}
        onEditMoneyOfferPress={onEditMoneyOfferPress}
        offerItem={offerItem}
        userData={userData}
      />
    </OfferMessageContainer>
  );
};

export default OffersMessageScreen;
