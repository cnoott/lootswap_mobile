/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import {Container} from './styles';
import LSInput from '../../../components/commonComponents/LSInput';
import {useSelector} from 'react-redux';
import {ADD_PRODUCT_TYPE} from 'custom_types';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepTwo: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const [productName, setProductName] = useState(
    addProductData?.stepTwo?.productName || '',
  );
  const [productDes, setProductDes] = useState(
    addProductData?.stepTwo?.productDescription || '',
  );
  const {updateProductData} = props;
  const onBlurCall = () => {
    updateProductData({
      ...addProductData,
      stepTwo: {
        productName: productName,
        productDescription: productDes,
      },
    });
  };
  return (
    <Container>
      <LSInput
        onChangeText={setProductName}
        value={productName}
        placeholder={'Product Name'}
        onBlurCall={onBlurCall}
      />
      <LSInput
        onChangeText={setProductDes}
        value={productDes}
        placeholder={'Description'}
        multiline={true}
        height={200}
        onBlurCall={onBlurCall}
      />
    </Container>
  );
};

export default AddProductStepTwo;
