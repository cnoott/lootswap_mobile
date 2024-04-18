import React, {FC, useRef, useState, useEffect} from 'react';
import {LSModal} from '../commonComponents/LSModal';
import {
  ModalStyles,
  ModalHeaderText,
  ModalSubText,
  ScrollView,
  Image,
  IconTouchable,
  IconText,
} from './ProductShareModalStyles';
import {
  IG_SHARE,
  IG_STORIES_SHARE,
  IMESSAGE,
  COPY_LINK_ICON,
} from '../../constants/imageConstants';
import {SNAPCHAT_ICON, IMESSAGE_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {CreativeKit, PhotoContentParams} from '@snapchat/snap-kit-react-native';
import ProductShareCard from './ProductShareCard';
import {META_APP_ID, SHARE_PRODUCT_DOMAIN} from '@env';
import Share from 'react-native-share';
import branch from 'react-native-branch';
import SendSMS from 'react-native-sms';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {addSharedProductRequest} from '../../redux/modules';
import Clipboard from '@react-native-clipboard/clipboard';
import {Alert} from 'custom_top_alert';

interface ProductShareModalProps {
  isVisible: Boolean;
  onCloseModal: Function;
  productDetails: any;
}

// TODO: count entries
// LOGGING!
export const ProductShareModal: FC<ProductShareModalProps> =
 ({
  isVisible,
  onCloseModal,
  productDetails,
}) => {

  const viewShotRef = useRef();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const dispatch = useDispatch();

  const [uri, setUri] = useState('');

  const checkIfAlreadyGenerated = () => {
    if (!userData || !Array.isArray(userData.sharedProductIds)) {
      return false;
    }
    const alreadyGenerated = userData?.sharedProductIds.find(
      product => product.productId === productDetails._id
    );
    if (alreadyGenerated) {
      return alreadyGenerated.url;
    }

    return false;
  };

  const generateShareUrl = async () => {
    const alreadyGeneratedUrl = await checkIfAlreadyGenerated();
    if (alreadyGeneratedUrl) {
      return alreadyGeneratedUrl;
    }
    let buo = await branch.createBranchUniversalObject(
      `product_share_${productDetails._id}`, {
        title: `${productDetails.name} on lootswap`,
        contentDescription: `Check out these ${productDetails.brand} on the lootswap app`,
        contentImageUrl: productDetails?.primary_photo,
      },
    );

    const linkProperties = {
      feature: 'share',
      channel: 'sms',
    };

    const controlParams = {
      $desktop_url: 'https://download.lootswap.com',
      $ios_url: `lootswap://product/${productDetails._id}`,
      $android_url: 'https://download.lootswap.com',
      $fallback_url: 'https://download.lootswap.com',
    };

    const {url} = await buo.generateShortUrl(linkProperties, controlParams);

    const encodedUrl = encodeURIComponent(url);
    const encodedProductName = encodeURIComponent(
      productDetails?.name.slice(0, 200)
    );
    const encodedProductPhoto = encodeURIComponent(
      productDetails.primary_photo
    );

    const shareUrl = `${SHARE_PRODUCT_DOMAIN}/product-share?url=${encodedUrl}&productName=${encodedProductName}&productPhoto=${encodedProductPhoto}`;
    console.log('shareurl', shareUrl);

    dispatch(
      addSharedProductRequest({
        productId: productDetails._id,
        url: shareUrl,
        userId: userData?._id,
      }),
    );

    return shareUrl;
  };

  const handleCaptureProductImage = () => {
    viewShotRef.current.capture().then(async uriData => {
      setUri(uriData);
    });
  };

  const handleSnapchatShare = async () => {
    const photoContent: PhotoContentParams = {
      content: {
        // white bg image base64
        uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AqAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8At4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z'
      },
      sticker: {
        uri: `file://${uri.trim()}`,
        posX: 0.5,
        posY: 0.55,
        rotationDegreesInClockwise: 0,
        isAnimated: false,
      },
      attachmentUrl: 'https://download.lootswap.com',
    };

    if (uri) {
      CreativeKit.sharePhoto(photoContent).then(() => {
        console.log('done')
      })
      .then(() => {
        dispatch(
          addSharedProductRequest({
            productId: productDetails._id,
            userId: userData?._id,
          }),
        );
      })
      .catch(err => console.log(err));
    } else {
      setTimeout(() => {
        CreativeKit.sharePhoto(photoContent).then(() => {
          console.log('done')
        })
        .then(() => {
            dispatch(
              addSharedProductRequest({
                productId: productDetails._id,
                userId: userData?._id,
              }),
            );
        })
        .catch(err => console.log(err));
      }, 1000);
    }
  };

  const handleInstagramShare = async () => {
    const shareOptions = {
      appId: META_APP_ID,
      social: Share.Social.INSTAGRAM_STORIES,
      stickerImage: `file://${uri.trim()}`,
      attributionURL: 'https://download.lootswap.com',
      url: 'https://download.lootswap.com',
      message: 'Get lootswap on the AppStore',
      title: 'Get lootswap on the AppStore',
    };

    Share.shareSingle(shareOptions);
    dispatch(
      addSharedProductRequest({
        productId: productDetails._id,
        userId: userData?._id,
      }),
    );
  };

  const handleIMessageShare = async () => {
    const shareUrl = await generateShareUrl();
    console.log('shareUrl', shareUrl);
    await SendSMS.send(
      {
        body: `${productDetails?.name} on lootswap: ${shareUrl}`,
      },
      (completed, cancelled, err) => {
        if (completed) {
          dispatch(
            addSharedProductRequest({
              productId: productDetails._id,
              userId: userData?._id,
            }),
          );
        }
        console.log(completed, cancelled, err);
      },
    );
  };

  const handleCopyLink = async () => {
    onCloseModal();
    const shareUrl = await generateShareUrl();
    Clipboard.setString(shareUrl);
    Alert.showSuccess('Copied!');
  };

  return (
    <LSModal
      isVisible={isVisible}
      style={ModalStyles}
      onBackdropPress={onCloseModal}>
      <LSModal.BottomContainer>
        <ModalHeaderText>Share Listing</ModalHeaderText>
        <ProductShareCard
          productDetails={productDetails}
          viewShotRef={viewShotRef}
          handleCaptureProductImage={handleCaptureProductImage}
        />
        <ModalSubText>Share To</ModalSubText>
        <ScrollView horizontal>
          <IconTouchable onPress={handleSnapchatShare}>
            <SvgXml xml={SNAPCHAT_ICON} width={scale(60)} height={scale(60)} />
            <IconText>Snapchat</IconText>
          </IconTouchable>
          <IconTouchable onPress={handleInstagramShare}>
            <Image source={IG_STORIES_SHARE} />
            <IconText>Stories</IconText>
          </IconTouchable>

          {/*
          <IconTouchable>
            <Image source={IG_SHARE}/>
            <IconText>Instagram</IconText>
          </IconTouchable>
          */}

          <IconTouchable onPress={handleIMessageShare}>
            <Image source={IMESSAGE}/>
            <IconText>iMessage</IconText>
          </IconTouchable>
          <IconTouchable onPress={handleCopyLink}>
            <Image source={COPY_LINK_ICON}/>
            <IconText>Copy Link</IconText>
          </IconTouchable>
        </ScrollView>
        <LSModal.CloseButton onCloseButtonPress={onCloseModal} />
      </LSModal.BottomContainer>
    </LSModal>
  );
};

export default ProductShareModal;
