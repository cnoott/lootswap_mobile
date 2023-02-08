import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {HEADERLOGO} from '../../../constants/imageConstants';
import {HeaderContainer, LogoImage, TouchableOpacity} from './styles';

interface HeaderProps {
  title?: string;
  isHome?: boolean;
  rightIcon?: any;
  onRightItemPress?: Function;
  centerAligned?: boolean;
}

export const InHomeHeader: FC<HeaderProps> = React.memo(props => {
  const {
    rightIcon,
    isHome = false,
    centerAligned = true,
    onRightItemPress = () => {},
  } = props;
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets?.top;
  return (
    <HeaderContainer
      isHome={isHome}
      topPadding={statusBarHeight}
      centerAligned={centerAligned}>
      <LogoImage source={HEADERLOGO} />
      {!!rightIcon && (
        <TouchableOpacity onPress={() => onRightItemPress()}>
          <SvgXml xml={rightIcon} />
        </TouchableOpacity>
      )}
    </HeaderContainer>
  );
});
