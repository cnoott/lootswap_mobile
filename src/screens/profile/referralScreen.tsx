/***
  LootSwap - WALLET SCREEN
 ***/


import React, {FC, useEffect, useCallback} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import branch from 'react-native-branch';
import Clipboard from '@react-native-clipboard/clipboard';
import {Alert} from 'custom_top_alert';
import {Share} from 'react-native';

export const ReferralScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {userData} = auth;

  const copyToClipboard = () => {
    Clipboard.setString(userData?.referralLink);
    Alert.showSuccess('Copied!');
  };

  const onShare = async () => {
    if (!userData?.referralLink) {
      return;
    }

    try {
      const result = await Share.share({
        message: `${userData.referralLink}`,
        url: `${userData.referralLink}`,
      });
      if (result.action === Share.sharedAction) {
        Alert.showSuccess('Thanks for sharing!');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const generateReferralLink = useCallback(async () => {
    if (!userData?.referralLink) {
      let buo = await branch.createBranchUniversalObject(
        `referral_${userData?._id}`,
        {
          title: 'lootswap referral link',
          contentDescription: 'Share and get paid $5 for every new member you refer!',
          contentMetadata: {
            customMetadata: {
              userId: userData?._id,
            },
          },
        },
      );

      const linkProperties = {
        feature: 'referral',
        channel: 'in-app',
        campaign: 'lootswap refer a friend',
        stage: 'new user',
        tags: ['referral'],
      };

      const controlParams = {
        $desktop_url: 'https://download.lootswap.com',
      };

      const {url} = await buo.generateShortUrl(linkProperties, controlParams);
      console.log('URL GENERATED: ', url);
      //save url here
    }
  }, [userData?._id, userData?.referralLink]);

  useEffect(() => {
    generateReferralLink();
  }, [generateReferralLink]);

  return (
    <Container>
      <TopContainer>
        <InStackHeader title={'Referral Link'} back />

        <TopTextContainer>
          <TopTextHeader>
            Get paid <GreenText>$5</GreenText> for every new member you refer
            after they complete their first trade! 💸 🔀
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
            <LinkText>{userData?.referralLink}</LinkText>
            <Touchable onPress={() => copyToClipboard()}>
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
          onPress={() => onShare()}
        />
      </ShareButtonContainer>
    </Container>
  );
};

export default ReferralScreen;
