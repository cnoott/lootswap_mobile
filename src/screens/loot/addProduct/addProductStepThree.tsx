/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ScaleDecorator} from 'react-native-draggable-flatlist';
import FastImage from 'react-native-fast-image';
// import {
//   getSignedRequest,
//   uploadFile,
// } from '../../../services/imageUploadService';
import {
  Container,
  AddProductsList,
  ImageContainerUpload,
  ImageContainerNew,
  ImageUpload,
  PlusContainer,
  PlusSign,
  AddImageLabel,
  Touchable,
  DeleteContainer,
} from './styles';
import {useSelector} from 'react-redux';
import {TRASH_WHITE_ICON} from 'localsvgimages';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {Alert} from 'custom_top_alert';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepThree: FC<ProductStep> = props => {
  // const dispatch = useDispatch();
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const preFilledData =
    addProductData?.stepThree?.length > 0 ? [...addProductData?.stepThree] : [];
  const [productImagesArr, setProductImagesArr] = useState<any>(preFilledData); // Always adding 1 element to show add images component at last
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
    if (productImagesArr?.length <= 14) {
      // Checking for 1 extra due to footer component
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: true,
      }).then(images => {
        if (images?.length > 0) {
          const oldImagesData = [...productImagesArr];
          images?.map(imgData => {
            const fileData = {
              ...imgData,
              type: imgData?.mime,
              uri:
                Platform.OS === 'android'
                  ? imgData?.sourceURL
                  : imgData?.sourceURL?.replace('file://', ''),
              sourceURL: imgData?.sourceURL,
              isServerImage: false,
            };
            oldImagesData?.unshift(fileData);
          });
          const newArr = [...oldImagesData];
          setProductImagesArr(newArr);
          updateImagesData(newArr);
        }
        // dispatch(LoadingRequest());
        // const fileData = {
        //   ...image,
        //   type: image?.mime,
        //   uri:
        //     Platform.OS === 'android'
        //       ? image?.sourceURL
        //       : image?.sourceURL?.replace('file://', ''),
        // };
        // getSignedRequest(fileData)
        //   .then(signedReqData => {
        //     uploadFile(
        //       fileData,
        //       signedReqData?.signedRequest,
        //       signedReqData?.url,
        //     )
        //       .then(url => {
        //         dispatch(LoadingSuccess());
        //         if (url) {
        //           const newArr = [url, ...productImagesArr];
        //           setProductImagesArr(newArr); // Local Update
        //           updateImagesData(newArr.slice(0, -1)); // Reducer Update
        //         }
        //       })
        //       .catch(() => {
        //         dispatch(LoadingSuccess());
        //       });
        //   })
        //   .catch(() => {
        //     dispatch(LoadingSuccess());
        //   });
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
      <Touchable activeOpacity={0.6} onPress={onAddImage}>
        <ImageContainerNew>
          <PlusContainer>
            <PlusSign>+</PlusSign>
          </PlusContainer>
          <AddImageLabel>+Add Images</AddImageLabel>
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
  const renderProductImageContainer = ({
    item,
    getIndex,
    drag,
    isActive,
  }: any) => {
    return (
      <ScaleDecorator key={getIndex() + Math.random() * 100}>
        <ImageContainerUpload
          key={getIndex()}
          onLongPress={drag}
          disabled={isActive}>
          <ImageUpload
            source={{uri: item?.sourceURL, priority: FastImage.priority.high}}
          />
          {renderDeleteView(getIndex())}
        </ImageContainerUpload>
      </ScaleDecorator>
    );
  };
  return (
    <Container>
      <AddProductsList
        data={productImagesArr}
        renderItem={renderProductImageContainer}
        keyExtractor={item => item?.sourceURL}
        onDragEnd={({data}) => setProductImagesArr(data)}
        ListFooterComponent={renderAddImageContainer}
      />
    </Container>
  );
};

export default AddProductStepThree;
