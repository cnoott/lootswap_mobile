import React, {FC} from 'react';
import {
  GiveawayContainer,
  Image,
  GiveawayPrimaryText,
  GiveawayDetailsText,
  ReferText,
  EnterNowButtonContainer,
} from './styles';
import {
  HOME_CAROUSEL_GIVEAWAY,
  HOME_CAROUSEL_GIVEAWAY_TEXT,
} from '../../../constants/imageConstants';
import {scale} from 'react-native-size-matters';
import LSButton from '../../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {Linking} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../../redux/modules/auth/reducer';

interface HeaderProps {
  onItemPress?: Function;
}

export const LSGiveawayHomeItem: FC<HeaderProps> = React.memo(() => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const homeStates = useSelector(state => state.home);
  const {shouldShowGiveaway, giveawayImage, giveawayColor} = homeStates;
  const auth: AuthProps = useSelector(state => state.auth);
  const {isLogedIn} = auth;

  const handleEnterPress = () => {
    if (isLogedIn) {
      navigation.navigate('ReferralScreen');
      return;
    }

    navigation?.navigate('SignInScreen');
  };

  return (
    <GiveawayContainer giveawayColor={giveawayColor}>
      <Image
        source={HOME_CAROUSEL_GIVEAWAY_TEXT}
        width={scale(210)}
        height={scale(50)}
      />
      <Image
        source={{uri: giveawayImage}}
        width={scale(280)}
        height={scale(115)}
      />
      {/*
      <GiveawayDetailsText>
        {`Rules: Follow us and upload 1 item
        Each extra item uploaded → 1 more entry 🎟️`}
      </GiveawayDetailsText>
      <ReferText> Refer a friend 👤 → 5 entries 🎟️</ReferText>
      */}
      <EnterNowButtonContainer>
        <LSButton
          title={'ENTER NOW'}
          size={Size.Custom}
          customWidth={98}
          customHeight={34}
          type={Type.Custom}
          buttonCustomColor={'white'}
          customTextColor={'black'}
          radius={38}
          onPress={handleEnterPress}
          sizeFont={12}
        />
      </EnterNowButtonContainer>
    </GiveawayContainer>
  );
});
