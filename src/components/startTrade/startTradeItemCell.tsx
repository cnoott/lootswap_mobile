import React, {FC} from 'react';
import {Size, Type} from '../../enums';
import {
  ItemContainer,
  ImageContainer,
  CellTouchable,
  TitleText,
  DesContainer,
  BrandText,
  DesBottomContainer,
  TitleBrandContainer,
  ConditionSizeResultText,
  ConditionSizeText,
  AnimatedCheckBox,
  Image,
} from './styles';
import {
  findMarketDataFromSize,
  getPreownedMarketValue,
} from '../../utility/utility';

interface StartTradeItemCellProps {
  item: any;
  onPress?: Function;
  isReview: boolean;
  isMoneyOffer: boolean;
}

const StartTradeItemCell: FC<StartTradeItemCellProps> = React.memo(props => {
  const {onPress = () => {}, isReview = false, isMoneyOffer = false} = props;
  const item = props.item;

  const getEstRange = (product: any) => {
    if (product.stockxId) {
      const foundSize = findMarketDataFromSize(product.stockxId, product.size);
      if (!foundSize.lastSale) {
        return 'Not available';
      }
      if (foundSize && product.condition !== 'Pre-owned') {
        return `$${foundSize.lastSale}`;
      } else if (foundSize && product.condition === 'Pre-owned') {
        const range = getPreownedMarketValue(
          foundSize,
          product?.preOwnedCondition,
        );
        return `$${range[0]} - $${range[1]} `;
      }
    }
  };

  const renderImageView = () => (
    <>
      <ImageContainer>
        <Image source={{uri: item.primary_photo}} />
      </ImageContainer>
    </>
  );

  const renderDescription = () => (
    <DesContainer>
      {!isReview && (
        <AnimatedCheckBox
          isChecked={item?.isSelected}
          onPress={() => onPress(item?._id)}
          disableBuiltInState
        />
      )}
      <TitleBrandContainer>
        <BrandText>{item.brand}</BrandText>
        <TitleText>{item.name}</TitleText>
      </TitleBrandContainer>

      <DesBottomContainer>
        <ConditionSizeText>Condition:</ConditionSizeText>
        <ConditionSizeResultText>
          {item.condition === 'Pre-owned'
            ? item.preOwnedCondition
            : item.condition}
        </ConditionSizeResultText>
      </DesBottomContainer>
      <DesBottomContainer>
        <ConditionSizeText>Size:</ConditionSizeText>
        <ConditionSizeResultText>{item.size}</ConditionSizeResultText>
      </DesBottomContainer>
      {isMoneyOffer && (
        <DesBottomContainer>
          <ConditionSizeText>Buy Now Price:</ConditionSizeText>
          <ConditionSizeResultText>${item.price}</ConditionSizeResultText>
        </DesBottomContainer>
      )}
      {!isMoneyOffer &&
        item.stockxId &&
        findMarketDataFromSize(item.stockxId, item.size) && (
          <DesBottomContainer>
            <ConditionSizeText>Est. Value: </ConditionSizeText>
            <ConditionSizeResultText>
              {getEstRange(item)}
            </ConditionSizeResultText>
          </DesBottomContainer>
        )}
    </DesContainer>
  );

  return (
    <CellTouchable onPress={() => onPress(item?._id)}>
      <ItemContainer>
        {renderImageView()}
        {renderDescription()}
      </ItemContainer>
    </CellTouchable>
  );
});

export default StartTradeItemCell;
