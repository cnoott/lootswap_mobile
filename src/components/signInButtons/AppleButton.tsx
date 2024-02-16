import React from 'react';
import {Size, Type} from '../../enums';
import LSButton from '../commonComponents/LSButton';
import {APPLE_ICON} from 'localsvgimages';
import {useDispatch} from 'react-redux';
import {signInWithAppleRequest} from '../../redux/modules';
import {appleAuth} from '@invertase/react-native-apple-authentication';

interface AppleButtonProps {
  fcmToken?: any;
  referringUserId?: string;
}

function AppleButton(props: AppleButtonProps) {
  const {fcmToken = '', referringUserId = ''} = props;
  const dispatch = useDispatch();

  const appleSignUp = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log(appleAuthRequestResponse);
      dispatch(
        signInWithAppleRequest({
          ...appleAuthRequestResponse,
          fcmToken: fcmToken.token,
          referringUserId: referringUserId,
        }),
      );
    }
  };

  return (
    <LSButton
      title={'Continue with Apple'}
      size={Size.Full}
      type={Type.Secondary}
      radius={30}
      icon={APPLE_ICON}
      onPress={appleSignUp}
    />
  );
}

export default AppleButton;
