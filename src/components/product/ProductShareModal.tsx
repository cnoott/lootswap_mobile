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

interface ProductShareModalProps {
  isVisible: Boolean;
  onCloseModal: Function;
  productDetails: any;
  userData: any;
}

// TODO: count entries
export const ProductShareModal: FC<ProductShareModalProps> =
 ({
  isVisible,
  onCloseModal,
  productDetails,
  userData,
}) => {

  const viewShotRef = useRef();

  const [uri, setUri] = useState('');

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
      .catch(err => console.log(err));
    } else {
      setTimeout(() => {
        CreativeKit.sharePhoto(photoContent).then(() => {
          console.log('done')
        }).catch(err => console.log(err));
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
      message: 'lootswap!',
      title: 'LOOTSWAP',
    };

    Share.shareSingle(shareOptions);
  };

  const handleIMessageShare = async () => {
    let buo = await branch.createBranchUniversalObject(
      `product_share_${productDetails._id}`, {
        title: `${productDetails.name} on lootswap`,
        contentDescription: `Check out these ${productDetails.brand} on the lootswap app`,
        contentImageUrl: productDetails?.primary_photo,
        // Explicitly specify Open Graph tags
        contentMetadata: {
          "$og_title": `${productDetails.name} on lootswap`,
          "$og_description": `Check out these ${productDetails.brand} on the lootswap app`,
          "$og_image_url": productDetails?.primary_photo,
        }
      });

    const linkProperties = {
      feature: 'share',
      channel: 'sms',
    };

    const controlParams = {
      $desktop_url: 'https://download.lootswap.com',
      $ios_url: 'lootswap://DATA',
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

    await SendSMS.send({
      body: `${productDetails?.name} on lootswap: ${shareUrl}`,
    }, (completed, cancelled, err) => {
      console.log(completed, cancelled, err);
    });

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
            <Image source={IG_STORIES_SHARE}/>
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
          <IconTouchable>
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
