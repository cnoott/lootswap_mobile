import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Modal} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {WEB_APP_URL} from '@env';
import {WebView} from 'react-native-webview';
import {NavigationProp, useNavigation, useIsFocused} from '@react-navigation/native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  generateLinkPaypal,
  savePaypal,
  getMyDetailsRequest,
} from '../../redux/modules';
import {
  TopMargin,
  TopMinMargin,
  PayPalSubContainer,
  TopMaxMargin,
  Container,
} from './styles';
import {PAY_PAL_IMAGE, LINK_PAYPAL_TEXT} from 'localsvgimages';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {LSModal} from '../../components/commonComponents/LSModal';
import {SvgXml} from 'react-native-svg';
import {Size, Type} from '../../enums';
import LSButton from '../../components/commonComponents/LSButton';

export const PayPalLinkModal = () => {
  const auth: AuthProps = useSelector(state => state?.auth);
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const isFocused = useIsFocused();
  const {userData} = auth;
  const dispatch = useDispatch();
  const [isPayPalModalVisible, setPayPalModalVisible] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [paypalUri, setPaypalUri] = useState('');

  useEffect(() => {
    dispatch(getMyDetailsRequest(userData?._id));
    if (!userData?.paypal_onboarded) {
      setPayPalModalVisible(true);
    }

  }, [userData?._id, dispatch, userData?.paypal_onboarded]);

  const onMessage = msg => {
    setShowGateway(false);
    const data = JSON.parse(msg.nativeEvent.data);
    const reqData = {
      userId: userData?._id,
      paypalInfo: data,
    };
    dispatch(
      savePaypal(
        reqData,
        () => {
          dispatch(getMyDetailsRequest(userData?._id));
          setPayPalModalVisible(false);
        },
        error => {
          console.log(error);
        },
      ),
    );
  };
  const linkPaypalGateway = () => {
    if (showGateway) {
      return (
        <Modal
          visible={true}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'slide'}
          transparent={true}
          presentationStyle={'fullScreen'}>
          <Container style={styles.webViewCon}>
            <InStackHeader
              title={'Link Paypal'}
              onBackCall={() => setShowGateway(false)}/>
            <WebView
              source={{uri: paypalUri}}
              onMessage={onMessage}
              style={{flex:1}}
            />
          </Container>
        </Modal>
      );
    }
  };
  const handleLinkPayPal = () => {
    const reqData = {
      email: userData?.email,
      redirectUrl: `${WEB_APP_URL}/mobile-link-paypal`,
      _id: userData?._id,
    };
    dispatch(
      generateLinkPaypal(
        reqData,
        res => {
          setPaypalUri(res.links[1].href);
          setShowGateway(true);
        },
        error => {
          console.log(error);
        },
      ),
    );
  };

  const handleCancelPayPalModal = () => {
    setPayPalModalVisible(false);
    navigation?.navigate('HomeScreen');
  };

  const renderPayPalModalView = () => {
    return (
      <LSModal isVisible={isPayPalModalVisible}>
        <LSModal.Container>
          <PayPalSubContainer>
            <TopMargin />
            <SvgXml xml={PAY_PAL_IMAGE} />
            <TopMargin />
            <SvgXml xml={LINK_PAYPAL_TEXT} />
            <TopMaxMargin />
            <LSButton
              title={'Link PayPal account'}
              size={Size.Fit_To_Width}
              type={Type.Primary}
              radius={20}
              onPress={handleLinkPayPal}
            />
            <TopMinMargin />
            <LSButton
              title={'Cancel'}
              size={Size.Fit_To_Width}
              type={Type.Grey}
              radius={20}
              onPress={handleCancelPayPalModal}
            />
          </PayPalSubContainer>
        </LSModal.Container>
      </LSModal>
    );
  };

  return (
    <>
      {linkPaypalGateway()}
      {isFocused && renderPayPalModalView()}
    </>
  );
};

const styles = StyleSheet.create({
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

export default PayPalLinkModal;
