import React, {FC} from 'react';
import {
  GiveawayContainer,
  Image,
  GiveawayPrimaryText,
  GiveawayDetailsText,
  ReferText,
  EnterNowButtonContainer,
} from './styles';
import {HOME_CAROUSEL_GIVEAWAY} from '../../../constants/imageConstants';
import {scale} from 'react-native-size-matters';
import LSButton from '../../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {Linking} from 'react-native';

interface HeaderProps {
  onItemPress?: Function;
}

export const LSGiveawayHomeItem: FC<HeaderProps> = React.memo(() => {

  return (
    <GiveawayContainer>
      <Image
        source={HOME_CAROUSEL_GIVEAWAY}
        width={scale(207)}
        height={scale(126)}
      />
      <GiveawayPrimaryText>
        Jordan 4 Retro SB Pine Green
      </GiveawayPrimaryText>
      <GiveawayDetailsText>
        {`Rules: Follow us and upload 1 item
        Each extra item uploaded → 1 more entry 🎟️`}
      </GiveawayDetailsText>
      <ReferText> Refer a friend 👤 → 5 entries 🎟️</ReferText>
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
          onPress={() => Linking.openURL('https://instagram.com')}
          sizeFont={12}
        />
      </EnterNowButtonContainer>
    </GiveawayContainer>
  );
});
