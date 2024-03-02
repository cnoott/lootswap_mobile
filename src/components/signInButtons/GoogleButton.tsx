import React from 'react';
import {Size, Type} from '../../enums';
import LSButton from '../commonComponents/LSButton';
import {GOOGLE_ICON} from 'localsvgimages';
import {useDispatch, useSelector} from 'react-redux';
import {signInWithGoogleRequest} from '../../redux/modules';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthProps} from '../../redux/modules/auth/reducer';

function GoogleButton() {
  const auth: AuthProps = useSelector(state => state.auth);
  const {fcmToken, referringUserId, marketingChannel} = auth;
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
        marketingChannel: marketingChannel,
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
