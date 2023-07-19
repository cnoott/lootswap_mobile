import React, {FC} from 'react';
import {
  Container,
  ImageContainer,
  ContainerTitle,
  Image,
  ItemContainer,
  TextContainer,
  TitleText,
  BrandContainer,
  BrandText,
  BrandResultText,
} from './stockxSearchResultsStyles';
import {ScrollView} from 'react-native';

interface SearchResult {
  imgUrl: String;
  name: String;
  sku: String;
  uuid: String;
}

interface StockxResultProps {
  searchResults: SearchResult[];
}

export const StockxSearchResults: FC<StockxResultProps> = props => {

  const renderSerachResult = () => {
    return (
      <ItemContainer>
        <ImageContainer>
          <Image source={{uri: 'https://images.stockx.com/images/Nike-Kobe-4-Protro-Gigi-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=100&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1683627203'}}/>
        </ImageContainer>
        <TextContainer>
          <TitleText> Nike Kobe 4 Protro Mambacita Gigi</TitleText>
          <BrandContainer>
            <BrandResultText> Nike </BrandResultText>
          </BrandContainer>
        </TextContainer>

      </ItemContainer>
    );
  };

  return (
    <>
      <ScrollView>
    <Container>
      <ContainerTitle>Select Product</ContainerTitle>
        {renderSerachResult()}
        {renderSerachResult()}
        {renderSerachResult()}
        {renderSerachResult()}
    </Container>
      </ScrollView>
      </>
  );
};
