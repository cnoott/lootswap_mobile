/***
LootSwap - TRADE OFFER ITEM
***/

import React, {FC} from 'react';
import {
  ImageContainer,
  ImageContainerDouble,
  OfferItemContainer,
  OfferItemContainerCenter,
  Image,
  SingleViewOffer,
  DoubleViewOffer,
  OfferText,
  OfferItemList,
  TrippleViewOffer,
  SingleMoneyOfferContainer,
  OfferTextSingleOffer,
  MultiSizeTextContainer,
  SingleSizeTextContainer,
  SizeText,
  Pressable,
} from '../styles';
import {offerCellOnPress} from '../../../utility/utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {scale, moderateScale} from 'react-native-size-matters';
import Svg, {Text} from 'react-native-svg';
import OfferItemImage from '../../../components/offers/offerItemImage';

interface TradeOfferItemProp {
  items: Array<any>;
  moneyOffer: Number;
  isInTrade?: boolean;
  isStockxItem?: boolean;
  isFromHome?: boolean;
  isPressable?: boolean;
}

export interface ListRenderItemInfo {
  item: any;
  index: number;
  separators?: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  };
}

const HOME_SIZE = scale(80);
const OFFERS_SIZE = scale(90);

export const TradeOfferItem: FC<TradeOfferItemProp> = props => {
  const {
    items,
    moneyOffer,
    isInTrade,
    isStockxItem = false,
    isFromHome = false,
  } = props;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const renderDefaultView = () => {
    return <ImageContainer />;
  };

  const getImageUri = (item: any) => {
    if (isStockxItem) {
      return item?.image;
    }
    return item?.primary_photo;
  };

  const getSize = (item: any) => {
    if (isStockxItem) {
      return item?.chosenSize;
    }
    return item?.size;
  };

  const renderSingleMoneyOfferView = () => {
    return (
      <SingleMoneyOfferContainer>
        <OfferTextSingleOffer>+${moneyOffer}</OfferTextSingleOffer>
      </SingleMoneyOfferContainer>
    );
  };

  const renderSingleView = () => {
    const itemPhoto = getImageUri(items[0]);
    return (
      <ImageContainer size={isFromHome ? HOME_SIZE : OFFERS_SIZE}>
        <OfferItemImage
          source={itemPhoto}
          size={isFromHome ? HOME_SIZE : OFFERS_SIZE}
          isPressable={isInTrade}
          isStockxItem={isStockxItem}
          productData={items[0]}
        />
        <SingleSizeTextContainer>
          <SizeText>Size {getSize(items[0])}</SizeText>
        </SingleSizeTextContainer>
      </ImageContainer>
    );
  };

  const renderSingleViewWithOffer = () => {
    const _size = 75;
    const fromHomeSize = scale(45);
    const itemPhoto = getImageUri(items[0]);
    return (
      <OfferItemContainer size={isFromHome ? HOME_SIZE : OFFERS_SIZE}>
        <ImageContainerDouble size={isFromHome ? fromHomeSize : _size}>
          <OfferItemImage
            source={itemPhoto}
            size={isFromHome ? fromHomeSize : _size}
            isPressable={isInTrade}
            isStockxItem={isStockxItem}
            productData={items[0]}
          />
          <MultiSizeTextContainer>
            <SizeText>{getSize(items[0])}</SizeText>
          </MultiSizeTextContainer>
        </ImageContainerDouble>
        <TrippleViewOffer
          size={isFromHome ? moderateScale(45) : moderateScale(55)}>
          <OfferText>+${moneyOffer}</OfferText>
        </TrippleViewOffer>
      </OfferItemContainer>
    );
  };

  const renderDoubleView = (isOffer: boolean = false) => {
    const _size = 70;
    const fromHomeSize = scale(45);
    const itemLeftPhoto = getImageUri(items[0]);
    const itemRightPhoto = getImageUri(items[1]);

    return (
      <OfferItemContainer size={isFromHome ? HOME_SIZE : OFFERS_SIZE}>
        {isOffer && (
          <DoubleViewOffer>
            <OfferText>+${moneyOffer}</OfferText>
          </DoubleViewOffer>
        )}
        <ImageContainerDouble size={isFromHome ? fromHomeSize : _size}>
          <OfferItemImage
            source={itemRightPhoto}
            size={isFromHome ? fromHomeSize : _size}
            isPressable={isInTrade}
            isStockxItem={isStockxItem}
            productData={items[1]}
          />
          <MultiSizeTextContainer>
            <SizeText>{getSize(items[1])}</SizeText>
          </MultiSizeTextContainer>
        </ImageContainerDouble>

        <ImageContainer size={isFromHome ? fromHomeSize : _size}>
          <OfferItemImage
            source={itemLeftPhoto}
            size={isFromHome ? fromHomeSize : _size}
            isPressable={isInTrade}
            isStockxItem={isStockxItem}
            productData={items[0]}
          />
          <MultiSizeTextContainer>
            <SizeText>{getSize(items[0])}</SizeText>
          </MultiSizeTextContainer>
        </ImageContainer>
      </OfferItemContainer>
    );
  };
  const renderTrippleView = (showMoneyOffer: boolean = false) => {
    const _size = scale(44);
    const photoArray = items.map((item: any) => {
      return isStockxItem ? item?.image : item?.primary_photo;
    });
    const sizeArray = items.map((item: any) => {
      return isStockxItem ? item?.chosenSize : item?.size;
    });
    // Adding one extra element to show money offer view at last
    if (showMoneyOffer) {
      photoArray.push('1');
    }

    const renderTrippleOffer = () => {
      return (
        <TrippleViewOffer size={isFromHome ? moderateScale(40) : _size}>
          <OfferText>+${moneyOffer}</OfferText>
        </TrippleViewOffer>
      );
    };
    const trippleViewItem = ({item, index}: ListRenderItemInfo) => {
      const isFooter = index + 1 === photoArray?.length;
      if (isFooter && showMoneyOffer) {
        return renderTrippleOffer();
      }
      return (
        <ImageContainer size={isFromHome ? moderateScale(40) : _size}>
          <OfferItemImage
            source={item}
            size={isFromHome ? moderateScale(40) : _size}
            isPressable={isInTrade}
            isStockxItem={isStockxItem}
            productData={items[index]}
          />

          <MultiSizeTextContainer>
            <SizeText>{sizeArray[index]}</SizeText>
          </MultiSizeTextContainer>
        </ImageContainer>
      );
    };
    return (
      <OfferItemContainer size={isFromHome ? HOME_SIZE + 10 : OFFERS_SIZE}>
        <OfferItemList data={photoArray} renderItem={trippleViewItem} />
      </OfferItemContainer>
    );
  };
  const renderSubItems = () => {
    const length = items?.length;
    switch (true) {
      case length === 0:
        return renderSingleMoneyOfferView();
      case length === 1 && moneyOffer > 0:
        return renderSingleViewWithOffer();
      case length === 1:
        return renderSingleView();
      case length === 2 && moneyOffer > 0:
        return renderDoubleView(true);
      case length === 2:
        return renderDoubleView();
      case length === 3 && moneyOffer > 0:
        return renderTrippleView(true);
      case length === 3:
        return renderTrippleView();
      default:
        return renderDefaultView();
    }
  };
  return <>{renderSubItems()}</>;
};

export default TradeOfferItem;
