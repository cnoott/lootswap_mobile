/***
LootSwap - ADD LOOT EDIT ADDRESS SCREEN
***/

import React, {FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSInput from '../../components/commonComponents/LSInput';
import LSButton from '../../components/commonComponents/LSButton';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getMyDetailsRequest, editShippingAddr} from '../../redux/modules';
import {SvgXml} from 'react-native-svg';
import {BOTTOM_TAB_HOME} from 'localsvgimages';

import {Size, Type} from '../../enums';
import {Formik} from 'formik';
import {Alert} from 'custom_top_alert';
import {
  Container,
  EmptyTopView,
  EmptyBottomView,
  Innercontainer,
} from '../profile/editProfileStyles';
import {
  GuarenteedView,
  GuarenteedDesView,
  ProtectionTopLabel,
  ProtectionBottomLabel,
  ProtectionIconStyle,
} from '../productDetails/styles';
import {useNavigation, NavigationProp} from '@react-navigation/native';

//TODO: "Buyer prodteciton badge" for expalning that addr is req

export const LootEditAddressScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const onSubmit = (values: FormProps) => {
    const reqData = {
      userId: userData?._id,
      address: values,
    };
    dispatch(
      editShippingAddr(
        reqData,
        () => {
          Alert.showSuccess('Saved!');
          dispatch(getMyDetailsRequest(userData?._id));
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          navigation.navigate('List loot', {
            screen: 'LootScreen',
          });
        },
        error => {
          Alert.showError(error);
        },
      ),
    );
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Innercontainer}
      keyboardShouldPersistTaps={'handled'}>
      <Formik
        initialValues={{
          street1: userData?.shipping_address?.street1,
          street2: userData?.shipping_address?.street2,
          name: userData?.shipping_address?.name,
          city: userData?.shipping_address?.city,
          state: userData?.shipping_address?.state,
          zip: userData?.shipping_address?.zip,
        }}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => onSubmit(values)}>
        {({handleChange, handleSubmit, errors, values}) => {
          return (
            <Container>
              <EmptyTopView>
                <InStackHeader title="Shipping Address" />
                <GuarenteedView style={{marginHorizontal: 20}}>
                  <SvgXml xml={BOTTOM_TAB_HOME} style={ProtectionIconStyle} />
                  <GuarenteedDesView>
                    <ProtectionBottomLabel>
                      In order to continue listing an item, you must enter your
                      shipping info
                    </ProtectionBottomLabel>
                  </GuarenteedDesView>
                </GuarenteedView>
                <LSInput
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder={'Full Name'}
                />
                <LSInput
                  onChangeText={handleChange('street1')}
                  value={values.street1}
                  placeholder={'Street 1'}
                />
                <LSInput
                  onChangeText={handleChange('street2')}
                  value={values.street2}
                  placeholder={'Apartment/Unit (optional)'}
                />
                <LSInput
                  onChangeText={handleChange('city')}
                  value={values.city}
                  placeholder={'City'}
                />
                <LSInput
                  onChangeText={handleChange('state')}
                  value={values.state}
                  placeholder={'State (AL)'}
                />
                <LSInput
                  onChangeText={handleChange('zip')}
                  value={values.zip}
                  placeholder={'Zip'}
                />
              </EmptyTopView>
              <EmptyBottomView>
                <LSButton
                  title={'Continue'}
                  size={Size.Full}
                  type={Type.Primary}
                  radius={20}
                  onPress={handleSubmit}
                />
              </EmptyBottomView>
            </Container>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default LootEditAddressScreen;
