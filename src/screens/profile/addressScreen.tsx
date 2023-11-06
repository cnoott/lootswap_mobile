/***
  LootSwap - EDIT ADDRESS SCREEN
 ***/

import React, {FC, useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSInput from '../../components/commonComponents/LSInput';
import LSButton from '../../components/commonComponents/LSButton';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getMyDetailsRequest, editShippingAddr} from '../../redux/modules';
import {
  Container,
  EmptyTopView,
  EmptyBottomView,
  Innercontainer,
  AutocompleteStyles,
  TopSpaceView,
  GoogleContainer,
} from './editProfileStyles';
import {Size, Type} from '../../enums';
import {Alert} from 'custom_top_alert';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from '@env';
import {View} from 'react-native';


export const AddressScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const [shippingInfo, setShippingInfo] = useState(userData?.shipping_address);
  const {name, street1, street2, city, state, zip} = shippingInfo;
  const ref = useRef();

  useEffect(() => {
    const addressText = [street1, city, state, zip]
      .filter(Boolean)
      .join(', ')
      .trim();

    ref.current?.setAddressText(addressText);
  }, [userData?.shipping_address]);

  const onSubmit = () => {
    const reqData = {
      userId: userData?._id,
      address: shippingInfo,
    };
    dispatch(
      editShippingAddr(
        reqData,
        () => {
          Alert.showSuccess('Saved!');
          dispatch(getMyDetailsRequest(userData?._id));
        },
        error => {
          Alert.showError(error);
        },
      ),
    );
  };

  const handleAutofillChange = (data: any, details: any) => {
    const address = {
      street1: data.terms[0].value + ' ' + data.terms[1].value,
      city: data.terms[2].value,
      state: data.terms[3].value,
      zip: details.address_components.find(component =>
        component.types.includes('postal_code'),
      ).short_name,
    };
    console.log(address);
    setShippingInfo({...shippingInfo, ...address});
  };

  const handleChange = (attr: string) => (value: any) => {
    setShippingInfo({...shippingInfo, [attr]: value});
  };

  return (
    <Container>
      <EmptyTopView>
        <InStackHeader title="Edit Shipping Address" />
        <LSInput
          onChangeText={handleChange('name')}
          value={name}
          placeholder={'Full Name'}
        />
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails={true}
          placeholder="Type your address"
          onPress={(data, details) => {
            console.log(JSON.stringify(data));
            console.log('DETAILs', JSON.stringify(details));
            handleAutofillChange(data, details);
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en',
            components: 'country:us',

          }}
          styles={AutocompleteStyles}
          enablePoweredByContainer={false}
        />
        <TopSpaceView>
          <LSInput
            onChangeText={handleChange('street2')}
            value={street2}
            placeholder={'Street 2'}
          />
        </TopSpaceView>
      </EmptyTopView>
      <EmptyBottomView>
        <LSButton
          title={'Save'}
          size={Size.Full}
          type={Type.Primary}
          radius={20}
          onPress={onSubmit}
        />
      </EmptyBottomView>
    </Container>
  );
};

export default AddressScreen;
