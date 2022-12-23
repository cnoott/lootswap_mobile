/***
LootSwap - Add PRODUCT OVERVIEW SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {SvgXml} from 'react-native-svg';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  Container,
  SubContainer,
  ProductNameLabel,
  ProductNameContainer,
  ProductBrandLabel,
  SubHeaderText,
  DesText,
  Divider,
  EditButtonContainer,
  SectionHeaderContainer,
  FullTouchable,
  EditLabel,
  SubInfoText,
  EmptyView,
  DetailsText,
  SubDetailsContainer,
  TopSpace,
  FlatList,
  ImageContainer,
  Image,
  TradeButton,
  TradeButtonText,
  RowView,
  RowSpaceView,
} from './addProductOverviewStyles';
import {PRODUCT_EDIT_PRIMARY} from 'localsvgimages';

export const AddProductOverviewScreen: FC<{}> = () => {
  const renderEditButton = () => {
    return (
      <EditButtonContainer>
        <FullTouchable>
          <SvgXml xml={PRODUCT_EDIT_PRIMARY} />
          <EditLabel>Edit</EditLabel>
        </FullTouchable>
      </EditButtonContainer>
    );
  };
  const renderSectionHeader = (label: string, subLabel?: string) => {
    return (
      <SectionHeaderContainer>
        <EmptyView>
          <SubHeaderText>{label}</SubHeaderText>
          {!!subLabel && <SubInfoText>7 of 13 Images</SubInfoText>}
        </EmptyView>
        {renderEditButton()}
      </SectionHeaderContainer>
    );
  };
  const renderProductNameView = () => {
    return (
      <>
        {renderSectionHeader('Basic Info')}
        <ProductNameContainer>
          <ProductNameLabel>Puma Shoes X50</ProductNameLabel>
          <ProductBrandLabel>Nike</ProductBrandLabel>
        </ProductNameContainer>
      </>
    );
  };
  const renderDescriptionView = () => {
    return (
      <>
        <SubHeaderText>Description</SubHeaderText>
        <DesText numberOfLines={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum
          suscipit dui, at congue magna interdum id. Mauris tristique libero
          quis elit pulvinar...
        </DesText>
      </>
    );
  };
  const renderImageView = () => {
    return (
      <ImageContainer>
        <Image source={{uri: 'https://picsum.photos/200'}} />
      </ImageContainer>
    );
  };
  const renderProductImagesView = () => {
    return (
      <>
        {renderSectionHeader('Product Images', '7 of 13 Images')}
        <FlatList
          data={[...new Array(6).keys()]}
          renderItem={renderImageView}
        />
      </>
    );
  };
  const renderSubProductInfo = (catagory: string, detail: string) => {
    return (
      <SubDetailsContainer>
        <SubInfoText>{catagory}</SubInfoText>
        <DetailsText>{detail}</DetailsText>
      </SubDetailsContainer>
    );
  };
  const renderProductTypeView = () => {
    return (
      <>
        {renderSectionHeader('Product Type')}
        {renderSubProductInfo('Category', 'Means wear > Sports > Shoes')}
        {renderSubProductInfo('Size', '15 UK')}
        {renderSubProductInfo('Condition', 'Very Worn')}
        {renderSubProductInfo('Brand/Designer', 'Nike')}
      </>
    );
  };
  const renderTradeButton = (label: string, isSelected: boolean) => {
    return (
      <TradeButton selected={isSelected}>
        <TradeButtonText selected={isSelected}>{label}</TradeButtonText>
      </TradeButton>
    );
  };
  const renderTradeTypeView = () => {
    return (
      <>
        {renderSectionHeader('Trade Type')}
        <RowView>
          {renderTradeButton('Trade Only', true)}
          {renderTradeButton('Sell Only', false)}
        </RowView>
      </>
    );
  };
  const renderProductPriceView = () => {
    return (
      <>
        {renderSectionHeader('Product Price')}
        <ProductNameContainer>
          <RowSpaceView>
            <SubInfoText>Price</SubInfoText>
            <DetailsText>$ 499.00</DetailsText>
          </RowSpaceView>
          <RowSpaceView>
            <SubInfoText>Shipping Cost</SubInfoText>
            <DetailsText>+$ 20.00</DetailsText>
          </RowSpaceView>
        </ProductNameContainer>
      </>
    );
  };
  return (
    <Container>
      <InStackHeader back={true} title={'Overview'} />
      <SubContainer>
        {renderProductNameView()}
        <TopSpace />
        {renderDescriptionView()}
        <Divider />
        {renderProductImagesView()}
        <Divider />
        {renderProductTypeView()}
        <Divider />
        {renderTradeTypeView()}
        <Divider />
        {renderProductPriceView()}
        <TopSpace />
        <TopSpace />
        <LSButton
          title={'Publish Now'}
          size={Size.Full}
          type={Type.Primary}
          radius={20}
          onPress={() => {}}
        />
      </SubContainer>
    </Container>
  );
};

export default AddProductOverviewScreen;
