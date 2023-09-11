import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {HEADERLOGO} from '../../../constants/imageConstants';
import {BOTTOM_TAB_NOTIFICATION} from 'localsvgimages';
import {
  HeaderContainer,
  LogoImage,
  TouchableOpacity,
  TouchableOpacityNotif,
  IconsContainer,
} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  isHome?: boolean;
  rightIcon?: any;
  onRightItemPress?: Function;
  onNotifButtonPress?: Function;
  centerAligned?: boolean;
}

export const InHomeHeader: FC<HeaderProps> = React.memo(props => {
  const {
    rightIcon,
    isHome = false,
    centerAligned = true,
    onRightItemPress = () => {},
    onNotifButtonPress = () => {},
  } = props;
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets?.top;

  const navigation: NavigationProp<any, any> = useNavigation();
  const navigateToNotif = () => {
    navigation.navigate('Notifications');
  };

  return (
    <HeaderContainer
      isHome={isHome}
      topPadding={statusBarHeight}
      centerAligned={centerAligned}>
      <LogoImage source={HEADERLOGO} />
      {!!rightIcon && (
        <IconsContainer>
          <TouchableOpacityNotif onPress={() => navigateToNotif()}>
            <SvgXml xml={BOTTOM_TAB_NOTIFICATION}/>
          </TouchableOpacityNotif>
          <TouchableOpacity onPress={() => onRightItemPress()}>
            <SvgXml xml={rightIcon} />
          </TouchableOpacity>
        </IconsContainer>
      )}
    </HeaderContainer>
  );
});
