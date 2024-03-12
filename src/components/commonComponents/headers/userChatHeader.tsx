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

interface HeaderProps {
  title?: string;
  onItemPress: Function;
  productData?: any;
}

export const InUserChatHeader: FC<HeaderProps> = React.memo(
  ({title, onItemPress, productData}) => {
    const theme = useTheme();
    const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
    const [accOpen, setAccOpen] = useState(true);
    const onTrippleDotPress = () => {};

    const renderOfferCellView = () => {
      return <OfferForSellOnlyCell itemData={productData} />;
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

    const onBackArrowPress = () => {
      navigation.goBack();
      loggingService().logEvent('end_message');
    };

    return (
      <>
        <ProfileHeaderContainer>
          <EmptyRowView>
            <TouchableOpacity onPress={() => onBackArrowPress()}>
              <SvgXml xml={LEFT_BLACK_ARROW} />
            </TouchableOpacity>
            <StackHeaderText>{title}</StackHeaderText>
          </EmptyRowView>
          {true ? (
            <LSButton
              title={'View Item'}
              size={Size.Extra_Small}
              type={Type.Secondary}
              onPress={() => onItemPress()}
            />
          ) : (
            <EmptyRowView>
              <ProfileRightTouchable onPress={onTrippleDotPress}>
                <PhoneIcon
                  size={moderateScale(20)}
                  color={theme?.colors?.black}
                />
              </ProfileRightTouchable>
              <ProfileRightTouchable onPress={onTrippleDotPress}>
                <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
              </ProfileRightTouchable>
            </EmptyRowView>
          )}
        </ProfileHeaderContainer>
        {renderProductViewContainer()}
      </>
    );
  },
);
