/***
LootSwap - ADD_PRODUCT STEP 3
***/

import React, {FC, useState, useCallback, useEffect} from 'react';
import ImagePicker, {openPicker} from 'react-native-image-crop-picker'; //TODO REMOVE
import {LSModal} from '../../../components/commonComponents/LSModal';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import {Dimensions} from 'react-native';
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
  PlaceholderContainer,
  PlaceholderLabel,
  TakePhotoButtonContainer,
  TakePhotoButtonText,
  CameraIconContainer,
  PhotoGuideText,
} from './styles';
import {useSelector} from 'react-redux';
import {PROFILE_TRIPPLE_DOT_ICON, CAMERA_ICON} from 'localsvgimages';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {Alert} from 'custom_top_alert';
import {scale} from 'react-native-size-matters';
import ChooseAlbumDropdown from '../../../components/loot/chooseAlbumDropDown';
import LSLoader from '../../../components/commonComponents/LSLoader';
import {useGallery} from '../../../utility/customHooks/useGallery';
import ImageGuideComponent from '../../../components/loot/imageGuideComponent';
import EditPhotoModal from '../../../components/loot/editPhotoModal';
import {initialImageData} from '../../../utility/utility';

const width = Dimensions.get('window').width;
const productImageWidth = width / 3 - 30;

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepThree: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );

  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [cameraRoll, setCameraRoll] = useState([]);

  const [isImageGuideVisible, setIsImageGuideVisible] = useState(false);
  const openImageGuide = useCallback(() => {
    setIsImageGuideVisible(true);
  }, []);
  const closeImageGuide = useCallback(() => {
    setIsImageGuideVisible(false);
  }, []);

  const preFilledData =
    addProductData?.stepThree?.length > 0
      ? [...addProductData?.stepThree]
      : [];

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
    pageSize: 24,
  });

  const closeModal = () => setImagePickerVisible(false);

  const [productImagesArr, setProductImagesArr] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null); // Selected images in camera roll modal
  const [enableScroll, setEnableScroll] = useState(true);
  const {updateProductData} = props;
  const updateImagesData = (newImages: Array<string>) => {
    updateProductData({
      ...addProductData,
      stepThree: newImages,
    });
  };

  useEffect(() => {
    if (addProductData?.stepTwo?.condition?.label === 'New without box') {
      const newProductImagesArr = productImagesArr.filter(
        img => img.placeholderLabel !== 'Box Label'
      );
      setProductImagesArr(newProductImagesArr);
    } else {
      const preFilledData =
        addProductData?.stepThree?.length > 0
          ? [...addProductData?.stepThree]
          : initialImageData(addProductData?.stepOne?.category?.label);
      setProductImagesArr(preFilledData);
    }
  }, [addProductData?.stepTwo?.condition?.label]);

  useEffect(() => {
    let newProductImagesArr = initialImageData(
      addProductData?.stepOne?.category?.label,
    );
    setProductImagesArr(newProductImagesArr);
  }, [addProductData?.stepOne?.category?.label]);


  const onSelectImage = (node: any) => {
    if (selectedImage && selectedImage?.sourceURL === node.item.uri) {
      setSelectedImage(null);
    } else {
      if (productImagesArr.length > 13) {
        Alert.showError('You cannot upload more than 13 images');
        return;
      }
      const fileData = {
        uri: node.item.uri,
        type: 'image/jpeg',
        isServerImage: false,
        sourceURL: node.item.uri,
        key: `${Math.random() * 100}`,
        placeholderLabel: productImagesArr[selectedImageIndex].placeholderLabel,
        placeholder: productImagesArr[selectedImageIndex].placeholder
      };
      setSelectedImage(fileData);
    }
  };

  const openCamera = async () => {
    if (productImagesArr?.length >= 13) {
      closeModal();
      Alert.showError('You cannot add more than 13 photos');
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
      sourceURL: image.path, // test w update too
      key: `${Math.random() * 100}`,
      placeholderLabel: productImagesArr[selectedImageIndex].placeholderLabel,
      placeholder: productImagesArr[selectedImageIndex].placeholder
    };

    // Update the specific index in the productImagesArr array
    setProductImagesArr(prev => {
      const newProductImagesArr = [...prev];
      updateImagesData(newProductImagesArr);
      newProductImagesArr[selectedImageIndex] = fileData;
      return newProductImagesArr;
    });

    // Update images data excluding the last element
    setImagePickerVisible(false);
  };


  const onFinishSelecting = () => {
    if (!selectedImage) {
      return;
    }
    setImagePickerVisible(false);
    const indexToEdit = selectedImageIndex;
    // Update the specific index in the productImagesArr array
    setProductImagesArr(prev => {
      let newProductImagesArr = [...prev];
      newProductImagesArr[indexToEdit] = selectedImage;
      updateImagesData(newProductImagesArr);
      return newProductImagesArr;
    });
  };


  const renderCameraRollImage = (item: any) => {
    return (
      <CameraRollImageContainer
        key={item.item.key}
        onPress={() => onSelectImage(item)}>
        <ImageUpload
          source={{uri: item.item.uri, priority: FastImage.priority.low}}
        />
        {renderLabelView(item)}
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
          onEndReachedThreshold={1}
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

  const onAddImage = async (order: number) => {
    setSelectedImageIndex(order);
    setSelectedImage(null);
    await setImagePickerVisible(true);
  };

  const onRemoveImage = (imageIndex: number) => {
    setProductImagesArr(prev => {
      let newProductImagesArr = [...prev];
      updateImagesData(newProductImagesArr);
      newProductImagesArr[imageIndex].sourceURL = '';
      newProductImagesArr[imageIndex].uri = '';
      return newProductImagesArr;
    });
    setEditModalVisible(false);
    setProductImagesArr(newProductImagesArr); // Local Update
  };

  const onEditImage = (imageIndex: number) => {
    console.log('EDITING', imageIndex);

    ImagePicker.openCropper({
      path: productImagesArr[imageIndex].uri,
      freeStyleCropEnabled: true,
      includeBase64: false,
      compressImageQuality: 1,
      compressImageMaxHeight: 2500,
      compressImageMaxWidth: 2000,
      width: 2000,
      height: 2500,
    }).then(image => {
      const indexToEdit = selectedImageIndex;
      // Update the specific index in the productImagesArr array
      setProductImagesArr(prev => {
        let newProductImagesArr = [...prev];
        updateImagesData(newProductImagesArr);
        newProductImagesArr[indexToEdit] = selectedImage;
        return newProductImagesArr;
      });
      setEditModalVisible(false);
    });
  };

  const onThreeDotsPress = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setEditModalVisible(true);
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
  const renderThreeDots = (imageIndex: number) => {
    return (
      <DeleteContainer onPress={() => onThreeDotsPress(imageIndex)}>
        <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
      </DeleteContainer>
    );
  };
  const renderLabelView = (item) => {
    if (selectedImage?.uri !== item.item.uri) {
      return <></>
    }
    return (
      <CellIndexContainer>
        <IndexLabel>
          {selectedImage.placeholderLabel}
        </IndexLabel>
      </CellIndexContainer>
    );
  };
  const renderProductImageContainer = ({ item, index }) => {
    if (item.sourceURL) {
      return (
        <ImageContainerUpload key={item?.key}>
          <ImageUpload
            source={{ uri: item?.sourceURL, priority: FastImage.priority.low }}
          />
          {renderThreeDots(index)}
        </ImageContainerUpload>
      );
    }
    return (
      <>
        {renderPlaceholder(
        item.placeholder,
        item.placeholderLabel,
        index,
        )}
      </>
    );
  };

  const renderPlaceholder = (icon: string, label: string, order: number) => {
    return (
      <Touchable onPress={() => onAddImage(order)}>
        <ImageContainerNew>
          <SvgXml xml={icon} />
          <PlaceholderContainer>
            <PlaceholderLabel>{label}</PlaceholderLabel>
          </PlaceholderContainer>
        </ImageContainerNew>
      </Touchable>
    );
  };
  return (
    <>
      <PhotoGuideText onPress={openImageGuide}>Photo Guide {}</PhotoGuideText>
      <ImagesContainer enableScroll={enableScroll}>
        <AddProductsList
          data={productImagesArr}
          renderItem={({item, index}) => renderProductImageContainer({item, index})}
          /*
          onDragging={() => setEnableScroll(false)}
          onDragRelease={data => {
            setProductImagesArr(data);
            updateImagesData(data?.slice(0, -1)); // Updating Reducer Data
            setEnableScroll(true);
          }}
          dragStartAnimation={true}
           */
        />
      </ImagesContainer>
      <ImageGuideComponent
        isVisible={isImageGuideVisible}
        onClose={closeImageGuide}
        category={addProductData?.stepOne?.category?.value}
      />
      <EditPhotoModal
        isVisible={editModalVisible}
        closeModal={() => setEditModalVisible(false)}
        onDeletePress={() => onRemoveImage(selectedImageIndex)}
        onEditPress={() => onEditImage(selectedImageIndex)}
      />
      <LSModal
        isVisible={imagePickerVisible}
        style={ImagePickerModalStyle}
        onBackdropPress={() => closeModal()}>
        <LSModal.BottomContainer>
          {imagePicker()}
          <LSModal.CloseButton onCloseButtonPress={() => closeModal()} />
        </LSModal.BottomContainer>
      </LSModal>
    </>
  );
};

export default AddProductStepThree;
