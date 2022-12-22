/***
LootSwap - ADD_PRODUCT STEP 5
***/

import React, {FC, useState} from 'react';
import LSInput from '../../../components/commonComponents/LSInput';
import {SvgXml} from 'react-native-svg';
import {
  Container,
  HorizontalSpace,
  TradeOptionsText,
  Divider,
  ShippingDes,
  TouchableRow,
  ShippingOptionsText,
  FreeTagContainer,
  FreeTag,
  FreeShippingDes,
} from './styles';
import {
  DOLLOR_TEXT,
  USD_TEXT,
  RADIO_BUTTON_SELECTED,
  RADIO_BUTTON_UNSELECTED,
} from 'localsvgimages';

export const AddProductStepFive: FC<{}> = () => {
  const [price, setPrice] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const renderShippingView = () => {
    return (
      <HorizontalSpace>
        <Divider />
        <TradeOptionsText>Shipping</TradeOptionsText>
        <ShippingDes>
          This option only applies if someone buys your item, not for trades
          shipping will use USPS Priority service.
        </ShippingDes>
        <TouchableRow>
          <SvgXml xml={RADIO_BUTTON_SELECTED} />
          <ShippingOptionsText>Set Shipping Price</ShippingOptionsText>
        </TouchableRow>
        <TouchableRow>
          <SvgXml xml={RADIO_BUTTON_UNSELECTED} />
          <ShippingOptionsText>Provide Free Shipping</ShippingOptionsText>
          <FreeTagContainer>
            <FreeTag>Free</FreeTag>
          </FreeTagContainer>
        </TouchableRow>
        <FreeShippingDes>
          Pay shipping costs based on buyers location
        </FreeShippingDes>
      </HorizontalSpace>
    );
  };
  return (
    <Container>
      <HorizontalSpace>
        <TradeOptionsText>Price</TradeOptionsText>
      </HorizontalSpace>
      <LSInput
        onChangeText={setPrice}
        value={price}
        placeholder={'0.00'}
        horizontalSpace={20}
        topSpace={1}
        rightIcon={USD_TEXT}
        leftIcon={DOLLOR_TEXT}
      />
      {renderShippingView()}
      <HorizontalSpace>
        <TradeOptionsText>Shipping Cost</TradeOptionsText>
      </HorizontalSpace>
      <LSInput
        onChangeText={setShippingCost}
        value={shippingCost}
        placeholder={'0.00'}
        horizontalSpace={20}
        topSpace={1}
        rightIcon={USD_TEXT}
        leftIcon={DOLLOR_TEXT}
      />
    </Container>
  );
};

export default AddProductStepFive;
