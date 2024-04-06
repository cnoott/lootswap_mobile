/***
  lootswap - LINK PAYPAL SCREEN
 ***/
import React, {FC, useEffect, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {WEB_APP_URL} from '@env';
import {WebView} from 'react-native-webview';
import {Container} from './walletScreenStyles';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  generateLinkPaypal,
  savePaypal,
  getMyDetailsRequest,
} from '../../redux/modules';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  LoadingRequest,
  LoadingSuccess,
} from '../../redux/modules/loading/actions';
import {loggingService} from '../../services/loggingService';
//TODO:
//      - LoadingRequest
export const LinkPaypalScreen: FC<{}> = props => {
  const {goToListLoot = false} = props?.route?.params;
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [paypalUri, setPaypalUri] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reqData = {
      email: userData?.email,
      redirectUrl: `${WEB_APP_URL}/mobile-link-paypal`,
      _id: userData?._id,
    };
    loggingService().logEvent('start_link_paypal');
    dispatch(LoadingRequest());
    dispatch(
      generateLinkPaypal(
        reqData,
        res => {
          setPaypalUri(res.links[1].href);
          setLoading(false);
        },
        error => {
          console.log(error);
        },
      ),
    );
  }, [dispatch, userData?._id, userData?.email]);

  const onMessage = msg => {
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
          loggingService().logEvent('end_link_paypal');
          if (goToListLoot) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
            navigation.navigate('List item', {
              screen: 'LootScreen',
            });
          } else {
            navigation.goBack();
          }
        },
        error => {
          console.log(error);
        },
      ),
    );
  };

  return (
    <Container>
      <InStackHeader title={'Link PayPal'} />
      {!loading && (
        <WebView
          onLoad={() => dispatch(LoadingSuccess())}
          source={{uri: paypalUri}}
          onMessage={onMessage}
          style={{flex: 1}}
        />
      )}
    </Container>
  );
};

export default LinkPaypalScreen;
