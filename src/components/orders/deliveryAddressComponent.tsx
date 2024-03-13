import * as React from 'react';
import {
  DeliveryAddContainer,
  DeliveryAddSubContainer,
  DeliveryAddressLabel,
  DeliveryAddressText,
  EditLabelContainer,
  EditLabel,
} from './styles';
import {SvgXml} from 'react-native-svg';
import {EDIT_PRIMARY_ICON_BOTTOM_LINE} from '../../assets/images/svgs';
import {WARNING_ICON} from 'localsvgimages';

interface DeliveryAddressProps {
  userDetails: any;
  onPress: Function;
}

function DeliveryAddressComponent(props: DeliveryAddressProps) {
  const {userDetails, onPress} = props;
  const userDidNotFillAddr =
    Object.keys(userDetails?.shipping_address).length < 5;
  return (
    <DeliveryAddContainer>
      <DeliveryAddSubContainer>
        <DeliveryAddressLabel>
          Delivery Address
          {userDidNotFillAddr && <SvgXml xml={WARNING_ICON} width={20} />}
        </DeliveryAddressLabel>
        <DeliveryAddressText>
          {userDidNotFillAddr && (
            <>Please fill out your address to continue checking out</>
          )}
          {userDetails?.shipping_address?.street1}
          {', '}
          {userDetails?.shipping_address?.street2}
          {userDetails?.shipping_address?.city}{' '}
          {userDetails?.shipping_address?.state}{' '}
          {userDetails?.shipping_address?.zip}
        </DeliveryAddressText>
      </DeliveryAddSubContainer>
      <EditLabelContainer onPress={() => onPress()}>
        <SvgXml xml={EDIT_PRIMARY_ICON_BOTTOM_LINE} />
        <EditLabel>Edit</EditLabel>
      </EditLabelContainer>
    </DeliveryAddContainer>
  );
}

export default DeliveryAddressComponent;
