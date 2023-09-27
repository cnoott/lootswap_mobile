import React, {FC} from 'react';
import ChosenStockxProduct from '../../components/loot/chosenStockxProduct';
import {
  StepContainer,
  ChosenStockxProductsFlatList,
} from './styles';

interface StepTwoProps {
  receivingStockxProducts: Array<any>;
}
// Show all the sizes

export const CreatePublicOfferStepTwo: FC<StepTwoProps> = props => {
  const {receivingStockxProducts = []} = props;


  const renderStockxProduct = ({item}: any) => {
    return (
      <ChosenStockxProduct
        stockxProduct={item}
        onDeletePress={() => {}}
        categoryData={[]}
        onSetSizeData={() => {}}
        chosenSize={{}}
        isFromPublicOffers={true}
      />
    );
  };

  return (
    <StepContainer>
      <ChosenStockxProductsFlatList
        data={receivingStockxProducts}
        renderItem={renderStockxProduct}
      />
    </StepContainer>
  );
};

export default CreatePublicOfferStepTwo;
