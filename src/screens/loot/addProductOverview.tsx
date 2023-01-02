/***
LootSwap - Add PRODUCT OVERVIEW SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';
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
import {HomeProps} from '../../redux/modules/home/reducer';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getSelectedTradeData} from '../../utility/utility'; //createNewProduct
import {createNewProduct} from '../../redux/modules';

export const AddProductOverviewScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const homeData: HomeProps = useSelector(state => state?.home);
  const auth: AuthProps = useSelector(state => state.auth);
  const {addProductData} = homeData;
  const {userData} = auth;
  const {stepOne, stepTwo, stepThree, stepFour, stepFive} = addProductData;
  const tradeData = getSelectedTradeData(stepFour?.tradeOptions);
  console.log('addProductData ====', addProductData);
  const addProduct = () => {
    const images = stepThree?.map((_img: string) => {
      const _data = {
        src: _img,
      };
      return _data;
    });
    const reqData = {
      name: stepTwo?.productName,
      userId: userData?._id,
      description: stepTwo?.productDescription,
      condition: stepOne?.condition?.value,
      size: stepOne?.size?.value,
      brand: stepOne?.brand?.value,
      interestedIn: '',
      price: stepFive?.productPrice,
      who_pays: 'buyer-pays',
      sellerShippingCost: stepFive?.shippingCost,
      category: stepOne?.category?.value,
      type: tradeData?.value,
      photos: images || [],
    };
    console.log('reqData for add product ===', reqData);
    dispatch(createNewProduct(reqData));
  };
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
          {!!subLabel && <SubInfoText>{subLabel}</SubInfoText>}
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
          <ProductNameLabel>{stepTwo?.productName}</ProductNameLabel>
          <ProductBrandLabel>{stepOne?.brand?.label}</ProductBrandLabel>
        </ProductNameContainer>
      </>
    );
  };
  const renderDescriptionView = () => {
    return (
      <>
        <SubHeaderText>Description</SubHeaderText>
        <DesText numberOfLines={3}>{stepTwo?.productDescription}</DesText>
      </>
    );
  };
  const renderImageView = ({item}: any) => {
    return (
      <ImageContainer>
        <Image source={{uri: item}} />
      </ImageContainer>
    );
  };
  const renderProductImagesView = () => {
    return (
      <>
        {renderSectionHeader(
          'Product Images',
          `${stepThree?.length} of 13 Images`,
        )}
        <FlatList data={stepThree} renderItem={renderImageView} />
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
        {renderSubProductInfo('Category', `${stepOne?.category?.label}`)}
        {renderSubProductInfo('Size', `${stepOne?.size?.label}`)}
        {renderSubProductInfo('Condition', `${stepOne?.condition?.label}`)}
        {renderSubProductInfo('Brand/Designer', `${stepOne?.brand?.label}`)}
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
        <RowView>{renderTradeButton(tradeData?.label, true)}</RowView>
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
            <DetailsText>$ {stepFive?.productPrice}</DetailsText>
          </RowSpaceView>
          <RowSpaceView>
            <SubInfoText>Shipping Cost</SubInfoText>
            <DetailsText>+$ {stepFive?.shippingCost}</DetailsText>
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
        {stepThree?.length > 0 && renderProductImagesView()}
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
          onPress={addProduct}
        />
      </SubContainer>
    </Container>
  );
};

export default AddProductOverviewScreen;
