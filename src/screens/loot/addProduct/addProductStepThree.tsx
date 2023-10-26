/***
LootSwap - ADD_PRODUCT STEP 3
***/

import React, {FC, useState, useEffect, useCallback} from 'react';
import ImagePicker, { openPicker } from 'react-native-image-crop-picker'; //TODO REMOVE
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import {Platform, Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
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
  TakePhotoButtonContainer,
  TakePhotoButtonText,
  CameraIconContainer,
  PhotoGuideText,
} from './styles';
import {useSelector} from 'react-redux';
import {TRASH_WHITE_ICON, CAMERA_ICON} from 'localsvgimages';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {Alert} from 'custom_top_alert';
import {scale} from 'react-native-size-matters';
import ChooseAlbumDropdown from '../../../components/loot/chooseAlbumDropDown';
import LSLoader from '../../../components/commonComponents/LSLoader';
import {useGallery} from '../../../utility/customHooks/useGallery';
import ImageGuideComponent from '../../../components/loot/imageGuideComponent';

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

  const [isImageGuideVisible, setIsImageGuideVisible] = useState(true);
  const openImageGuide = useCallback(() => {
    setIsImageGuideVisible(true);
  }, []);
  const closeImageGuide = useCallback(() => {
    setIsImageGuideVisible(false);
  }, []);

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
      if (selectedImages.length > 13) {
        Alert.showError('You cannot upload more than 13 images');
        return;
      }
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

  const openCamera = async () => {
    if (photos?.length >= 13) {
      closeModal();
      Alert.showError('You you cannot add more than 13 photos');
      return;
    }
    const image = await ImagePicker.openCamera({
      width: 600,
      height: 700,
    });

    const fileData = {
      uri: image.path,
      type: 'image/jpeg',
      isServerImage: false,
      sourceURL: image.path, //test w update too
      key: `${Math.random() * 100}`,
    };
    let newImgArr = [...selectedImages];
    newImgArr.splice(newImgArr.length - 1, 0, fileData); // Add new image before the last element

    setImagePickerVisible(false);
    setProductImagesArr(newImgArr);
    updateImagesData(newImgArr.slice(0, -1));
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
      <TakePhotoButtonContainer onPress={openCamera}>
        <CameraIconContainer>
          <SvgXml xml={CAMERA_ICON} />
        </CameraIconContainer>
        <TakePhotoButtonText>Take Photo</TakePhotoButtonText>
      </TakePhotoButtonContainer>
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
          source={{uri: item?.sourceURL, priority: FastImage.priority.low}}
        />
        {renderDeleteView(0)}
        {order === 0 && renderMainPhotoView()}
      </ImageContainerUpload>
    );
  };
  return (
    <>
    <PhotoGuideText onPress={openImageGuide}>Photo Guide</PhotoGuideText>
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
      <ImageGuideComponent
        isVisible={isImageGuideVisible}
        onClose={closeImageGuide}
      />
      <LSModal
        isVisible={imagePickerVisible}
        style={ImagePickerModalStyle}
        onBackdropPress={() => closeModal()}>

        <LSModal.BottomContainer>
          {imagePicker()}
          <LSLoader isVisible={isLoading || isLoadingNextPage || isReloading}/>
        <LSModal.CloseButton onCloseButtonPress={() => closeModal()} />
        </LSModal.BottomContainer>
      </LSModal>
    </>
  );
};

export default AddProductStepThree;
