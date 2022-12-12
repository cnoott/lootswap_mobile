/***
LootSwap - USER CHAT SCREEN
***/

import React, {FC, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
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
  MessageBoxContainer,
} from './styles';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {MEDIA_UPLOAD_GREY_ICON} from 'localsvgimages';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {moderateScale} from 'react-native-size-matters';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

export const UserChatScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
  const renderMessage = (messageData: any) => {
    return (
      <MessageBoxContainer
        self={[
          'Pizza',
          'Onion Rings',
          'Water',
          'Ice Cream',
          'Risotto',
        ].includes(messageData)}
      />
    );
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
        renderItem={({item}) => renderMessage(item)}
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
