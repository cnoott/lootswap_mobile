import React from 'react';
import {Size, Type} from '../../enums';
import LSButton from '../commonComponents/LSButton';
import {GOOGLE_ICON} from 'localsvgimages';
import {useDispatch, useSelector} from 'react-redux';
import {signInWithGoogleRequest} from '../../redux/modules';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthProps} from '../../redux/modules/auth/reducer';
import messaging from '@react-native-firebase/messaging';

function GoogleButton() {
  const auth: AuthProps = useSelector(state => state.auth);
  const {fcmToken, referringUserId, marketingChannel} = auth;
  const dispatch = useDispatch();

  const googleSignUp = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      const fcmToken = await messaging().getToken();
      console.log('token', fcmToken);

      dispatch(
        signInWithGoogleRequest({
          ...userInfo,
          userData: userInfo.user,
          fcmToken, // ← already a string
          referringUserId,
          marketingChannel,
        }),
      );
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
    }
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
