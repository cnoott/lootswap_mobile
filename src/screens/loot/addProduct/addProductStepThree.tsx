/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState, useEffect, useCallback} from 'react';
import ImagePicker from 'react-native-image-crop-picker'; //TODO REMOVE
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import {Platform, Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  ImagesContainer,
  AddProductsList,
  ImageContainerUpload,
  CameraRollImageContainer,
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
  ImagePickerContainer,
  ImagePickerModalStyle,
  ModalHeaderText,
  CameraRollList,
  AddPhotosButtonContainer,
  MainPhotoLabelContainer,
  MainPhotoLabel,
} from './styles';
import {useSelector} from 'react-redux';
import {TRASH_WHITE_ICON} from 'localsvgimages';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {Alert} from 'custom_top_alert';
import {scale} from 'react-native-size-matters';
import ChooseAlbumDropdown from '../../../components/loot/chooseAlbumDropDown';
import LSLoader from '../../../components/commonComponents/LSLoader';
import {useGallery} from '../../../utility/customHooks/useGallery';

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

  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [cameraRoll, setCameraRoll] = useState([]);

  const preFilledData =
    addProductData?.stepThree?.length > 0
      ? [...addProductData?.stepThree, imageLastItem]
      : [imageLastItem];

  const {
    photos,
    albums,
    loadNextPagePictures,
    onSelectAlbum,
    selectedAlbum,
    isLoading,
    isLoadingNextPage,
    isReloading,
    hasNextPage,
  } = useGallery({
    pageSize: 18,
  });

  const closeModal = () => setImagePickerVisible(false);

  const [productImagesArr, setProductImagesArr] = useState<any>(preFilledData); // Always adding 1 element to show add images component at last
  const [selectedImages, setSelectedImages] = useState<any>(preFilledData); // Selected images in camera roll modal
  const [enableScroll, setEnableScroll] = useState(true);
  const {updateProductData} = props;
  const updateImagesData = (newImages: Array<string>) => {
    updateProductData({
      ...addProductData,
      stepThree: newImages,
    });
  };

  const onSelectImage = (node: any) => {
    const foundIndex = selectedImages.findIndex(image => image.uri === node.item.uri);
    if (foundIndex !== -1) {
      const newImgArr = [...selectedImages];
      newImgArr.splice(foundIndex, 1);
      setSelectedImages(newImgArr);
    } else {
      const fileData = {
       uri: node.item.uri,
        type: 'image/jpeg',
        isServerImage: false,
        sourceURL: node.item.uri,
        key: `${Math.random() * 100}`,
      };
      let newImgArr = [...selectedImages];
      newImgArr.splice(newImgArr.length - 1, 0, fileData); // Add new image before the last element
      setSelectedImages(newImgArr);
    }
  };

  const onFinishSelecting = () => {
    setImagePickerVisible(false);
    setProductImagesArr(selectedImages);
    updateImagesData(selectedImages.slice(0, -1));
  };

  const renderCameraRollImage = (item: any) => {
    return (
      <CameraRollImageContainer
        key={item.item.key}
        onPress={() => onSelectImage(item)}>
        <ImageUpload
          source={{uri: item.item.uri, priority: FastImage.priority.low}}
        />
        {renderNumberView(item.item.uri)}
      </CameraRollImageContainer>
    );
  };

  const imagePicker = () => (
    <>
      <ChooseAlbumDropdown
        albumList={albums}
        onSelectAlbum={onSelectAlbum}
        selectedAlbum={selectedAlbum}
      />
      <ImagePickerContainer>
        <CameraRollList
          data={photos}
          renderItem={renderCameraRollImage}
          keyExtractor={item => item.key}
          extraData={cameraRoll}
          onEndReached={loadNextPagePictures}
        />
        <AddPhotosButtonContainer>
          <LSButton
            title={'Add Photos'}
            size={Size.Large}
            type={Type.Primary}
            radius={20}
            onPress={() => onFinishSelecting()}
          />
        </AddPhotosButtonContainer>
      </ImagePickerContainer>
    </>
  );

  const onAddImage = async () => {
    setSelectedImages(productImagesArr);
    await setImagePickerVisible(true);
  };

  const onAddImageOLD = () => {
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
              ...imgData, type: imgData?.mime,
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
    setSelectedImages(newImgArr);
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
  const renderNumberView = (uri: string) => {
    const foundIndex = selectedImages.findIndex(image => image.uri === uri);
    if (foundIndex === -1) {
      return;
    }
    return (
      <CellIndexContainer>
        <IndexLabel>{foundIndex + 1}</IndexLabel>
      </CellIndexContainer>
    );
  };
  const renderMainPhotoView = () => {
    return (
      <MainPhotoLabelContainer>
        <MainPhotoLabel>Main Photo</MainPhotoLabel>
      </MainPhotoLabelContainer>
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
        {order === 0 && renderMainPhotoView()}
      </ImageContainerUpload>
    );
  };
  return (
    <>
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

      <LSModal
        isVisible={imagePickerVisible}
        style={ImagePickerModalStyle}
        onBackdropPress={() => closeModal()}>

        <LSModal.BottomContainer>
          {imagePicker()}
          <LSLoader isVisible={isLoading}/>
        <LSModal.CloseButton onCloseButtonPress={() => closeModal()} />
        </LSModal.BottomContainer>
      </LSModal>
    </>
  );
};

export default AddProductStepThree;
