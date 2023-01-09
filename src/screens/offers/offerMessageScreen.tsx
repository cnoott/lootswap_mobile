/* eslint-disable react-hooks/exhaustive-deps */
/***
LOOTSWAP - OFFERS MESSAGE SCREEN
***/

import React, {FC, useEffect, useState, useRef} from 'react';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {useTheme} from 'styled-components';
import {moderateScale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {LSOfferChatHeader} from '../../components/commonComponents/headers/offerChatHeader';
import TradeOfferCell from './offerItems/TradeOfferCell';
import LSInput from '../../components/commonComponents/LSInput';
import MessageCell from '../../components/message/messageCell';
import EditTradeModal from './offerItems/EditTradeModal';
import AcceptDeclineModal from './offerItems/AcceptDeclineModal';
import ItemAddRemoveModal from './offerItems/ItemAddRemoveModal';
import ChangeOfferModal from './offerItems/ChangeOfferModal';
import useMessagingService from '../../services/useMessagingService';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  getConfiguredMessageData,
  getAllOfferItemsData,
  getSelectedOfferItemsData,
} from '../../utility/utility';
import {
  Container,
  ChatContainer,
  KeyboardAvoidingView,
  InputContainer,
  Touchable,
  InputRightButtonView,
  InputView,
  SectionList,
} from './styles';
export const OffersMessageScreen: FC<{}> = props => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const offerItem = props.route?.params?.item;
  const [messageText, setMessageText] = useState('');
  const [isAcceptDeclineModalVisible, setAcceptDeclineModalVisible] =
    useState(false);
  const [isDecline, setDecline] = useState(false);
  const [isEditTradeModalVisible, setEditTradeModalVisible] = useState(false);
  const [isAddItem, setAddItem] = useState(false);
  const [isAddRemoveItemModalVisible, setAddRemoveItemModalVisible] =
    useState(false);
  const [isChangeOfferModalVisible, setChangeOfferModalVisible] =
    useState(false);
  const [isSocketInitDone, setSocketInitDone] = useState(false);
  const [messagesList, setMessagesList] = useState<any>(
    getConfiguredMessageData(offerItem?.messages || []),
  );
  var messagesListRaw: any = useRef(offerItem?.messages || []);
  const auth: AuthProps = useSelector(state => state?.auth);
  console.log('offerItem ===', offerItem);
  const {userData} = auth;
  const socketObj = useMessagingService(
    {
      tradeId: offerItem?._id,
      userId: userData?._id,
    },
    true,
  );

  useEffect(() => {
    if (socketObj && !isSocketInitDone) {
      setSocketInitDone(true);
      initSocket();
    }
  }, [socketObj, isSocketInitDone]);

  useEffect(() => {
    return () => socketObj && socketObj.removeAllListeners();
  }, []);

  const initSocket = () => {
    socketObj.on('private message', ({content, from}: any) => {
      const messageData = {
        ...content,
        isSelf: from === userData?._id,
      };
      const messagesData =
        messagesListRaw?.current?.length > 0
          ? [...messagesListRaw.current, messageData]
          : [content];
      messagesListRaw.current = messagesData;
      const newData = getConfiguredMessageData(messagesData);
      setMessagesList(newData);
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
    setTimeout(() => {
      setAddItem(true);
      setAddRemoveItemModalVisible(true);
    }, 600);
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
  const renderMessage = (item: any) => {
    return <MessageCell self={true} item={item?.message} />;
  };
  const renderChatView = () => {
    return (
      <ChatContainer>
        <SectionList
          sections={messagesList}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => renderMessage(item)}
        />
      </ChatContainer>
    );
  };
  return (
    <Container>
      <LSOfferChatHeader
        title={offerItem?.reciever?.name}
        profileUrl={offerItem?.reciever?.profile_picture}
        onAcceptPress={() => setAcceptDeclineModalVisible(true)}
        onDeclinePress={() => {
          setDecline(true);
          setAcceptDeclineModalVisible(true);
        }}
        onTrippleDotPress={() => setEditTradeModalVisible(true)}
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
        onAcceptOfferPress={closeModal}
        onDeclineOfferPress={closeModal}
      />
      <EditTradeModal
        isModalVisible={isEditTradeModalVisible}
        onCloseModal={closeModal}
        onAddItemPress={onAddItemPress}
        onRemoveItemPress={onRemoveItemPress}
        onChangeOfferPress={onChangeOfferPress}
      />
      <ItemAddRemoveModal
        isModalVisible={isAddRemoveItemModalVisible}
        isAddItem={isAddItem}
        onCloseModal={closeModal}
        itemsData={
          isAddItem ? getAllOfferItemsData() : getSelectedOfferItemsData()
        }
      />
      <ChangeOfferModal
        isModalVisible={isChangeOfferModalVisible}
        onCloseModal={closeModal}
      />
    </Container>
  );
};

export default OffersMessageScreen;
