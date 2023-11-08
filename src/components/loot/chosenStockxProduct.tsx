import React, {FC} from 'react';
import {
  Container,
  ItemContainer,
  ImageContainer,
  SvgContainer,
  Image,
  TextContainer,
  TitleText,
  DeleteButtonContainer,
  DeleteButtonText,
  TrashIconContainer,
} from './chosenStockxProductStyles';
import FastImage from 'react-native-fast-image';
import LSDropDown from '../commonComponents/LSDropDown';
import {getSizeList, shoesSizeList} from '../../utility/utility';
import {SvgXml} from 'react-native-svg';
import {QUESTION_MARK, TRASH_ICON_RED} from 'localsvgimages';
import {Alert} from 'custom_top_alert';

interface ChosenStockxProductProps {
  stockxProduct: any;
  onSetSizeData: Function;
  chosenSize: any;
  onDeletePress: Function;
  categoryData: any;
  productName: string;
  isFromPublicOffers: Boolean;
}
// We have to have a "isFromPublicOffers" bool because the data
// that comes from the add loot and the data that comes from public
// offers is in a different format

export const ChosenStockxProduct: FC<ChosenStockxProductProps> = props => {
  const {
    stockxProduct,
    onSetSizeData = () => {},
    chosenSize,
    onDeletePress = () => {},
    categoryData,
    productName = '',
    isFromPublicOffers = false,
  } = props;


  const formatData = () => {
    if (isFromPublicOffers) {
      return stockxProduct;
    } else {
      return {
        name: stockxProduct.title,
        image: stockxProduct.thumbUrl,
      };
    }
  };

  const formatSizeList = () => {
    console.log(stockxProduct?.sizes);
    return stockxProduct?.sizes?.map(size => ({
      label: size.sizeUS,
      value: size.sizeUS,
    }));
  };

  const handleSetSizeList = () => {
    const name = formatData().name;

    if (stockxProduct) {
      if (name?.includes('Women')) {
        return 'womens';
      } else if (name?.includes('GS')) {
        return 'gs';
      } else if (name?.includes('TD')) {
        return 'td';
      } else if (name?.includes('PS')) {
        return 'ps';
      } else if (
        name?.includes('Kids') ||
        name?.includes('Infants')
      ) {
        return 'kids';
      }
      if (categoryData) {
        return categoryData?.value;
      }
    } else {
      return categoryData?.value;
    }
  };

  const handleOnPress = () => {
    if (!isFromPublicOffers && !categoryData.value) {
      Alert.showError('Please select a category');
    }
  };

  return (
    <Container>
      <ItemContainer>
        <>
          {formatData().image ? (
            <ImageContainer>
              <Image
                source={{
                  uri: formatData().image,
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </ImageContainer>
          ) : (
            <SvgContainer>
              <SvgXml xml={QUESTION_MARK} width={'100%'}/>
            </SvgContainer>
          )}
        </>

        <TextContainer>
          <TitleText>
            {formatData().image ? formatData().name : productName}
          </TitleText>
          <TitleText></TitleText>
        </TextContainer>

      </ItemContainer>
      <LSDropDown
        itemsList={isFromPublicOffers ? formatSizeList() : getSizeList(handleSetSizeList())}
        dropdownLabel={'Select Size'}
        isSearch={false}
        onSelectItem={onSetSizeData}
        selectedValue={chosenSize}
        onFocus={() => handleOnPress()}
      />
      <TrashIconContainer onPress={onDeletePress}>
        <SvgXml xml={TRASH_ICON_RED}/>
      </TrashIconContainer>
    </Container>
  );
};

export default ChosenStockxProduct;
