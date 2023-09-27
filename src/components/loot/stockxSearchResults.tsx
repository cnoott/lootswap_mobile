import React, {FC, useEffect, useState} from 'react';
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
  TitleContainer,
} from './stockxSearchResultsStyles';
import {ScrollView, Animated, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import Tooltip from '../../components/tooltip/tooltip';
import {SvgXml} from 'react-native-svg';
import {QUESTION_MARK} from 'localsvgimages';


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
  productName?: string;
  showTitle?: Boolean;
}

export const StockxSearchResults: FC<StockxResultProps> = props => {
  const {
    searchResults = [],
      onSelectResult,
    loading = true,
      selectedUrlKey,
    productName = '',
      showTitle = true
  } = props;

  const [opacity] = useState(new Animated.Value(1)); // Initial value for opacity: 1

  useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    const loop = Animated.loop(blink);
    loop.start();

    return () => loop.stop();
  }, []);

  const BlinkingText = () => {
    return (
      <Animated.View
        style={{
          width: 150,
          height: 12,
          borderRadius: 20,
          backgroundColor: 'grey',
          opacity,
        }}
      />
    );
  };
  const BlinkingBrandText = () => {
    return (
      <Animated.View
        style={{
          width: 110,
          height: 11,
          borderRadius: 20,
          backgroundColor: 'darkgrey',
          opacity,
        }}
      />
    );
  };


  const BlinkingImage = () => {
    return (
      <Animated.View
        style={{
          width: 40,
          height: 40,
          borderRadius: 5,
          backgroundColor: 'lightgrey',
          opacity,
        }}
      />
    );
  };

  const renderSearchResult = ({item, index}: any) => {
    return (
      <ItemContainer
        key={index}
        onPress={() => onSelectResult(item)}
        isSelected={selectedUrlKey === item?.urlKey}>
        <ImageContainer>
          {loading ? (
            <BlinkingImage/>
          ) : (
            <>
              {item.thumbUrl ? (
                <Image
                  source={{uri: item.thumbUrl, priority: FastImage.priority.low}}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : (
                <SvgXml xml={QUESTION_MARK} width={'90%'}/>
              )}
            </>
          )}
        </ImageContainer>
        <TextContainer>
          <TitleText>{loading ? <BlinkingText/> : item?.title}</TitleText>
          <BrandContainer>
            {loading && <BlinkingBrandText />}<BrandText>{item?.subTitle && `${item.subTitle}`}</BrandText>
          </BrandContainer>
        </TextContainer>
      </ItemContainer>
    );
  };

  const renderSearchResults = () => {
    let data;
    if (showTitle) {
      data = [
        ...searchResults,
        {
          urlKey: null,
          thumbUrl: '',
          title: 'My item is not here',
          subTitle: `Add new item "${productName}"`,
        },
      ];
    } else {
      data = [...searchResults];
    }
    return (
      <FlatList
        data={data}
        renderItem={renderSearchResult}
        keyExtractor={item => item.urlKey}
        showsVerticalScrollIndicator={true}
      />
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{flexGrow: 1}}>
      <Container>
        {showTitle && (
          <TitleContainer>
            <ContainerTitle>Select Product</ContainerTitle>
            <Tooltip
              text={
                'By selecting one of the products in the dropdown, you link your listing to our real-time market price database. This will help you better price your item, as well as prevent others from sending you unfair offers.'
              }
            />
          </TitleContainer>
        )}
        {renderSearchResults()}
      </Container>
    </ScrollView>
  );
};
