/* eslint-disable react-hooks/exhaustive-deps */
/***
  LootSwap - USER CHAT SCREEN
 ***/

import React, {FC, useState, useEffect, useRef} from 'react';
import {useTheme} from 'styled-components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {InUserChatHeader} from '../../components/commonComponents/headers/userChatHeader';
import LSInput from '../../components/commonComponents/LSInput';
import {
  Container,
  SubContainer,
  KeyboardAvoidingView,
  InputContainer,
  Touchable,
  InputRightButtonView,
  InputView,
  InteractButtonsContainer,
} from './styles';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {moderateScale} from 'react-native-size-matters';
import MessageCell from '../../components/message/messageCell';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {MessageProps} from '../../redux/modules/message/reducer';
import {
  getMessagesHistory,
  sendMessage,
  receiveMessage,
  joinOrLeaveChannel,
  clearMessageNotif,
} from '../../redux/modules/message/actions';
import {
  setNotifAsRead,
  preselectChosenItem,
  getUsersDetailsRequest,
  getAllMyMessages,
  getTradesHistory,
} from '../../redux/modules';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppState, FlatList} from 'react-native';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
import MessageOptionsModal from '../../components/message/MessageOptionsModal';
import {handleSendOfferNavigation} from '../../utility/utility';
import {Size, Type} from 'custom_enums';
import LSButton from '../../components/commonComponents/LSButton';

export const UserChatScreen: FC<any> = ({route}) => {
  const {messageId} = route?.params;
  const navigation: NavigationProp<any, any> = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const messageData: MessageProps = useSelector(state => state.message);
  const {userData, requestedUserDetails} = auth;

  const insets = useSafeAreaInsets();
  const messageListref = useRef<FlatList>(null);
  const [messageText, setMessageText] = useState('');
  const {historyMessages} = messageData;
  const isReceiver = historyMessages?.receiver?._id === userData?._id;
  const appState = useRef(AppState.currentState);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const initPusher = async () => {
      const pusher = await Pusher.getInstance();
      await pusher.subscribe({
        channelName: messageId,
        onEvent: (event: PusherEvent) => {
          console.log('event', event);
          const newMessage = JSON.parse(event.data);
          dispatch(receiveMessage(newMessage));
        },
      });
    };

    initPusher();

    return async () => {
      console.log('unsuscribing');
      const pusher = await Pusher.getInstance();
      pusher.unsubscribe(messageId);
    };
  },[]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('back from bg');
        const showLoad = false;
        dispatch(
          getMessagesHistory(
            {
              userId: userData?._id,
              messageId: messageId,
            },
            showLoad,
          ),
        );
        dispatch(
          joinOrLeaveChannel({
            userId: userData?._id,
            join: true,
            channel: messageId,
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
            channel: messageId,
          }),
        );
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    dispatch(
      getMessagesHistory({
        userId: userData?._id,
        messageId: messageId,
      }),
    );

    dispatch(
      joinOrLeaveChannel({
        userId: userData?._id,
        join: true,
        channel: messageId,
      }),
    );

    return () => {
      dispatch(
        joinOrLeaveChannel({
          userId: userData?._id,
          join: false,
          channel: messageId,
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (historyMessages?._id) {
      dispatch(
        clearMessageNotif({
          userId: userData?._id,
          msgData: historyMessages,
        }),
      );
      dispatch(setNotifAsRead({objectId: messageId}));

      if (historyMessages?.isTransformedToTrade) {
        dispatch(getAllMyMessages(userData?._id));
        dispatch(
          getTradesHistory({
            userId: userData?._id,
          }),
        );
        navigation.replace('OffersMessageScreen', {
          item: {_id: historyMessages?.tradeId}
        });
      }

      // Fetches the product owners details
      // for send offer/buy now
      const otherUserId = isReceiver
        ? historyMessages.sender._id
        : historyMessages.receiver._id;
      dispatch(getUsersDetailsRequest(otherUserId));
    }
  }, [historyMessages]);

  const handleSendMessage = () => {
    if (messageText === '') {
      return;
    }
    const messageObj = {
      message: messageText,
      userName: userData?.name,
      userId: userData?._id,
      messageId,
      isReceiver,
    };
    try {
      dispatch(sendMessage(messageObj));
      setMessageText('');
    } catch (error) {
      console.log('Error ===', error);
    }
  };

  const renderRightInputView = () => {
    return (
      <Touchable onPress={handleSendMessage}>
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
          placeholder={'Message..'}
          homeSearch={true}
          multiline
        />
      </InputView>
    );
  };
  const renderMessage = (messageInfo: any, isSelf = false) => {
    return <MessageCell self={isSelf} item={messageInfo?.message} />;
  };
  const renderMessagesListView = () => {
    return (
      <FlatList
        ref={it => messageListref.current = it}
        data={historyMessages.messages}
        initialScrollIndex={
          historyMessages.messages ? historyMessages.messages.length - 1 : 0
        }
        keyExtractor={(item, index) => item?.message + index}
        renderItem={({item}) =>
          renderMessage(item, item?.userId === userData?._id)
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
    );
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleSendOfferPress = () => {
    setModalVisible(false);
    dispatch(preselectChosenItem(historyMessages?.product?._id));

    handleSendOfferNavigation(
      navigation,
      historyMessages?.product?.type,
      userData,
      requestedUserDetails,
      true,
    );
  };

  const handleViewItemPress = () => {
    setModalVisible(false);
    navigation.navigate('ProductDetailsChatScreen', {
      productData: historyMessages?.product,
      likedParam: false,
    });
  };

  const renderButtons = () => {
    if (historyMessages?.product?.userId === userData?._id) {
      return <></>;
    }

    if (!historyMessages?.product?.isVisible) {
      return (
        <LSButton
          title={'Item No Longer Available'}
          size={Size.Full}
          type={Type.View}
          radius={20}
          onPress={() => {}}
        />
      );
    }
    if (historyMessages?.product?.type === 'trade-only') {
      return (
        <LSButton
          title={'Send Offer'}
          size={Size.Full}
          type={Type.Primary}
          radius={10}
          onPress={handleSendOfferPress}
        />
      );
    }
    return (
      <InteractButtonsContainer>
        <LSButton
          title={'Send Offer'}
          size={Size.Custom}
          type={Type.Primary}
          radius={10}
          onPress={handleSendOfferPress}
          customWidth={'47%'}
        />
        <LSButton
          title={'Buy Now'}
          size={Size.Custom}
          type={Type.Secondary}
          radius={10}
          onPress={handleSendOfferPress}
          customWidth={'47%'}
        />
      </InteractButtonsContainer>
    );
  };

  return (
    <Container>
      <InUserChatHeader
        title={
          isReceiver
            ? historyMessages?.sender?.name
            : historyMessages?.receiver?.name
        }
        onRightDotsPress={handleOpenModal}
        productData={historyMessages?.product}
        otherUserData={
          isReceiver ? historyMessages?.sender : historyMessages?.receiver
        }
      />
      <KeyboardAvoidingView>
        <SubContainer>{renderMessagesListView()}</SubContainer>
        {renderButtons()}
        <InputContainer bottomSpace={6}>
          {renderLeftInputView()}
          {renderRightInputView()}
        </InputContainer>
      </KeyboardAvoidingView>
      <MessageOptionsModal
        isModalVisible={modalVisible}
        productDetails={historyMessages?.product}
        onSendOfferPress={handleSendOfferPress}
        onViewItemPress={handleViewItemPress}
        onCloseModal={() => setModalVisible(false)}
        productDetails={historyMessages?.product}
      />
    </Container>
  );
};

export default UserChatScreen;
