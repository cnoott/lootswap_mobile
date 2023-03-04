/***
LootSwap - WALLET SCREEN
***/

import React, {FC, useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {StyleSheet, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector, useDispatch} from 'react-redux';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {WALLET_BACKGROUND} from '../../assets/images/svgs';
import LSButton from '../../components/commonComponents/LSButton';
import {Type, Size} from 'custom_enums';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getMyDetailsRequest, checkStripeLink, payoutUser} from '../../redux/modules';
import {WEB_APP_URL} from '@env';
import {
  Container,
  SubContainer,
  MainLabel,
  WalletContainer,
  BalenceLabel,
  DesLabel,
} from './walletScreenStyles';
import {BottomView} from './styles';
import {Alert} from 'custom_top_alert';

export const WalletScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [showGateway, setShowGateway] = useState(false);
  const {userData, authToken} = auth;

  const webViewUri =
    `${WEB_APP_URL}/link-stripe-mobile?` +
    `userId=${encodeURIComponent(userData?._id)}` +
    `&token=${encodeURIComponent(authToken)}`;

  useEffect(() => {
    if (userData?._id) {
      dispatch(getMyDetailsRequest(userData?._id));
    }
  }, [dispatch, userData?._id]);

  const onMessage = () => {
    dispatch(
      checkStripeLink(
        {userId: userData?._id},
        res => {
          if (res?.account?.capabilities.transfers === 'active') {
            Alert.showSuccess('Account succesfully linked!');
          }
          dispatch(getMyDetailsRequest(userData?._id));
        },
        error => {
          Alert.showSuccess('Account could not be linked, please try again');
          console.log(error);
        }
      ),
    );
    setShowGateway(false);
  };

  const paypalGateway = () => {
    if (showGateway) {
      return (
        <Modal
          visible={true}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'slide'}
          presentationStyle={'fullScreen'}
          transparent={true}>
          <Container style={styles.webViewCon}>
            <InStackHeader title={'Link Stripe'} />
            <WebView
              source={{
                uri: webViewUri,
              }}
              onMessage={onMessage}
              style={{flex: 1}}
            />
          </Container>
        </Modal>
      );
    }
  };

  const handlePayout = () => {
    if (userData?.payoutBalance === 0) {
      Alert.showError('You do not have a balance to transfer');
    } else {
      dispatch(
        payoutUser(
          {userId: userData?._id},
          () => {
            Alert.showSuccess('Balance transfer started!')
            dispatch(getMyDetailsRequest(userData?._id));
          },
          error => {
            Alert.showError('There was an error. If problem persists please contact support@lootswap.com');
            console.log(error);
          },
        ),
      );
    }
  };

  return (
    <Container>
      {paypalGateway()}
      <InStackHeader title={''} back />
      <SubContainer>
        <MainLabel>Wallet Balance</MainLabel>
        <WalletContainer>
          <SvgXml xml={WALLET_BACKGROUND} width={'100%'} height={'100%'} />
          <BalenceLabel>${userData?.payoutBalance || '0'}</BalenceLabel>
        </WalletContainer>
        <DesLabel>
          Note: Transfers take 3-5 business. You will receive a sms notification
          in the coming days.
        </DesLabel>
        {userData?.stripeAccData?.capabilities?.transfers === 'active' ? (
          <>
            <LSButton
              title={'Account Linked! Tap to relink'}
              size={Size.Fit_To_Width}
              type={Type.Success}
              radius={25}
              fitToWidth={'90%'}
              onPress={() => setShowGateway(true)}
            />
            <BottomView/>
            <LSButton
              title={'Transfer funds'}
              size={Size.Fit_To_Width}
              type={Type.Primary}
              radius={25}
              fitToWidth={'90%'}
              onPress={() => handlePayout()}
            />
          </>
        ) : (
          <LSButton
            title={'Link Bank Account/Debit Card'}
            size={Size.Fit_To_Width}
            type={Type.Primary}
            radius={25}
            fitToWidth={'90%'}
            onPress={() => setShowGateway(true)}
          />
        )}
      </SubContainer>
    </Container>
  );
};
const styles = StyleSheet.create({ //For modal XXX repeating code in checkoutScreen.tsx
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});

export default WalletScreen;
