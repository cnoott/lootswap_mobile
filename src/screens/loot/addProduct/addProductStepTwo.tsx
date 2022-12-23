/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import {Container} from './styles';
import LSInput from '../../../components/commonComponents/LSInput';
import {useSelector} from 'react-redux';
import {HomeProps} from '../../../redux/modules/home/reducer';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepTwo: FC<ProductStep> = props => {
  const addProductData: HomeProps = useSelector(
    state => state?.home?.addProductData,
  );
  const [productName, setProductName] = useState('');
  const [productDes, setProductDes] = useState('');
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
