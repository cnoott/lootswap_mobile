import React, {FC} from 'react';
import {
  StockxContainer,
  StockxImageContainer,
  StockxImage,
  StockxTextContainer,
  StockxTitleText,
  StockxNumListingsText,
} from './stockxProductCardStyles';
import {LikeTouchable} from '../productCard/styles';
import {SvgXml} from 'react-native-svg';
import {LIKE_HEART_ICON_WHITE, LIKE_HEART_ICON_RED} from 'localsvgimages';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';

interface StockxProductCardProps {
  stockxProduct: any;
  productCount: Number;
  handleStockxNavigation?: Function;
  border?: Boolean;
  isFromLiked?: Boolean;
  handleUnlikeProduct?: Function;
}

export const StockxProductCard: FC<StockxProductCardProps> = (props) => {
  const {
    stockxProduct,
    productCount,
    handleStockxNavigation = () => {},
    border = false,
    isFromLiked = false,
    handleUnlikeProduct = () => {},
  } = props;

  return (
    <StockxContainer
      onPress={() => handleStockxNavigation(stockxProduct)}
      border={border}
      isFromLiked={isFromLiked}
    >
      {isFromLiked && (
        <LikeTouchable onPress={() => handleUnlikeProduct(stockxProduct)}>
          <SvgXml xml={LIKE_HEART_ICON_RED} color={'white'} />
        </LikeTouchable>
      )}
      <StockxImageContainer>
        <StockxImage source={{uri: stockxProduct?.image}} />
      </StockxImageContainer>
      <StockxTextContainer>
        <StockxTitleText>{stockxProduct?.name}</StockxTitleText>
        <StockxNumListingsText>
          {productCount > 0 &&
            `${productCount} listing${productCount !== 1 ? 's' : ''} avaliable`}
        </StockxNumListingsText>
      </StockxTextContainer>
    </StockxContainer>
  );
};

export default StockxProductCard;
