/***
LootSwap - WALLET SCREEN
***/

import React, {FC, useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {WALLET_BACKGROUND} from '../../assets/images/svgs';
import LSButton from '../../components/commonComponents/LSButton';
import {Type, Size} from 'custom_enums';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getMyDetailsRequest} from '../../redux/modules';
import {
  Container,
  SubContainer,
  MainLabel,
  WalletContainer,
  BalenceLabel,
  DesLabel,
} from './walletScreenStyles';

export const WalletScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {userData} = auth;
  useEffect(() => {
    if (userData?._id) {
      dispatch(getMyDetailsRequest(userData?._id));
    }
  }, []);

  return (
    <Container>
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
        <LSButton
          title={'Link Bank Account/Debit Card'}
          size={Size.Fit_To_Width}
          type={Type.Primary}
          radius={25}
          fitToWidth={'90%'}
          onPress={() => {}}
        />
      </SubContainer>
    </Container>
  );
};

export default WalletScreen;
