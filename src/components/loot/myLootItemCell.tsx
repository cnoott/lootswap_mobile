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
  onPress?: Function;
  item?: any;
}

const MyLootCell: FC<LSMyLootCellProps> = React.memo(props => {
  const {onPress = () => {}} = props;

  const renderImageView = () => {
    return (
      <ImageContainer>
        <Image source={{uri: 'https://picsum.photos/id/237/200/300'}} />
      </ImageContainer>
    );
  };
  const renderDescription = () => {
    return (
      <DesContainer>
        <TitleText>Nike React Infinity V3</TitleText>
        <BrandText>Brand</BrandText>
        <DesBottomContainer>
          <PriceText>$240.00</PriceText>
          <LSButton
            title={'Edit Item'}
            size={Size.Extra_Small}
            type={Type.Secondary}
            onPress={onPress}
          />
        </DesBottomContainer>
      </DesContainer>
    );
  };

  return (
    <CellTouchable disabled={true}>
      <ItemContainer>
        {renderImageView()}
        {renderDescription()}
      </ItemContainer>
    </CellTouchable>
  );
});

export default MyLootCell;
