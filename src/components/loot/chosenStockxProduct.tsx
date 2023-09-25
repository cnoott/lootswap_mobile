import React, {FC} from 'react';
import {
  ItemContainer,
  ImageContainer,
  Image,
  TextContainer,
  TitleText,
} from './chosenStockxProductStyles';
import FastImage from 'react-native-fast-image';
import LSDropDown from '../commonComponents/LSDropDown';

interface ChosenStockxProductProps {
  stockxProduct: any;
}

export const ChosenStockxProduct: FC<ChosenStockxProductProps> = props => {
  const {stockxProduct} = props;

  return (
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
        <TitleText>stockxProduct.title</TitleText>
        <LSDropDown
          itemsList={[]}
          dropdownLabel={'Select'}
          isSearch={false}
          onSelectItem={() => {}}
          selectedValue={() => {}}
          onFocus={() => {}}
        />
      </TextContainer>
    </ItemContainer>
  );
};

export default ChosenStockxProduct;
