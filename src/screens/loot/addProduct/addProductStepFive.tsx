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
import {useSelector} from 'react-redux';
import {ADD_PRODUCT_TYPE} from 'custom_types';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepFive: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const {stepFive} = addProductData;
  const [price, setPrice] = useState(stepFive?.productPrice || 0.0);
  const [shippingCost, setShippingCost] = useState(
    stepFive?.shippingCost || 0.0,
  );
  const {updateProductData} = props;
  const onBlurCall = () => {
    updateProductData({
      ...addProductData,
      stepFive: {
        ...addProductData?.stepFive,
        productPrice: price,
        shippingCost: shippingCost,
      },
    });
  };
  const onButtonPress = (newData: any) => {
    updateProductData({
      ...addProductData,
      stepFive: {
        ...addProductData?.stepFive,
        ...newData,
      },
    });
  };
  const renderShippingView = () => {
    return (
      <HorizontalSpace>
        <Divider />
        <TradeOptionsText>Shipping</TradeOptionsText>
        <ShippingDes>
          This option only applies if someone buys your item, not for trades
          shipping will use USPS Priority service.
        </ShippingDes>
        <TouchableRow
          onPress={() =>
            onButtonPress({isShippingPrice: true, isFreeShipping: false})
          }>
          <SvgXml
            xml={
              stepFive?.isShippingPrice
                ? RADIO_BUTTON_SELECTED
                : RADIO_BUTTON_UNSELECTED
            }
          />
          <ShippingOptionsText>Set Shipping Price</ShippingOptionsText>
        </TouchableRow>
        <TouchableRow
          onPress={() =>
            onButtonPress({isFreeShipping: true, isShippingPrice: false})
          }>
          <SvgXml
            xml={
              stepFive?.isFreeShipping
                ? RADIO_BUTTON_SELECTED
                : RADIO_BUTTON_UNSELECTED
            }
          />
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
        defaultValue={String(price)}
        placeholder={'0.00'}
        horizontalSpace={20}
        topSpace={1}
        rightIcon={USD_TEXT}
        leftIcon={DOLLOR_TEXT}
        keyboardType={'numeric'}
        onBlurCall={onBlurCall}
      />
      {renderShippingView()}
      {!stepFive?.isFreeShipping && (
        <>
          <HorizontalSpace>
            <TradeOptionsText>Shipping Cost</TradeOptionsText>
          </HorizontalSpace>
          <LSInput
            onChangeText={setShippingCost}
            defaultValue={String(shippingCost)}
            placeholder={'0.00'}
            horizontalSpace={20}
            topSpace={1}
            rightIcon={USD_TEXT}
            leftIcon={DOLLOR_TEXT}
            keyboardType={'numeric'}
            onBlurCall={onBlurCall}
          />
        </>
      )}
    </Container>
  );
};

export default AddProductStepFive;
