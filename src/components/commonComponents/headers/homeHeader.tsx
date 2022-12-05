import {HeaderContainer, LogoImage, BellImage, BellTouchable} from './styles';
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {
  HEADERLOGO,
  NOTIFICATIONS_BOTTOM_TAB,
} from '../../../constants/imageConstants';
import {signOutRequest} from '../../../redux/modules';
// import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
}

export const InHomeHeader: FC<HeaderProps> = React.memo(() => {
  const dispatch = useDispatch();
  // const {title} = props;
  // const navigation: NavigationProp<any, any> = useNavigation();
  // const onPress = () => {
  //   navigation.navigate('ChainScreen');
  // };

  const onBellPress = () => {
    dispatch(signOutRequest());
  };

  return (
    <HeaderContainer>
      <LogoImage source={HEADERLOGO} />
      <BellTouchable onPress={onBellPress}>
        <BellImage source={NOTIFICATIONS_BOTTOM_TAB} />
      </BellTouchable>
    </HeaderContainer>
  );
});
