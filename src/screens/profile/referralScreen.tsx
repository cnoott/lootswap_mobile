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
import {Share, ScrollView} from 'react-native';
import {loggingService} from '../../services/loggingService';
import {scale} from 'react-native-size-matters';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const ReferralScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const homeStates = useSelector(state => state.home);
  const {shouldShowGiveaway, giveawayImage, giveawayColor} = homeStates;
  const {userData, isLogedIn} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();

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
    if (!isLogedIn) {
      navigation.navigate('CreateAccountScreen');
      return;
    }
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
          contentDescription: 'Share and get an entry in the giveaway!',
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
    if (isLogedIn) {
      generateReferralLink();
    }
  }, [generateReferralLink, isLogedIn]);

  return (
    <Container>
      <InStackHeader title={'Referral Link'} back />
      <ScrollView>
        <TopContainer>
          <TopTextContainer>
            <TopTextHeader>Refer a friend and get $5!</TopTextHeader>
          </TopTextContainer>
          {!isLogedIn && (
            <BulletPointView>
              <Bullet />
              <BulletText>
                <BulletBoldText>First, create an account: </BulletBoldText>
                To begin entering in the giveaway, use the button below to
                create an account!
              </BulletText>
            </BulletPointView>
          )}
          <BulletPointView>
            <Bullet />
            <BulletText>
              <BulletBoldText>Share your custom referral link: </BulletBoldText>
              Each new account created using your link earns you $5. Earn up to $50.
            </BulletText>
          </BulletPointView>
          <BulletPointView>
            <Bullet />
            <BulletText>
              <BulletBoldText>
                You can access your funds in the "Wallet" screen:
              </BulletBoldText>
              Tap "Profile" on the bottom menu then tap "Wallet".
            </BulletText>
          </BulletPointView>
          {isLogedIn && (
            <LinkSectionContainer>
              <LinkHeader>Your Custom Referral Link</LinkHeader>
              <LinkContainer>
                <LinkText>{userData?.referralLink}</LinkText>
                <Touchable onPress={() => copyToClipboard()}>
                  <SvgXml xml={COPY_ICON} />
                </Touchable>
              </LinkContainer>
            </LinkSectionContainer>
          )}
        </TopContainer>
        {!isLogedIn && (
          <LinkSectionContainer>
            <LinkHeader>
              To begin giveaway entry, create an account first
            </LinkHeader>
          </LinkSectionContainer>
        )}
        <ShareButtonContainer>
          <LSButton
            title={isLogedIn ? 'Share Link' : 'Create Account'}
            size={Size.Full}
            type={Type.Primary}
            radius={20}
            onPress={() => onShare()}
          />
        </ShareButtonContainer>
      </ScrollView>
    </Container>
  );
};

export default ReferralScreen;
