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
  SectionList,
} from './styles';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {moderateScale} from 'react-native-size-matters';
import MessageCell from '../../components/message/messageCell';
import useMessagingService from '../../services/useMessagingService';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {MessageProps} from '../../redux/modules/message/reducer';
import {getMessagesHistory} from '../../redux/modules/message/actions';
import {getConfiguredMessageData} from '../../utility/utility';
import {
  NavigationProp,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import {AppState} from 'react-native';

export const UserChatScreen: FC<any> = ({route}) => {
  const {messageId} = route?.params;
  const navigation: NavigationProp<any, any> = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const messageData: MessageProps = useSelector(state => state.message);
  const {userData} = auth;

  const isFocused = useIsFocused();

  const insets = useSafeAreaInsets();
  const messageListref = useRef(null);
  const [messageText, setMessageText] = useState('');
  const [isSocketInitDone, setSocketInitDone] = useState(false);
  const [messagesList, setMessagesList] = useState<any>([]);
  const [messageDoc, setMessageDoc] = useState(null);
  var messagesListRaw: any = useRef([]);
  const {historyMessages} = messageData;
  const isReceiver = historyMessages?.receiver?._id === userData?._id;
  const {socketObj, isConnected}: any = useMessagingService({
    messageId: messageId,
    userId: userData?._id,
    targetId: historyMessages?.product?.userId,
  });
  const appState = useRef(AppState.currentState);

  const scrollListToEnd = () => {
    if (messageListref?.current && messagesListRaw.current?.length > 0) {
      setTimeout(() => {
        messageListref?.current?.scrollToLocation({
          sectionIndex: 0,
          itemIndex: messagesListRaw.current?.length - 1,
        });
      }, 100);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'background' && nextAppState === 'active') {
        console.log('back from bg!');
        dispatch(
          getMessagesHistory({
            userId: userData?._id,
            messageId: messageId,
          }),
        );
        scrollListToEnd();
      } else if (
        appState.current === 'active' &&
        nextAppState === 'background'
      ) {
        console.log('bg!');
        subscription.remove();
        socketObj?.removeAllListeners();
        socketObj?.close();
        socketObj?.disconnect();
      }
      appState.current = nextAppState;
    });
    if (!isFocused) {
      subscription.remove();
      socketObj?.removeAllListeners();
      socketObj?.close();
      socketObj?.disconnect();
    }
    dispatch(
      getMessagesHistory({
        userId: userData?._id,
        messageId: messageId,
      }),
    );

    return () => {
      subscription.remove();
      socketObj?.removeAllListeners();
      socketObj?.close();
      socketObj?.disconnect();
    };
  }, [isFocused]);

  useEffect(() => {
    if (historyMessages && historyMessages?.messages) {
      setMessageDoc(historyMessages);
      messagesListRaw.current = historyMessages?.messages;
      setMessagesList(getConfiguredMessageData(historyMessages?.messages));
    }
  }, [historyMessages]);

  useEffect(() => {
    if (socketObj && isConnected && !isSocketInitDone) {
      initSocket(socketObj);
      setSocketInitDone(true);
    }
  }, [socketObj, isConnected, isSocketInitDone]);

  const initSocket = (_socketObj: any) => {
    // Listner for receiving messages
    _socketObj.on('send message', ({content}) => {
      //{content, from, to}
      const messagesData =
        messagesListRaw?.current?.length > 0
          ? [...messagesListRaw.current, content]
          : [content];
      messagesListRaw.current = messagesData;
      const newData = getConfiguredMessageData(messagesData);
      setMessagesList(newData);
      if (messageListref?.current) {
        setTimeout(() => {
          messageListref?.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: messagesListRaw.current?.length - 1,
          });
        }, 100);
      }
    });
  };

  const sendMessage = () => {
    if (messageText === '') {
      return;
    }
    const messageObj = {
      message: messageText,
      userName: userData?.name,
      userId: userData?._id,
      isReceiver,
    };
    try {
      socketObj.emit('send message', {
        content: messageObj,
        to: messageId,
      });
      setMessageText('');
    } catch (error) {
      console.log('Error ===', error);
    }
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
  const renderListHeader = () => {
    return null; // shelving for now
  };
  // const renderListHeader = (title: string) => {
  //   return (
  //     <ListHeaderContainer>
  //       <ListHeaderText>{title}</ListHeaderText>
  //     </ListHeaderContainer>
  //   );
  // };
  const renderMessagesListView = () => {
    return (
      <SectionList
        ref={messageListref}
        sections={messagesList}
        keyExtractor={(item, index) => item?.message + index}
        renderItem={({item}) =>
          renderMessage(item, item?.userId === userData?._id)
        }
        // renderSectionHeader={({section: {title}}) => renderListHeader(title)}
        renderSectionHeader={() => renderListHeader()}
        initialScrollIndex={messagesListRaw?.current?.length - 1}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
          data,
        })}
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