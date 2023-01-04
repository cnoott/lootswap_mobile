/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  getSignedRequest,
  uploadFile,
} from '../../../services/imageUploadService';
import {
  Container,
  AddProductsList,
  ImageContainer,
  Image,
  PlusContainer,
  PlusSign,
  AddImageLabel,
  Touchable,
  DeleteContainer,
} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  LoadingRequest,
  LoadingSuccess,
} from '../../../redux/modules/loading/actions';
import {TRASH_WHITE_ICON} from 'localsvgimages';
import {ADD_PRODUCT_TYPE} from 'custom_types';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepThree: FC<ProductStep> = props => {
  const dispatch = useDispatch();
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const preFilledData =
    addProductData?.stepThree?.length > 0
      ? [...addProductData?.stepThree, 1]
      : [1];
  const [productImagesArr, setProductImagesArr] = useState<any>(preFilledData); // Always adding 1 element to show add images component at last
  const {updateProductData} = props;
  const updateImagesData = (newImages: Array<string>) => {
    updateProductData({
      ...addProductData,
      stepThree: newImages,
    });
  };
  const onAddImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      dispatch(LoadingRequest());
      const fileData = {
        ...image,
        type: image?.mime,
        uri:
          Platform.OS === 'android'
            ? image?.sourceURL
            : image?.sourceURL?.replace('file://', ''),
      };
      getSignedRequest(fileData)
        .then(signedReqData => {
          uploadFile(fileData, signedReqData?.signedRequest, signedReqData?.url)
            .then(url => {
              dispatch(LoadingSuccess());
              if (url) {
                const newArr = [url, ...productImagesArr];
                setProductImagesArr(newArr); // Local Update
                updateImagesData(newArr.slice(0, -1)); // Reducer Update
              }
            })
            .catch(() => {
              dispatch(LoadingSuccess());
            });
        })
        .catch(() => {
          dispatch(LoadingSuccess());
        });
    });
  };
  const onRemoveImage = (imageIndex: number) => {
    const newImgArr = [...productImagesArr];
    newImgArr.splice(imageIndex, 1);
    setProductImagesArr(newImgArr); // Local Update
    updateImagesData(newImgArr.slice(0, -1)); // Reducer Update
  };
  const renderAddImageContainer = () => {
    return (
      <Touchable activeOpacity={0.6} onPress={onAddImage}>
        <ImageContainer>
          <PlusContainer>
            <PlusSign>+</PlusSign>
          </PlusContainer>
          <AddImageLabel>+Add Images</AddImageLabel>
        </ImageContainer>
      </Touchable>
    );
  };
  const renderDeleteView = (imageIndex: number) => {
    return (
      <DeleteContainer onPress={() => onRemoveImage(imageIndex)}>
        <SvgXml xml={TRASH_WHITE_ICON} />
      </DeleteContainer>
    );
  };
  const renderProductImageContainer = ({item, index}: any) => {
    const isFooter = index + 1 === productImagesArr?.length;
    if (isFooter) {
      return renderAddImageContainer();
    }
    return (
      <ImageContainer key={index}>
        <Image source={{uri: item}} />
        {renderDeleteView(index)}
      </ImageContainer>
    );
  };
  return (
    <Container>
      <AddProductsList
        data={productImagesArr}
        renderItem={renderProductImageContainer}
        keyExtractor={item => item}
      />
    </Container>
  );
};

export default AddProductStepThree;
