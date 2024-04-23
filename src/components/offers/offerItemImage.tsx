/***
  LOOTSWAP - OFFER ITEM IMAGE COMPONENT
 ***/

import React, {FC} from 'react';
import {Pressable, Image} from './offerItemImageStyles';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface OfferItemImageProps {
  source: String;
  size: Number;
  isStockxItem?: Boolean;
  isPressable?: Boolean;
  productData?: any;
}

export const OfferItemImage: FC<OfferItemImageProps> = React.memo(
  ({source, size, isStockxItem = false, isPressable = false, productData}) => {
    const navigation: NavigationProp<any, any> = useNavigation();
    const handleNavigation = () => {
      if (productData) {
        navigation.navigate('ProductDetailsScreen', {
          productData: productData,
          likedParam: false,
        });
      }
    };

    if (isPressable) {
      return (
        <Pressable onPress={() => handleNavigation()}>
          <Image
            source={{uri: source}}
            size={size}
            isStockxItem={isStockxItem}
          />
        </Pressable>
      );
    } else {
      return (
        <Image source={{uri: source}} size={size} isStockxItem={isStockxItem} />
      );
    }
  },
);

export default OfferItemImage;
