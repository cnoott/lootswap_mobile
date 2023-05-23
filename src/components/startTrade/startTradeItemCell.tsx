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

interface StartTradeItemCellProps {
  item: any;
  onPress?: Function;
  isReview: boolean;
}

const StartTradeItemCell: FC<StartTradeItemCellProps> = React.memo(props => {
  const {onPress = () => {}, isReview = false} = props;
  const item = props.item;

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
        <ConditionSizeResultText>{item.condition}</ConditionSizeResultText>
      </DesBottomContainer>
      <DesBottomContainer>
        <ConditionSizeText>Size:</ConditionSizeText>
        <ConditionSizeResultText>{item.size}</ConditionSizeResultText>
      </DesBottomContainer>
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
