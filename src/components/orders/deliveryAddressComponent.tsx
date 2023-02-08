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

interface DeliveryAddressProps {
  userDetails: any;
}

function DeliveryAddressComponent(props: DeliveryAddressProps) {
  const {userDetails} = props;
  return (
    <DeliveryAddContainer>
      <DeliveryAddSubContainer>
        <DeliveryAddressLabel>Delivery Address</DeliveryAddressLabel>
        <DeliveryAddressText>
          {userDetails?.shipping_address?.street1}
          {', '}
          {userDetails?.shipping_address?.street2}
          {userDetails?.shipping_address?.city}{' '}
          {userDetails?.shipping_address?.state}{' '}
          {userDetails?.shipping_address?.zip}
        </DeliveryAddressText>
      </DeliveryAddSubContainer>
      <EditLabelContainer>
        <SvgXml xml={EDIT_PRIMARY_ICON_BOTTOM_LINE} />
        <EditLabel>Edit</EditLabel>
      </EditLabelContainer>
    </DeliveryAddContainer>
  );
}

export default DeliveryAddressComponent;
