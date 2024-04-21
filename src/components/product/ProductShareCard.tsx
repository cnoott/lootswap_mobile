import React, {FC} from 'react';
import {View} from 'react-native';
import ViewShot from 'react-native-view-shot';
import LSProductCard from '../productCard';
import {HEADERLOGO} from '../../constants/imageConstants';
import {APPSTORE_ICON} from 'localsvgimages';
import {SvgXml} from  'react-native-svg';
import {
  ItemContainer,
  ShareCardImage,
  HeaderTextMain,
  BottomHeaderView,
  CellBottomView,
  HeaderDes,
  FreeShipingContainer,
  LogoImageContainer,
  LogoImage,
} from './ProductShareModalStyles';
import {
  ShippingText,
} from '../productCard/styles';

interface ProductShareCardProps {
  productDetails: any;
  viewShotRef: any;
  handleCaptureProductImage: Function;
}

export const ProductShareCard: FC<ProductShareCardProps> = ({
  productDetails,
  viewShotRef,
  handleCaptureProductImage,
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: -9999999,
        backgroundColor: 'white',
        borderRadius: 999,
        paddingBottom: 80,
        overflow: 'hidden',
      }}>
      <ViewShot
        ref={viewShotRef}
        options={{format: 'png', quality: 0.99}}
        captureMode={'none'}>
        <ItemContainer>
          <View>
            <ShareCardImage
              source={{uri: productDetails.primary_photo}}
              onLoad={handleCaptureProductImage}

            />
          {productDetails.who_pays === 'seller-pays' && (
            <FreeShipingContainer>
              <ShippingText>Free Shipping</ShippingText>
            </FreeShipingContainer>
          )}
          </View>
          <CellBottomView>
            <BottomHeaderView isFromShare={true}>
              <HeaderTextMain>{productDetails.name}</HeaderTextMain>
            </BottomHeaderView>

            <BottomHeaderView isFromShare={true}>
              <HeaderDes>{productDetails.brand}</HeaderDes>
            {productDetails.type !== 'trade-only' && (
              <HeaderTextMain>${productDetails.price}</HeaderTextMain>
            )}
            </BottomHeaderView>
            <HeaderTextMain>Size {productDetails.size}</HeaderTextMain>
          </CellBottomView>
          <LogoImageContainer>
            <LogoImage source={HEADERLOGO} />
            <SvgXml xml={APPSTORE_ICON} />
          </LogoImageContainer>
        </ItemContainer>
      </ViewShot>
    </View>
  );
};

export default ProductShareCard;
