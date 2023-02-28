/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform, Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import {
  ImagesContainer,
  AddProductsList,
  ImageContainerUpload,
  ImageContainerNew,
  ImageUpload,
  PlusContainer,
  PlusSign,
  AddImageLabel,
  AddImageSubText,
  Touchable,
  DeleteContainer,
  CellIndexContainer,
  IndexLabel,
} from './styles';
import {useSelector} from 'react-redux';
import {TRASH_WHITE_ICON} from 'localsvgimages';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {Alert} from 'custom_top_alert';
import {scale} from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const productImageWidth = width / 3 - 30;

interface ProductStep {
  updateProductData: Function;
}

const imageLastItem = {
  key: 'last',
  disabledDrag: true,
  disabledReSorted: true,
};

export const AddProductStepThree: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const preFilledData =
    addProductData?.stepThree?.length > 0
      ? [...addProductData?.stepThree, imageLastItem]
      : [imageLastItem];
  const [productImagesArr, setProductImagesArr] = useState<any>(preFilledData); // Always adding 1 element to show add images component at last
  const [enableScroll, setEnableScroll] = useState(true);
  const {updateProductData} = props;
  const updateImagesData = (newImages: Array<string>) => {
    updateProductData({
      ...addProductData,
      stepThree: newImages,
    });
  };
  /**
   * You can add Min 2 & Max 13 images
   */
  const onAddImage = () => {
    if (productImagesArr?.length < 14) {
      // Checking for 1 extra due to footer component
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        compressImageMaxHeight: 1200,
        compressImageQuality: 0.1,
        cropping: true,
        multiple: true,
        maxFiles: 14 - productImagesArr?.length, // At first you can select 13 images & will reduce if selected some images already
      }).then(images => {
        if (images?.length > 0) {
          const oldImagesData = [...productImagesArr];
          images?.map(imgData => {
            imgData.sourceURL = 'file://' + imgData.path;
            const fileData = {
              ...imgData,
              type: imgData?.mime,
              uri:
                Platform.OS === 'android'
                  ? imgData?.sourceURL
                  : imgData?.sourceURL?.replace('file://', ''),
              sourceURL: imgData?.sourceURL,
              isServerImage: false,
              key: `${Math.random() * 100}`,
            };
            oldImagesData?.unshift(fileData);
          });
          const newArr = [...oldImagesData];
          setProductImagesArr(newArr);
          updateImagesData(newArr.slice(0, -1));
        }
      });
    } else {
      Alert.showError('Maximum images added');
    }
  };
  const onRemoveImage = (imageIndex: number) => {
    const newImgArr = [...productImagesArr];
    newImgArr.splice(imageIndex, 1);
    setProductImagesArr(newImgArr); // Local Update
    updateImagesData(newImgArr.slice(0, -1)); // Reducer Update
  };
  const renderAddImageContainer = () => {
    return (
      <Touchable activeOpacity={0.6} onPress={onAddImage} disabledDrag={true}>
        <ImageContainerNew>
          <PlusContainer>
            <PlusSign>+</PlusSign>
          </PlusContainer>
          <AddImageLabel>+Add Images</AddImageLabel>
          <AddImageSubText>Hold & drag to reorder.</AddImageSubText>
        </ImageContainerNew>
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
  const renderNumberView = (imageIndex: number) => {
    return (
      <CellIndexContainer>
        <IndexLabel>{imageIndex}</IndexLabel>
      </CellIndexContainer>
    );
  };
  const renderProductImageContainer = (item: any, order: number) => {
    const isFooter = order + 1 === productImagesArr?.length;
    if (isFooter) {
      return renderAddImageContainer();
    }
    return (
      <ImageContainerUpload key={item?.key}>
        <ImageUpload
          source={{uri: item?.sourceURL, priority: FastImage.priority.high}}
        />
        {renderDeleteView(0)}
        {renderNumberView(order + 1)}
      </ImageContainerUpload>
    );
  };
  return (
    <ImagesContainer enableScroll={enableScroll}>
      <AddProductsList
        data={productImagesArr}
        renderItem={renderProductImageContainer}
        onDragging={() => setEnableScroll(false)}
        onDragRelease={data => {
          setProductImagesArr(data);
          updateImagesData(data?.slice(0, -1)); // Updating Reducer Data
          setEnableScroll(true);
        }}
        dragStartAnimation={true}
        itemHeight={scale(productImageWidth)}
      />
    </ImagesContainer>
  );
};

export default AddProductStepThree;
