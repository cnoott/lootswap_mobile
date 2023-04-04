import React, {FC} from 'react';
import {
  ItemContainer,
  CellTouchable,
  ImageContainer,
  TitleText,
  DesContainer,
  BrandText,
  DesBottomContainer,
  PriceText,
  Image,
} from './styles';
import {Size, Type} from '../../enums';
import LSButton from '../../components/commonComponents/LSButton';

interface LSMyLootCellProps {
  onEditLootPress?: Function;
  item?: any;
  onPress?: Function;
}

const MyLootCell: FC<LSMyLootCellProps> = React.memo(props => {
  const {onEditLootPress = () => {}, onPress = () => {}} = props;
  const item = props.item.item;

  const renderImageView = () => {
    return (
      <ImageContainer>
        <Image source={{uri: item.primary_photo}} />
      </ImageContainer>
    );
  };
  const renderDescription = () => {
    return (
      <DesContainer>
        <TitleText>{item.name}</TitleText>
        <BrandText>{item.brand}</BrandText>
        <DesBottomContainer>
          <PriceText>${item.price}</PriceText>
          <LSButton
            title={'Edit Item'}
            size={Size.Extra_Small}
            type={Type.Secondary}
            onPress={() => onEditLootPress()}
          />
        </DesBottomContainer>
      </DesContainer>
    );
  };

  return (
    <CellTouchable onPress={() => onPress()}>
      <ItemContainer>
        {renderImageView()}
        {renderDescription()}
      </ItemContainer>
    </CellTouchable>
  );
});

export default MyLootCell;
