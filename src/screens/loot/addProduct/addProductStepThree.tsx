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
import LSLoader from '../../../components/commonComponents/LSLoader';
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
  FullTouchable,
} from './styles';
import {useSelector} from 'react-redux';
import {HomeProps} from '../../../redux/modules/home/reducer';
import {TRASH_WHITE_ICON} from 'localsvgimages';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepThree: FC<ProductStep> = props => {
  const addProductData: HomeProps = useSelector(
    state => state?.home?.addProductData,
  );
  const [isImageUploading, setImageUploading] = useState(false);
  const [productImagesArr, setProductImagesArr] = useState<any>([1]); // Always adding 1 element to show add images component at last
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
      setImageUploading(true);
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
              setImageUploading(false);
              if (url) {
                const newArr = [url, ...productImagesArr];
                setProductImagesArr(newArr);
                updateImagesData(newArr.slice(0, -1));
              }
            })
            .catch(() => {
              setImageUploading(false);
            });
        })
        .catch(() => {
          setImageUploading(false);
        });
    });
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
  const renderDeleteView = () => {
    return (
      <DeleteContainer>
        <FullTouchable>
          <SvgXml xml={TRASH_WHITE_ICON} />
        </FullTouchable>
      </DeleteContainer>
    );
  };
  const renderProductImageContainer = ({item, index}) => {
    const isFooter = index + 1 === productImagesArr?.length;
    if (isFooter) {
      return renderAddImageContainer();
    }
    return (
      <ImageContainer>
        <Image source={{uri: item}} />
        {renderDeleteView()}
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
      <LSLoader isVisible={isImageUploading} />
    </Container>
  );
};

export default AddProductStepThree;
