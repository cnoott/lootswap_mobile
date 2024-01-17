import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  TopMargin,
  TopMinMargin,
  PayPalSubContainer,
  TopMaxMargin,
} from './styles';
import {PAY_PAL_IMAGE, LINK_PAYPAL_TEXT} from 'localsvgimages';
import {LSModal} from '../../components/commonComponents/LSModal';
import {SvgXml} from 'react-native-svg';
import {Size, Type} from '../../enums';
import LSButton from '../../components/commonComponents/LSButton';
import analytics from '@react-native-firebase/analytics';

export const PayPalLinkModal = props => {
  const {isPayPalModalVisible, setPayPalModalVisible} = props;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const handleLinkPayPal = () => {
    navigation.navigate('LinkPaypalScreen', {
      goToListLoot: true,
    });
    setPayPalModalVisible(false);
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    analytics().logEvent('start_link_paypal', {
      timestamp: currentEpochTime
    })
  };

  const handleCancelPayPalModal = () => {
    setPayPalModalVisible(false);
  };

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

export default PayPalLinkModal;
