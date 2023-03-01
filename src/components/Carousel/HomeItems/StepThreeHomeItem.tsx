import React, {FC} from 'react';
import LSButton from '../../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  Container,
  StepThreeHeaderText,
  HeaderPrimaryText,
  DiscordContainer,
  Image,
  VerticalSpace,
  ExecutivePerksText,
  EmptyView,
} from './styles';
import {
  DISCORD_LOGO,
  DISCORD_SCREENSHOT,
} from '../../../constants/imageConstants';
import {Linking} from 'react-native';

interface HeaderProps {
  onItemPress?: string;
}

export const LSHomeStepThreeCarouselItem: FC<HeaderProps> = React.memo(() => {
  return (
    <Container>
      <DiscordContainer>
        <EmptyView>
          <VerticalSpace />
          <Image source={DISCORD_LOGO} width={60} height={64} />
        </EmptyView>
        <StepThreeHeaderText>
          {'Join the lootswap\n'}
          <HeaderPrimaryText>Discord community</HeaderPrimaryText>
        </StepThreeHeaderText>
      </DiscordContainer>
      <VerticalSpace space={30} />
      <Image source={DISCORD_SCREENSHOT} width={300} height={140} />
      <ExecutivePerksText>{'*Get Exclusive Perks'}</ExecutivePerksText>
      <LSButton
        title={'Join Now'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={10}
        onPress={() => Linking.openURL('https://discord.gg/z6EH4zAfxt')}
        fitToWidth={'37%'}
        sizeFont={24}
      />
      <VerticalSpace space={20} />
    </Container>
  );
});
