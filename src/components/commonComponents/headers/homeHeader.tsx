import {HeaderContainer, LogoImage} from './styles';
import React, {FC} from 'react';
import {HEADERLOGO} from '../../../constants/imageConstants';

interface HeaderProps {
  title?: string;
  isHome?: boolean;
}

export const InHomeHeader: FC<HeaderProps> = React.memo(props => {
  const {isHome = false} = props;
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
    <HeaderContainer isHome={isHome}>
      <LogoImage source={HEADERLOGO} />
    </HeaderContainer>
  );
});
