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
  Image,
  ImageContainer,
  BulletPointView,
  Bullet,
  BulletText,
  BulletBoldText,
} from './referralScreenStyles';
import {COPY_ICON, SHARE_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {saveReferralLinkRequest} from '../../redux/modules/';
import branch from 'react-native-branch';
import Clipboard from '@react-native-clipboard/clipboard';
import {Alert} from 'custom_top_alert';
import {Share} from 'react-native';
import {loggingService} from '../../services/loggingService';
import {scale} from 'react-native-size-matters';

export const ReferralScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const homeStates = useSelector(state => state.home);
  const {shouldShowGiveaway, giveawayImage, giveawayColor} = homeStates;
  const {userData} = auth;

  const copyToClipboard = () => {
    Clipboard.setString(userData?.referralLink);
    Alert.showSuccess('Copied!');
    loggingService().logEvent('share', {
      content_type: 'referral',
      item_id: userData?._id,
      method: 'copy to clipboard',
    });
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
        loggingService().logEvent('share', {
          content_type: 'referral',
          item_id: userData?._id,
          method: 'share button',
        });
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
          contentDescription:
            'Share and get paid $5 for every new member you refer!',
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
      const payload = {
        userId: userData?._id,
        referralLink: url,
      };
      dispatch(saveReferralLinkRequest(payload));
      //save url here
    }
  }, [userData?._id, userData?.referralLink, dispatch]);

  useEffect(() => {
    generateReferralLink();
  }, [generateReferralLink]);

  return (
    <Container>
      <TopContainer>
        <InStackHeader title={'Referral Link for Giveaway'} back />
        <ImageContainer>
          <Image
            source={{uri: giveawayImage}}
            width={scale(250)}
            height={scale(115)}
          />
        </ImageContainer>
        <TopTextContainer>
          <TopTextHeader>How to enter the giveaway 👟:</TopTextHeader>
        </TopTextContainer>
        <BulletPointView>
          <Bullet />
          <BulletText>
            <BulletBoldText>Share your custom referral link: </BulletBoldText>
            Each new account created using your link earns you one entry!
          </BulletText>
        </BulletPointView>
        <BulletPointView>
          <Bullet />
          <BulletText>
            <BulletBoldText>Share any product listing: </BulletBoldText>
            Tap the share icon <SvgXml
            xml={SHARE_ICON}
              margin={0}
            width={15} height={15}/> on a product listing page to post it on social media. This earns you one entry.
            Plus, if someone signs up after clicking your shared product, you score an extra entry!
          </BulletText>
        </BulletPointView>
        <LinkSectionContainer>
          <LinkHeader>Your Custom Referral Link</LinkHeader>
          <LinkContainer>
            <LinkText>{userData?.referralLink}</LinkText>
            <Touchable onPress={() => copyToClipboard()}>
              <SvgXml xml={COPY_ICON} />
            </Touchable>
          </LinkContainer>
        </LinkSectionContainer>
        <LinkSectionContainer>
          <LinkHeader>Your entries: {10}</LinkHeader>
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
