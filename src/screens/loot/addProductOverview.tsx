/***
LootSwap - Add PRODUCT OVERVIEW SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {
  Container,
  SubContainer,
  ProductNameLabel,
  ProductNameContainer,
  ProductBrandLabel,
  SubHeaderText,
  DesText,
  Divider,
} from './addProductOverviewStyles';

export const AddProductOverviewScreen: FC<{}> = () => {
  const renderProductNameView = () => {
    return (
      <ProductNameContainer>
        <ProductNameLabel>Puma Shoes X50</ProductNameLabel>
        <ProductBrandLabel>Nike</ProductBrandLabel>
      </ProductNameContainer>
    );
  };
  const renderDescriptionView = () => {
    return (
      <>
        <SubHeaderText>Description</SubHeaderText>
        <DesText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum
          suscipit dui, at congue magna interdum id. Mauris tristique libero
          quis elit pulvinar...
        </DesText>
      </>
    );
  };
  const renderProductImagesView = () => {
    return (
      <>
        <SubHeaderText>Product Images</SubHeaderText>
      </>
    );
  };
  return (
    <Container>
      <InStackHeader back={true} title={'Overview'} />
      <SubContainer>
        {renderProductNameView()}
        {renderDescriptionView()}
        <Divider />
        {renderProductImagesView()}
      </SubContainer>
    </Container>
  );
};

export default AddProductOverviewScreen;
