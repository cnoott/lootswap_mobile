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
import LSLoader from '../../components/commonComponents/LSLoader';
import {ScrollView} from 'react-native';

interface SearchResult {
  imgUrl: String;
  name: String;
  sku: String;
  uuid: String;
}

interface StockxResultProps {
  searchResults: SearchResult[];
  loading: Boolean;
  onSelectResult: Function;
}

export const StockxSearchResults: FC<StockxResultProps> = props => {
  const {searchResults = [], loading = true, onSelectResult} = props;

  const renderSearchResult = ({item, index}: any) => {
    return (
      <ItemContainer key={index} onPress={() => onSelectResult(item)}>
        <ImageContainer>
          <Image source={{uri: item.thumbUrl}} />
        </ImageContainer>
        <TextContainer>
          <TitleText>{item.title}</TitleText>
          <BrandContainer>
            <BrandResultText>{item.brand}</BrandResultText>
          </BrandContainer>
        </TextContainer>
      </ItemContainer>
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <ContainerTitle>Select Product</ContainerTitle>
        {searchResults.map((item, index) => renderSearchResult({item, index}))}
      </Container>
      <LSLoader isVisible={loading} />
    </ScrollView>
  );
};
