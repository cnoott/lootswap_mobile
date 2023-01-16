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
  acceptTrade,
  cancelTrade,
  getTrade,
  getTradesHistory,
  getProductListedItemsForOffer,
} from '../../redux/modules';
import TradeOfferCell from './offerItems/TradeOfferCell';
import LSInput from '../../components/commonComponents/LSInput';
import MessageCell from '../../components/message/messageCell';
import EditTradeModal from './offerItems/EditTradeModal';
import AcceptDeclineModal from './offerItems/AcceptDeclineModal';
import ItemAddRemoveModal from './offerItems/ItemAddRemoveModal';
import ChangeOfferModal from './offerItems/ChangeOfferModal';
import useMessagingService from '../../services/useMessagingService';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Alert} from 'custom_top_alert';
import {
  Container,
  ChatContainer,
  KeyboardAvoidingView,
  InputContainer,
  Touchable,
  InputRightButtonView,
  InputView,
} from './styles';
import {FlatList} from 'react-native';
import {TradeProps} from '../../redux/modules/offers/reducer';
export const OffersMessageScreen: FC<{}> = props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const tradeId = props.route?.params.item._id;
  const tradeData: TradeProps = useSelector(state => state.offers);
  const offerItem = tradeData?.trade;
  //const offerItem = props.route?.params?.item;

  const dispatch = useDispatch();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const {socketObj, isConnected}: any = useMessagingService(
    {
      tradeId: offerItem?._id,
      userId: userData?._id,
    },
    true,
  );
  const [messageText, setMessageText] = useState('');

  const [messagesList, setMessagesList] = useState<any>(
    offerItem?.messages || [],
  );
  const [isAcceptDeclineModalVisible, setAcceptDeclineModalVisible] =
    useState(false);
  const [isDecline, setDecline] = useState(false);
  const [isEditTradeModalVisible, setEditTradeModalVisible] = useState(false);
  const [isAddItem, setAddItem] = useState(false);
  const [editTradeItems, setEditTradeItems] = useState([]);
  const [isAddRemoveItemModalVisible, setAddRemoveItemModalVisible] =
    useState(false);
  const [isChangeOfferModalVisible, setChangeOfferModalVisible] =
    useState(false);
  var messagesListRaw: any = useRef(offerItem?.messages || []);

  useEffect(() => {
    dispatch(
      getTrade({
        userId: userData?._id,
        tradeId: tradeId,
      }),
    );
    dispatch(
      getTradesHistory({
        userId: userData?._id,
      }),
    );
  }, [dispatch, userData?._id]);

  useEffect(() => {
    if (socketObj && isConnected) {
      initSocket(socketObj);
    }
  }, [socketObj, isConnected]);

  useEffect(() => {
    return () => {
      socketObj?.off('connect');
      socketObj?.emit('disconnect');
      socketObj?.off('private message');
      socketObj?.disconnect();
      socketObj?.removeAllListeners();
      socketObj?.close();
    };
  }, []);

  const initSocket = (_socketObj: any) => {
    _socketObj.on('private message', ({content, from}: any) => {
      const messageData = {
        ...content,
        isSelf: from === userData?._id,
      };
      const messagesData =
        messagesListRaw?.current?.length > 0
          ? [...messagesListRaw.current, messageData]
          : [content];
      messagesListRaw.current = messagesData;
      setMessagesList(messagesData);

      // ToDO
      // if (content.message === `trade-accepted-message`) {
      //     setTradeStatus('accepted');
      // }
    });
  };

  const sendMessage = () => {
    const content = {message: messageText, userName: userData?.name};
    socketObj.emit('private message', {
      content: content,
      to: offerItem?._id,
    });
    setMessageText('');
  };

  const onAddItemPress = () => {
    closeModal();
    if (offerItem?.senderItems.length >= 3) {
      Alert.showError('You cannot add more than 3 items to a trade');
      return;
    }
    dispatch(
      getProductListedItemsForOffer(
        userData?._id,
        (response: any) => {
          const filtered = [];
          response.forEach(item => {
            // Filters out items already in the trade
            // and items that are not avalibale
            if (
              !offerItem?.senderItems.some(
                senderItem => senderItem._id === item._id,
              ) &&
              item.isVisible &&
              item.isVirtuallyVerified
            ) {
              filtered.push(item);
            }
          });
          console.log(filtered);
          setEditTradeItems(filtered);
        },
        () => {
          Alert.showError('Could not load items!');
        },
      ),
    );
    setTimeout(() => {
      setAddItem(true);
      setAddRemoveItemModalVisible(true);
    }, 400);
  };
  const onRemoveItemPress = () => {
    closeModal();
    setTimeout(() => {
      setAddRemoveItemModalVisible(true);
    }, 600);
  };
  const onChangeOfferPress = () => {
    closeModal();
    setTimeout(() => {
      setChangeOfferModalVisible(true);
    }, 600);
  };
  const closeModal = () => {
    setDecline(false);
    setAddItem(false);
    setAcceptDeclineModalVisible(false);
    setEditTradeModalVisible(false);
    setAddRemoveItemModalVisible(false);
    setChangeOfferModalVisible(false);
  };
  const renderOfferCellView = () => {
    return <TradeOfferCell offerItem={offerItem} topMargin={5} />;
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
  const handleAcceptTrade = () => {
    const reqData = {
      tradeId: tradeId,
      userId: userData?._id,
    };
    dispatch(
      acceptTrade(
        reqData,
        res => {
          console.log('Success:', res);
          //TODO: redirect to screen
          navigation?.navigate('TradeCheckoutScreen', {
            tradeData: offerItem,
          });
        },
        error => {
          console.log('error:', error);
        },
      ),
    );
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
    console.log('messagesList ===', messagesList?.length);
    return (
      <ChatContainer>
        <FlatList
          data={messagesList}
          extraData={messagesList}
          renderItem={({item}) =>
            renderMessage(item?.userName === userData?.name, item)
          }
        />
      </ChatContainer>
    );
  };
  return (
    <Container>
      <LSOfferChatHeader
        title={
          offerItem?.reciever?._id === userData?._id
            ? offerItem?.sender?.name
            : offerItem?.reciever?.name
        }
        onAcceptPress={() => setAcceptDeclineModalVisible(true)}
        onDeclinePress={() => {
          setDecline(true);
          setAcceptDeclineModalVisible(true);
        }}
        onTrippleDotPress={() => setEditTradeModalVisible(true)}
        profilePicture={
          offerItem?.reciever?._id === userData?._id
            ? offerItem?.sender?.profile_picture
            : offerItem?.reciever?.profile_picture
        }
        offerItem={offerItem}
        userData={userData}
        tradeStatus={offerItem?.status}
      />
      {renderOfferCellView()}
      <KeyboardAvoidingView>
        {renderChatView()}
        <InputContainer bottomSpace={insets.bottom - 30}>
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
        onAddItemPress={onAddItemPress}
        onRemoveItemPress={onRemoveItemPress}
        onChangeOfferPress={onChangeOfferPress}
        offerItem={offerItem}
        userData={userData}
      />
      <ItemAddRemoveModal
        isModalVisible={isAddRemoveItemModalVisible}
        isAddItem={isAddItem}
        onCloseModal={closeModal}
        itemsData={isAddItem ? editTradeItems : offerItem?.senderItems}
        offerItem={offerItem}
        userData={userData}
      />
      <ChangeOfferModal
        isModalVisible={isChangeOfferModalVisible}
        onCloseModal={closeModal}
        offerItem={offerItem}
        userData={userData}
      />
    </Container>
  );
};

export default OffersMessageScreen;
