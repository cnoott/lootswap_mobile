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
import LSButton from '../../components/commonComponents/LSButton';
import {LSModal} from '../../components/commonComponents/LSModal';
import MessageCell from '../../components/message/messageCell';
import {getConfiguredMessageData} from '../../utility/utility';
import {Size, Type} from 'custom_enums';
import {
  Container,
  ChatContainer,
  KeyboardAvoidingView,
  InputContainer,
  Touchable,
  InputRightButtonView,
  InputView,
  SectionList,
  ModalContainerView,
  ModalHeaderText,
  TopMargin,
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
  const sendMessage = () => {
    setMessagesList(getConfiguredMessageData([1, 2, 3, 4, 5, 6, 7, 8]));
  };
  const closeModal = () => {
    setDecline(false);
    setAcceptDeclineModalVisible(false);
  };
  const renderAcceptDeclineModalView = () => {
    return (
      <LSModal
        isVisible={isAcceptDeclineModalVisible}
        onBackdropPress={() => closeModal()}>
        <LSModal.Container>
          <ModalContainerView>
            <ModalHeaderText>
              {`Are you sure you would like to ${
                isDecline ? 'Decline' : 'Accept'
              } this trade?`}
            </ModalHeaderText>
            <TopMargin />
            <LSButton
              title={
                isDecline ? 'Yes, Decline the Trade' : 'Yes, Accept the Trade'
              }
              size={Size.Fit_To_Width}
              type={isDecline ? Type.Error : Type.Success}
              radius={20}
              onPress={() => closeModal()}
            />
            <TopMargin margin={2} />
            <LSButton
              title={'Not this time'}
              size={Size.Fit_To_Width}
              type={Type.Grey}
              radius={20}
              onPress={() => closeModal()}
            />
          </ModalContainerView>
          <LSModal.CloseButton onCloseButtonPress={() => closeModal()} />
        </LSModal.Container>
      </LSModal>
    );
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
        onTrippleDotPress={() => {}}
      />
      {renderOfferCellView()}
      <KeyboardAvoidingView>
        {renderChatView()}
        <InputContainer bottomSpace={insets.bottom - 30}>
          {renderLeftInputView()}
          {renderRightInputView()}
        </InputContainer>
      </KeyboardAvoidingView>
      {renderAcceptDeclineModalView()}
    </Container>
  );
};

export default OffersMessageScreen;
