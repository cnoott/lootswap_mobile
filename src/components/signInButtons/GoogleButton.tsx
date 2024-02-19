import React from 'react';
import {Size, Type} from '../../enums';
import LSButton from '../commonComponents/LSButton';
import {GOOGLE_ICON} from 'localsvgimages';
import {useDispatch} from 'react-redux';
import {signInWithGoogleRequest} from '../../redux/modules';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface GoogleButtonProps {
  fcmToken?: any;
  referringUserId?: string;
}

function GoogleButton(props: GoogleButtonProps) {
  const {fcmToken = '', referringUserId = ''} = props;
  const dispatch = useDispatch();

  const googleSignUp = async () => {
    const userInfo = await GoogleSignin.signIn();
    console.log('token', fcmToken.token);

    dispatch(
      signInWithGoogleRequest({
        ...userInfo,
        userData: userInfo.user,
        fcmToken: fcmToken?.token,
        referringUserId: referringUserId,
      }),
    );
  };

  return (
    <LSButton
      title={'Continue with Google'}
      size={Size.Full}
      type={Type.Grey}
      radius={30}
      icon={GOOGLE_ICON}
      onPress={googleSignUp}
    />
  );
}

export default GoogleButton;
