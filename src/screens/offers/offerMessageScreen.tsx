/***
INSQUAD - OFFERS MESSAGE SCREEN
***/

import React, {FC, useState} from 'react';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {useTheme} from 'styled-components';
import {moderateScale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LSOfferChatHeader} from '../../components/commonComponents/headers/offerChatHeader';
import TradeOfferCell from './offerItems/TradeOfferCell';
import LSInput from '../../components/commonComponents/LSInput';
import MessageCell from '../../components/message/messageCell';
import EditTradeModal from './offerItems/EditTradeModal';
import AcceptDeclineModal from './offerItems/AcceptDeclineModal';
import ItemAddRemoveModal from './offerItems/ItemAddRemoveModal';
import ChangeOfferModal from './offerItems/ChangeOfferModal';
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
export const OffersMessageScreen: FC<{}> = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [messageText, setMessageText] = useState('');
  const [messagesList, setMessagesList] = useState<any>(
    getConfiguredMessageData([1, 2, 3, 4, 5, 6, 7, 8]),
  );
  const [isAcceptDeclineModalVisible, setAcceptDeclineModalVisible] =
    useState(false);
  const [isDecline, setDecline] = useState(false);
  const [isEditTradeModalVisible, setEditTradeModalVisible] = useState(false);
  const [isAddItem, setAddItem] = useState(false);
  const [isAddRemoveItemModalVisible, setAddRemoveItemModalVisible] =
    useState(false);
  const [isChangeOfferModalVisible, setChangeOfferModalVisible] =
    useState(false);
  const sendMessage = () => {
    setMessagesList(getConfiguredMessageData([1, 2, 3, 4, 5, 6, 7, 8]));
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
    return <TradeOfferCell offerItem={1} topMargin={5} />;
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
        />
      </InputView>
    );
  };
  const renderMessage = (isSelf = false) => {
    return (
      <MessageCell
        self={isSelf}
        item={'Sem consequat tristique nec varius tellus molestie.'}
      />
    );
  };
  const renderChatView = () => {
    return (
      <ChatContainer>
        <SectionList
          sections={messagesList}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => renderMessage(item % 2 === 0)}
        />
      </ChatContainer>
    );
  };
  return (
    <Container>
      <LSOfferChatHeader
        title={'Jamel E.'}
        onAcceptPress={() => setAcceptDeclineModalVisible(true)}
        onDeclinePress={() => {
          setDecline(true);
          setAcceptDeclineModalVisible(true);
        }}
        onTrippleDotPress={() => setEditTradeModalVisible(true)}
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
