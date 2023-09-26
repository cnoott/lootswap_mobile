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
import {getSizeList} from '../../utility/utility';

interface ChosenStockxProductProps {
  stockxProduct: any;
  onSetSizeData: Function;
  sizeData: any;
  onDeletePress: Function;
  categoryData: any;
}

export const ChosenStockxProduct: FC<ChosenStockxProductProps> = props => {
  const {
    stockxProduct,
    onSetSizeData = () => {},
    sizeData,
    onDeletePress = () => {},
    categoryData,
  } = props;

  const handleSetSizeList = () => {
    if (stockxProduct) {
      const {title} = stockxProduct;
      if (stockxProduct.title.includes('Women')) {
        return 'womens';
      } else if (title.includes('GS')) {
        return 'gs';
      } else if (title?.includes('TD')) {
        return 'td';
      } else if (title?.includes('PS')) {
        return 'ps';
      } else if (
        title?.includes('Kids') ||
        title?.includes('Infants')
      ) {
        return 'kids';
      }
      return categoryData?.value;
    } else {
      return categoryData?.value;
    }
  };


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
        itemsList={getSizeList(handleSetSizeList())}
        dropdownLabel={'Select Size'}
        isSearch={false}
        onSelectItem={onSetSizeData}
        selectedValue={sizeData}
      />
      <DeleteButtonContainer onPress={onDeletePress}>
        <DeleteButtonText>Delete</DeleteButtonText>
      </DeleteButtonContainer>
    </Container>
  );
};

export default ChosenStockxProduct;
