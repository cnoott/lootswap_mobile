import React, {FC} from 'react';
import {View} from 'react-native';
import ViewShot from 'react-native-view-shot';
import LSProductCard from '../productCard';

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
//        position: 'absolute',
//        bottom: -9999999,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingBottom: 80,
        width: '100%',
      }}>
      <ViewShot
        ref={viewShotRef}
        options={{format: 'png', quality: 0.99, width: 132, height: 230}}
        captureMode={'none'}>
        <LSProductCard
          item={productDetails}
          isHorizontalView={true}
          key={productDetails?._id}
          onImageLoad={handleCaptureProductImage}
          showLogo={true}
        />
      </ViewShot>
    </View>
  );
};

export default ProductShareCard;
