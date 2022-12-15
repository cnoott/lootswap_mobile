/***
LootSwap - USER CHAT SCREEN
***/

import React, {FC, useState} from 'react';
import {useTheme} from 'styled-components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
  ListHeaderContainer,
  ListHeaderText,
} from './styles';
import {MEDIA_UPLOAD_GREY_ICON} from 'localsvgimages';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {moderateScale} from 'react-native-size-matters';
import MessageCell from '../../components/message/messageCell';
import useMessagingService from '../../services/useMessagingService';

const DATA = [
  {
    title: 'Main dishes',
    data: [
      'Hello, good morning.',
      'I am a Customer Service, is there anything I can help you with? 😄',
    ],
    self: false,
  },
  {
    title: 'Sides',
    data: [
      "Hi, I'm having problems with my order & payment.",
      'Can you help me?',
    ],
    self: true,
  },
  {
    title: 'Drinks',
    data: [
      'Of course...',
      'Can you tell me the problem you are having? so I can help solve it 😁',
    ],
    self: false,
  },
];

export const UserChatScreen: FC<{}> = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  useMessagingService();
  const [messageText, setMessageText] = useState('');
  const renderRightInputView = () => {
    return (
      <Touchable>
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
          rightIcon={MEDIA_UPLOAD_GREY_ICON}
          homeSearch={true}
        />
      </InputView>
    );
  };
  const renderMessage = (messageData: any, isSelf = false) => {
    return <MessageCell self={isSelf} item={messageData} />;
  };
  const renderListHeader = (title: string) => {
    return (
      <ListHeaderContainer>
        <ListHeaderText>{title}</ListHeaderText>
      </ListHeaderContainer>
    );
  };
  const renderMessagesListView = () => {
    return (
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => renderMessage(item, DATA[index]?.self)}
        renderSectionHeader={({section: {title}}) => renderListHeader(title)}
      />
    );
  };
  return (
    <Container>
      <InUserChatHeader title={'Customer Service'} />
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
