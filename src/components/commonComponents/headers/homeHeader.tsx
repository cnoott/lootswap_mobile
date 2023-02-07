import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HEADERLOGO} from '../../../constants/imageConstants';
import {HeaderContainer, LogoImage} from './styles';

interface HeaderProps {
  title?: string;
  isHome?: boolean;
}

export const InHomeHeader: FC<HeaderProps> = React.memo(props => {
  const {isHome = false} = props;
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets?.top;
  //const dispatch = useDispatch();
  // const {title} = props;
  // const navigation: NavigationProp<any, any> = useNavigation();
  // const onPress = () => {
  //   navigation.navigate('ChainScreen');
  // };

  // const onBellPress = () => {
  //   dispatch(signOutRequest());
  // };

  return (
    <HeaderContainer isHome={isHome} topPadding={statusBarHeight}>
      <LogoImage source={HEADERLOGO} />
    </HeaderContainer>
  );
});
