import {
  HeaderContainer,
  LogoImage,
  HeaderText,
  Touchable,
  Block,
  BellImage,
  BellTouchable,
} from './styles';
import React, { FC } from 'react';
import { HEADERLOGO, BELL } from '../constants/constants';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
}

export const InHeader: FC<HeaderProps> = React.memo((props) => {
  const { title } = props;
  const navigation: NavigationProp<any, any> = useNavigation();
  const onPress = () => {
    navigation.navigate('ChainScreen');
  };

  return (
    <HeaderContainer>
      <Touchable onPress={onPress}>
        <LogoImage source={HEADERLOGO} />
        <HeaderText>{title}</HeaderText>
        <Icon name="chevron-down" size={20} color="black" />
      </Touchable>
      <Block />
      <BellTouchable>
        <BellImage source={BELL} />
      </BellTouchable>
    </HeaderContainer>
  );
});
