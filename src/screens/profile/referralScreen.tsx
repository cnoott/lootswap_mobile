/***
  LootSwap - WALLET SCREEN
 ***/


import React, {FC} from 'react';
import {
  TopContainer,
  TopTextContainer,
  TopTextHeader,
  GreenText,
  TopTextSub,
  MiddleText,
  LinkSectionContainer,
  LinkHeader,
  LinkContainer,
  LinkText,
  Touchable,
  Container,
  ShareButtonContainer,
} from './referralScreenStyles';
import {COPY_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';

export const ReferralScreen: FC<{}> = () => {
  return (
    <Container>
      <TopContainer>
        <InStackHeader title={'Referral Link'} back />

        <TopTextContainer>
          <TopTextHeader>
            Get paid <GreenText>$5</GreenText> for every new member you refer
            completing their first trade! 💸 🔀
          </TopTextHeader>
          <TopTextSub>
            *compensation will be on your lootswap wallet.
          </TopTextSub>

          <MiddleText>
            Share with your Friends, Family, Followers, and whoever may be
            interested in lootswap!
          </MiddleText>
        </TopTextContainer>

        <LinkSectionContainer>
          <LinkHeader>Your Custom Referral Link</LinkHeader>

          <LinkContainer>
            <LinkText>www.download.lootswap.com/liam</LinkText>
            <Touchable>
              <SvgXml xml={COPY_ICON} />
            </Touchable>
          </LinkContainer>
        </LinkSectionContainer>
      </TopContainer>
      <ShareButtonContainer>
        <LSButton
          title={'Share Link'}
          size={Size.Full}
          type={Type.Primary}
          radius={20}
          onPress={() => console.log('pressed')}
        />
      </ShareButtonContainer>
    </Container>
  );
};

export default ReferralScreen;
