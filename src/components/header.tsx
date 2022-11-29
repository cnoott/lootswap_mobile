import {
  HeaderContainer,
  LogoImage,
  HeaderText,
  Touchable,
  Block,
  BellImage,
  BellTouchable,
} from './styles';
import React, {FC} from 'react';
import {HEADERLOGO, NOTIFICATIONS_BOTTOM_TAB} from '../constants/constants';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
}

export const InHeader: FC<HeaderProps> = React.memo(props => {
  const {title} = props;
  const navigation: NavigationProp<any, any> = useNavigation();
  const onPress = () => {
    navigation.navigate('ChainScreen');
  };

  return (
    <HeaderContainer>
      <LogoImage source={HEADERLOGO} />
      <BellTouchable>
        <BellImage source={NOTIFICATIONS_BOTTOM_TAB} />
      </BellTouchable>
    </HeaderContainer>
  );
});
