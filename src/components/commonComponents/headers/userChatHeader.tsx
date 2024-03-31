import {
  StackHeaderText,
  ProfileHeaderContainer,
  ProfileRightTouchable,
  EmptyRowView,
  TouchableOpacity,
  EmptyColumnView,
  ArrowContainerProductChat,
  ArrowIconContainer,
} from './styles';
import {
  ACCORDIAN_DOWN_ELLIPSE,
  ACCORDIAN_UP_ELLIPSE,
  LEFT_BLACK_ARROW,
} from 'localsvgimages';
import React, {FC, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import {PhoneIcon} from 'react-native-heroicons/outline';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from 'styled-components';
import LSButton from '../LSButton';
import OfferForSellOnlyCell from '../../../screens/offers/offerItems/OfferForSellOnlyCell';
import {Size, Type} from '../../../enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {loggingService} from '../../../services/loggingService';
import {ProfileHeaderComponent} from './profileHeaderComponent';

interface HeaderProps {
  title?: string;
  onRightDotsPress: Function;
  productData?: any;
  otherUserData?: any;
}

export const InUserChatHeader: FC<HeaderProps> = React.memo(
  ({title, onRightDotsPress, productData, otherUserData}) => {
    const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
    const [accOpen, setAccOpen] = useState(true);

    const renderOfferCellView = () => {
      return <OfferForSellOnlyCell itemData={productData} isFromMessageScreen={true}/>;
    };

    const renderProductViewContainer = () => {
      return (
        <EmptyColumnView>
          <Collapsible collapsed={accOpen} renderChildrenCollapsed={true}>
            {renderOfferCellView()}
          </Collapsible>
          <ArrowContainerProductChat onPress={() => setAccOpen(!accOpen)}>
            <ArrowIconContainer>
              <SvgXml
                xml={accOpen ? ACCORDIAN_DOWN_ELLIPSE : ACCORDIAN_UP_ELLIPSE}
              />
            </ArrowIconContainer>
          </ArrowContainerProductChat>
        </EmptyColumnView>
      );
    };

    return (
      <>
        <ProfileHeaderContainer>
          <EmptyRowView>
            <ProfileHeaderComponent
              otherUserName={title}
              otherUserData={otherUserData}
              otherUserPfp={otherUserData?.profile_picture}
            />
          </EmptyRowView>
          <ProfileRightTouchable onPress={onRightDotsPress}>
            <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
          </ProfileRightTouchable>
        </ProfileHeaderContainer>
        {renderProductViewContainer()}
      </>
    );
  },
);
