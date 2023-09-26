import React, {FC} from 'react';
import {
  Container,
  ItemContainer,
  ImageContainer,
  Image,
  TextContainer,
  TitleText,
  DeleteButtonContainer,
  DeleteButtonText,
} from './chosenStockxProductStyles';
import FastImage from 'react-native-fast-image';
import LSDropDown from '../commonComponents/LSDropDown';

interface ChosenStockxProductProps {
  stockxProduct: any;
}

export const ChosenStockxProduct: FC<ChosenStockxProductProps> = props => {
  const {stockxProduct} = props;

  return (
    <Container>
      <ItemContainer>
        <ImageContainer>
          <Image
            source={{
              uri: stockxProduct.thumbUrl,
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </ImageContainer>
        <TextContainer>
          <TitleText>{stockxProduct.title}</TitleText>
        </TextContainer>
      </ItemContainer>
      <LSDropDown
        itemsList={[]}
        dropdownLabel={'Select Size'}
        isSearch={false}
        onSelectItem={() => {}}
        selectedValue={() => {}}
        onFocus={() => {}}
      />
      <DeleteButtonContainer>
        <DeleteButtonText>Delete</DeleteButtonText>
      </DeleteButtonContainer>
    </Container>
  );
};

export default ChosenStockxProduct;
