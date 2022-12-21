/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC} from 'react';
import {Container, AddProductsList, ImageContainer} from './styles';

export const AddProductStepThree: FC<{}> = () => {
  const renderProductImageContainer = () => {
    return (
      <ImageContainer>
        {/* <Image source={{uri: 'https://picsum.photos/id/237/200/300'}} /> */}
      </ImageContainer>
    );
  };
  return (
    <Container>
      <AddProductsList
        data={[...new Array(5).keys()]}
        renderItem={renderProductImageContainer}
        keyExtractor={item => item}
      />
    </Container>
  );
};

export default AddProductStepThree;
