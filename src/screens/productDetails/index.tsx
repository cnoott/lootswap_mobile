/***
  LootSwap - PRODUCT DETAILS SCREEN
 ***/

import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import CarouselComponent from '../../components/Carousel';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {
  Container,
  SubContainer,
  TopSpace,
  GoBackContainer,
  GoBackText,
  ProductLabel,
  ProductDetails,
  PriceLabel,
  TagsContainer,
  TagView,
  TagLabel,
  BottomSpace,
} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {LEFT_PRIMARY_ARROW} from 'localsvgimages';

const height = Dimensions.get('window').height;
const tagList = [
  {
    label: 'Trade',
    labelColor: '#0a0a0a',
    backColor: '#f2ed63',
  },
  {
    label: 'Ship',
    labelColor: '#0a0a0a',
    backColor: '#50b4d9',
  },
];

export const ProductDetailsScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const renderGoBackView = () => {
    return (
      <GoBackContainer onPress={() => navigation.goBack()}>
        <SvgXml xml={LEFT_PRIMARY_ARROW} />
        <GoBackText>Go Back</GoBackText>
      </GoBackContainer>
    );
  };
  const renderTags = () => {
    return (
      <TagsContainer>
        {tagList?.map(tag => {
          return (
            <TagView backColor={tag?.backColor}>
              <TagLabel tagColor={tag?.labelColor}>{tag?.label}</TagLabel>
            </TagView>
          );
        })}
      </TagsContainer>
    );
  };
  const renderButtons = () => {
    return (
      <TopSpace>
        <LSButton
          title={'Buy Now'}
          size={Size.Large}
          type={Type.Primary}
          onPress={() => {}}
        />
        <TopSpace />
        <LSButton
          title={'Send Offer'}
          size={Size.Large}
          type={Type.Secondary}
          onPress={() => {}}
        />
      </TopSpace>
    );
  };
  return (
    <Container>
      <InHomeHeader />
      <TopSpace />
      <CarouselComponent height={height / 2 + 40} isProduct={true} />
      <SubContainer>
        {renderGoBackView()}
        <ProductLabel>Adidas</ProductLabel>
        {renderTags()}
        <ProductDetails>yeezy 350</ProductDetails>
        <ProductDetails>Size: 10</ProductDetails>
        <ProductDetails>Condition: New without box</ProductDetails>
        <PriceLabel>$200</PriceLabel>
        {renderButtons()}
        <BottomSpace />
      </SubContainer>
    </Container>
  );
};

export default ProductDetailsScreen;
