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
import FastImage from 'react-native-fast-image';

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
  selectedUrlKey: any;
}

//TODO: make sure the search can work more than once

export const StockxSearchResults: FC<StockxResultProps> = props => {
  const {
    searchResults = [],
    loading = true,
    onSelectResult,
    selectedUrlKey,
  } = props;

  const renderSearchResult = ({item, index}: any) => {
    return (
      <ItemContainer
        key={index}
        onPress={() => onSelectResult(item)}
        isSelected={selectedUrlKey === item?.urlKey}>
        <ImageContainer>
          <Image
            source={{uri: item.thumbUrl, priority: FastImage.priority.low}}
            resizeMode={FastImage.resizeMode.contain}
          />
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
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <ContainerTitle>Select Product</ContainerTitle>
        {!loading && searchResults.length === 0 && 'No products found'}
        {searchResults.map((item, index) => renderSearchResult({item, index}))}
      </Container>
      <LSLoader isVisible={loading} />
    </ScrollView>
  );
};
