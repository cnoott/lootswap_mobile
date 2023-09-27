import React, {FC} from 'react';
import ChosenStockxProduct from '../../components/loot/chosenStockxProduct';
import {
  StepContainer,
  ChosenStockxProductsFlatList,
  TopButtonContainer,
} from './styles';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';

interface StepTwoProps {
  receivingStockxProducts: Array<any>;
  handleAddAnotherItem: Function;
  handleSelectSize: Function;
}
// Show all the sizes

export const CreatePublicOfferStepTwo: FC<StepTwoProps> = props => {
  const {
    receivingStockxProducts = [],
    handleAddAnotherItem = () => {},
    handleSelectSize = () => {},
  } = props;


  const renderStockxProduct = ({item}: any) => {
    return (
      <ChosenStockxProduct
        stockxProduct={item}
        onDeletePress={() => {}}
        categoryData={null}
        onSetSizeData={size => handleSelectSize(item.urlKey, size)}
        chosenSize={item?.chosenSize}
        isFromPublicOffers={true}
      />
    );
  };

  return (
    <StepContainer>
      <TopButtonContainer>
        <LSButton
          title={'+ Add Another Item'}
          size={Size.Full}
          type={Type.Primary}
          radius={20}
          onPress={handleAddAnotherItem}
        />
      </TopButtonContainer>
      <ChosenStockxProductsFlatList
        data={receivingStockxProducts}
        renderItem={renderStockxProduct}
      />
    </StepContainer>
  );
};

export default CreatePublicOfferStepTwo;
