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
} from '../../redux/modules/message/actions';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppState, FlatList} from 'react-native';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';

export const UserChatScreen: FC<any> = ({route}) => {
  const {messageId} = route?.params;
  const navigation: NavigationProp<any, any> = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const messageData: MessageProps = useSelector(state => state.message);
  const {userData} = auth;

  const insets = useSafeAreaInsets();
  const messageListref = useRef<FlatList>(null);
  const [messageText, setMessageText] = useState('');
  const {historyMessages} = messageData;
  const isReceiver = historyMessages?.receiver?._id === userData?._id;
  const appState = useRef(AppState.currentState);

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
  return (
    <Container>
      <InUserChatHeader
        title={
          isReceiver
            ? historyMessages?.sender?.name
            : historyMessages?.receiver?.name
        }
        onItemPress={() => {
          navigation.navigate('ProductDetailsChatScreen', {
            productData: {
              ...historyMessages?.product,
              objectID: historyMessages?.product?._id,
            },
          });
        }}
        productData={historyMessages?.product}
        otherUserData={
          isReceiver ? historyMessages?.sender : historyMessages?.receiver
        }
      />
      <KeyboardAvoidingView>
        <SubContainer>{renderMessagesListView()}</SubContainer>
        <InputContainer bottomSpace={insets.bottom - 10}>
          {renderLeftInputView()}
          {renderRightInputView()}
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default UserChatScreen;
