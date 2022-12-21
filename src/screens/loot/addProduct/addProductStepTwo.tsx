/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import {Container} from './styles';
import LSInput from '../../../components/commonComponents/LSInput';

export const AddProductStepTwo: FC<{}> = () => {
  const [productName, setProductName] = useState('');
  const [productDes, setProductDes] = useState('');
  return (
    <Container>
      <LSInput
        onChangeText={setProductName}
        value={productName}
        placeholder={'Product Name'}
      />
      <LSInput
        onChangeText={setProductDes}
        value={productDes}
        placeholder={'Description'}
        multiline={true}
        height={200}
      />
    </Container>
  );
};

export default AddProductStepTwo;
