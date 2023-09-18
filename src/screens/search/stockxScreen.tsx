/***
  LootSwap - StockxScreen
 ***/

import React, {FC, useState} from 'react';
import {
  Container,
  TitleText,
  MiddleContainer,
  ImageContainer,
  StockxImage,
  ProductDetailsContainer,
  SelectSizeText,
  SizeDropdownStyle,
  SelectedTextStyle,
  ItemTextStyle,
  SectionContainer,
  MarketRangeText,
  BottomContainer,
  BottomTitle,
  DataContainer,
  DataRowContainer,
  NumberDataText,
  DataLabelText,
} from './stockxScreenStyles';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {SvgXml} from 'react-native-svg';
import {ScrollView} from 'react-native';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {
  STOCKX_SEARCH_DROP_DOWN_ARROW,
  RIGHT_ARROW_DATA_ROW,
} from 'localsvgimages';

export const StockxScreen: FC<any> = ({route}) => {
  const {stockxProduct, foundProducts} = route.params;
  const [selectedSize, setSelectedSize] = useState(null);

  const calcMarketRange = (lastSale: number) => {
    if (!lastSale) {
      return ' ';
    }
    const startRange = Math.floor(lastSale - lastSale * 0.1);
    const endRange = Math.floor(lastSale + lastSale * 0.1);

    return `$${startRange} - $${endRange}`
  };

  return (
    <>
      <InStackHeader
        title={''}
        heartIconRight={true}
      />
      <Container>
        <ScrollView>
          <TitleText>{stockxProduct.name}</TitleText>
          <MiddleContainer>
            <ImageContainer>
              <StockxImage source={{uri: stockxProduct?.image}}/>
            </ImageContainer>
            <ProductDetailsContainer>
              <SectionContainer>
                <SelectSizeText>Select Size:</SelectSizeText>
                <Dropdown
                  style={[SizeDropdownStyle]}
                  selectedTextStyle={SelectedTextStyle}
                  placeholderStyle={SelectedTextStyle}
                  itemTextStyle={ItemTextStyle}
                  placeholder={'Select Size'}
                  labelField={'sizeUS'}
                  valueField={'sizeUS'}
                  onChange={item => setSelectedSize(item)}
                  data={stockxProduct.sizes}
                  value={selectedSize}
                  maxHeight={300}
                  renderRightIcon={() => <SvgXml xml={STOCKX_SEARCH_DROP_DOWN_ARROW} />}
                />
              </SectionContainer>
              <SectionContainer>
                <SelectSizeText>Estimated Market Value:</SelectSizeText>
                {!selectedSize && <MarketRangeText>...</MarketRangeText>}
                {selectedSize &&
                  <MarketRangeText>{calcMarketRange(selectedSize?.lastSale)}</MarketRangeText>
                }
              </SectionContainer>
            </ProductDetailsContainer>
          </MiddleContainer>
          <BottomContainer>
            <BottomTitle>Item data:</BottomTitle>
            <DataContainer>
              <DataRowContainer>
                <NumberDataText>2009</NumberDataText>
                <DataLabelText>
                  Public Offers
                  <SvgXml xml={RIGHT_ARROW_DATA_ROW} />
                </DataLabelText>
              </DataRowContainer>

              <DataRowContainer>
                <NumberDataText>{foundProducts?.length}</NumberDataText>
                <DataLabelText>
                  Has It
                  <SvgXml xml={RIGHT_ARROW_DATA_ROW} />
                </DataLabelText>
              </DataRowContainer>

              <DataRowContainer>
                <NumberDataText>2009</NumberDataText>
                <DataLabelText>
                  Traded It
                  <SvgXml xml={RIGHT_ARROW_DATA_ROW} />
                </DataLabelText>
              </DataRowContainer>
            </DataContainer>
            <LSButton
              title={'Create an offer'}
              size={Size.Full}
              type={Type.Primary}
              radius={20}
              onPress={() => console.log('busmi')}
            />
          </BottomContainer>
        </ScrollView>
      </Container>
    </>
  );
};

export default StockxScreen;
