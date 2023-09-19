import React, {FC} from 'react';
import {
  StockxContainer,
  StockxImageContainer,
  StockxImage,
  StockxTextContainer,
  StockxTitleText,
  StockxNumListingsText,
} from './stockxProductCardStyles';

interface StockxProductCardProps {
  stockxProduct: any;
  foundProducts: Array<any>;
  handleStockxNavigation?: Function;
  border?: Boolean;
  isFromLiked?: Boolean;
}

export const StockxProductCard: FC<StockxProductCardProps> = (props) => {
  const {
    stockxProduct,
    foundProducts,
    handleStockxNavigation = () => {},
    border = false,
    isFromLiked = false,
  } = props;

  return (
    <StockxContainer
      onPress={() => handleStockxNavigation(stockxProduct, foundProducts)}
      border={border}
      isFromLiked={isFromLiked}
    >
      <StockxImageContainer>
        <StockxImage source={{uri: stockxProduct?.image}} />
      </StockxImageContainer>
      <StockxTextContainer>
        <StockxTitleText>{stockxProduct?.name}</StockxTitleText>
        <StockxNumListingsText>
          {foundProducts && `${foundProducts?.length} listing${
            foundProducts?.length !== 1 ? 's' : ''} avaliable`
          }
        </StockxNumListingsText>
      </StockxTextContainer>
    </StockxContainer>
  );
};

export default StockxProductCard;
