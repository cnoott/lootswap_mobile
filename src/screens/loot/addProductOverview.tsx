/***
LootSwap - Add PRODUCT OVERVIEW SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type, Who_Pays_Options} from 'custom_enums';
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
import {LoadingRequest} from '../../redux/modules/loading/actions';
import {getSelectedTradeData} from '../../utility/utility';
import {createNewProduct} from '../../redux/modules';
import {getSignedRequest, uploadFile} from '../../services/imageUploadService';

export const AddProductOverviewScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const homeData: HomeProps = useSelector(state => state?.home);
  const auth: AuthProps = useSelector(state => state.auth);
  const {addProductData} = homeData;
  const {userData} = auth;
  const {stepOne, stepTwo, stepThree, stepFour, stepFive} = addProductData;
  const {isFromEdit = false, productId} = route?.params || {};
  const tradeData = getSelectedTradeData(stepFour?.tradeOptions);

  const getUploadedImages = (imagesArr: any) => {
    const promises = imagesArr.map(async (myValue: any) => {
      if (myValue?.isServerImage) {
        return myValue;
      }
      const urlUpdated = await new Promise(async resolve => {
        await getSignedRequest(myValue)
          .then(signedReqData => {
            uploadFile(
              myValue,
              signedReqData?.signedRequest,
              signedReqData?.url,
            )
              .then(url => {
                if (url) {
                  resolve(url);
                }
              })
              .catch(err => {
                console.log('Error 111 ====', err);
              });
          })
          .catch(err => {
            console.log('Error 222 ====', err);
          });
      });
      return {sourceURL: urlUpdated, isServerImage: true};
    });
    return Promise.all(promises);
  };

  const addProduct = async (isUpdateCall: boolean = false) => {
    dispatch(LoadingRequest());
    const newArr = await getUploadedImages([...stepThree]);
    const images = newArr?.map((_img: any) => {
      const _data = {
        src: _img?.sourceURL,
      };
      return _data;
    });
    const reqData: any = {
      name: stepTwo?.productName,
      userId: userData?._id,
      description: stepTwo?.productDescription,
      condition: stepOne?.condition?.value,
      size: stepOne?.size?.value,
      brand: stepOne?.brand?.value,
      interestedIn: '',
      price: stepFive?.productPrice,
      who_pays: stepFive?.isFreeShipping
        ? Who_Pays_Options?.SellerPays
        : Who_Pays_Options?.BuyerPays,
      sellerShippingCost: stepFive?.shippingCost,
      category: stepOne?.category?.value,
      type: tradeData?.value,
      photos: images || [],
    };
    if (isUpdateCall) {
      reqData.productIdToUpdate = productId;
    }
    dispatch(
      createNewProduct(reqData, isUpdateCall, () => {
        navigation?.navigate('ListLootSuccessScreen');
      }),
    );
  };
  const onBackCall = () => {
    if (isFromEdit) {
      navigation.goBack();
    } else {
      if (stepFour?.tradeOptions?.isTradeOnly) {
        navigation.goBack();
      } else {
        navigation.navigate('LootScreen', {
          isFromEdit: false,
          editIndex: 0,
          isLootEdit: false,
        });
      }
    }
  };
  const renderEditButton = (index: Number) => {
    return (
      <EditButtonContainer>
        <FullTouchable
          onPress={() =>
            navigation.navigate('LootScreen', {
              isFromEdit: true,
              editIndex: index,
              isLootEdit: isFromEdit,
            })
          }>
          <SvgXml xml={PRODUCT_EDIT_PRIMARY} />
          <EditLabel>Edit</EditLabel>
        </FullTouchable>
      </EditButtonContainer>
    );
  };
  const renderSectionHeader = (
    label: string,
    subLabel?: string,
    editIndex?: Number,
  ) => {
    return (
      <SectionHeaderContainer>
        <EmptyView>
          <SubHeaderText>{label}</SubHeaderText>
          {!!subLabel && <SubInfoText>{subLabel}</SubInfoText>}
        </EmptyView>
        {renderEditButton(editIndex)}
      </SectionHeaderContainer>
    );
  };
  const renderProductNameView = () => {
    return (
      <>
        {renderSectionHeader('Basic Info', false, 2)}
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
        <Image source={{uri: item?.sourceURL}} />
      </ImageContainer>
    );
  };
  const renderProductImagesView = () => {
    return (
      <>
        {renderSectionHeader(
          'Product Images',
          `${stepThree?.length} of 13 Images`,
          3,
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
        {renderSectionHeader('Product Type', false, 1)}
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
        {renderSectionHeader('Trade Type', false, 4)}
        <RowView>{renderTradeButton(tradeData?.label, true)}</RowView>
      </>
    );
  };
  const renderProductPriceView = () => {
    return (
      <>
        {renderSectionHeader('Product Price', false, 5)}
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
      <InStackHeader back={true} title={'Overview'} onBackCall={onBackCall} />
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
        {!stepFour?.tradeOptions?.isTradeOnly && renderProductPriceView()}
        <TopSpace />
        <TopSpace />
        <LSButton
          title={isFromEdit ? 'Update' : 'Publish Now'}
          size={Size.Full}
          type={Type.Primary}
          radius={20}
          onPress={() => addProduct(isFromEdit)}
        />
      </SubContainer>
    </Container>
  );
};

export default AddProductOverviewScreen;
