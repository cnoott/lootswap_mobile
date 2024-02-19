import React, {FC, useEffect, useState, useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from '@env';
import {getMyDetailsRequest, editShippingAddr} from '../../redux/modules';
import {
  EmptyTopView,
  EmptyBottomView,
  AutocompleteStyles,
  TopSpaceView,
  DisclaimerView,
  DisclaimerDesView,
  DisclaimerTopLabel,
} from '../../screens/profile/editProfileStyles';
import {Size, Type} from '../../enums';
import {SvgXml} from 'react-native-svg';
import LSInput from '../../components/commonComponents/LSInput';
import LSButton from '../../components/commonComponents/LSButton';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Alert} from 'custom_top_alert';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {BOTTOM_TAB_HOME} from 'localsvgimages';

interface EditAddressComponentProps {
  isFromAddLoot?: Boolean;
}

export const EditAddressComponent: FC<EditAddressComponentProps> = props => {
  const {isFromAddLoot = false} = props;
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const [shippingInfo, setShippingInfo] = useState(userData?.shipping_address);
  const {name, street1, street2, city, state, zip} = shippingInfo;
  const ref = useRef();
  const navigation: NavigationProp<any, any> = useNavigation();

  useEffect(() => {
    const addressText = [street1, city, state, zip]
      .filter(Boolean)
      .join(', ')
      .trim();

    ref.current?.setAddressText(addressText);
  }, [userData?.shipping_address]);

  const validation = () => {
    if (!name || !street1 || !city || !state || !zip) {
      Alert.showError('Please fill all information');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    const reqData = {
      userId: userData?._id,
      address: shippingInfo,
    };
    if (!validation()) {
      return;
    }
    dispatch(
      editShippingAddr(
        reqData,
        () => {
          Alert.showSuccess('Saved!');
          dispatch(getMyDetailsRequest(userData?._id));
          if (isFromAddLoot) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
            navigation.navigate('Add loot', {
              screen: 'LootScreen',
            });
          }
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
    <>
      <EmptyTopView>
        {isFromAddLoot && (
          <DisclaimerView>
            <SvgXml xml={BOTTOM_TAB_HOME} />
            <DisclaimerTopLabel>
              In order to continue listing an item, you must enter your shipping info
            </DisclaimerTopLabel>
          </DisclaimerView>
        )}
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
          onFail={err => console.log('fail', err)}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en',
            components: 'country:us',

          }}
          styles={AutocompleteStyles}
          enablePoweredByContainer={false}
          autocomplete={false}
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
    </>
  );
};

export default EditAddressComponent;
