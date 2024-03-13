import React, {FC} from 'react';
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
} from '../startTrade/styles';
import {findMarketDataFromSize} from '../../utility/utility';

interface ReviewStockxItemProps {
  stockxProduct: any;
}

const ReviewStockxItemCell: FC<ReviewStockxItemProps> = React.memo(props => {
  const {stockxProduct} = props;

  const renderImageView = () => (
    <ImageContainer>
      <Image source={{uri: stockxProduct?.image}} />
    </ImageContainer>
  );

  const renderDescription = () => (
    <DesContainer>
      <TitleBrandContainer>
        <BrandText>{stockxProduct?.name}</BrandText>
        {/*<TitleText>{item.name}</TitleText>*/}
      </TitleBrandContainer>

      <DesBottomContainer>
        <ConditionSizeText>Condition:</ConditionSizeText>
        <ConditionSizeResultText>New With Box</ConditionSizeResultText>
      </DesBottomContainer>
      <DesBottomContainer>
        <ConditionSizeText>Size:</ConditionSizeText>
        <ConditionSizeResultText>
          {stockxProduct.chosenSize}
        </ConditionSizeResultText>
      </DesBottomContainer>
      <DesBottomContainer>
        <ConditionSizeText>Est. Value: </ConditionSizeText>
        <ConditionSizeResultText>
          $
          {
            findMarketDataFromSize(stockxProduct, stockxProduct?.chosenSize)
              ?.lastSale
          }
        </ConditionSizeResultText>
      </DesBottomContainer>
    </DesContainer>
  );

  return (
    <CellTouchable onPress={() => console.log('pres')}>
      <ItemContainer>
        {renderImageView()}
        {renderDescription()}
      </ItemContainer>
    </CellTouchable>
  );
});

export default ReviewStockxItemCell;
