import React, {FC} from 'react';
import {useTheme} from 'styled-components';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {getProductTags} from '../../utility/utility';
import {LIKE_HEART_ICON_WHITE} from 'localsvgimages';
import {
  ItemContainer,
  Image,
  FreeShipingContainer,
  ShippingText,
  CellBottomView,
  BottomHeaderView,
  HeaderTextMain,
  EmptyRowView,
  HeaderDes,
  TagsContainer,
  TagView,
  TagLabel,
  EmptyView,
  TimeText,
  LikeTouchable,
} from './styles';

interface LSProductCardProps {
  onPress?: Function;
  onLikePress?: Function;
  item: any;
}

const LSProductCard: FC<LSProductCardProps> = React.memo(props => {
  const {item, onPress = () => {}, onLikePress = () => {}} = props;
  const theme = useTheme();
  const renderTradeTags = () => {
    return (
      <TagsContainer>
        {getProductTags(item?.type, theme)?.map(tag => {
          return (
            <TagView backColor={tag?.backColor}>
              <TagLabel tagColor={tag?.labelColor}>{tag?.label}</TagLabel>
            </TagView>
          );
        })}
      </TagsContainer>
    );
  };

  return (
    <ItemContainer onPress={() => onPress()}>
      <EmptyView>
        <Image source={{uri: item.primary_photo}} />
        {item.who_pays === 'seller-pays' && (
          <FreeShipingContainer>
            <ShippingText>Free Shipping</ShippingText>
          </FreeShipingContainer>
        )}
        <LikeTouchable onPress={() => onLikePress()}>
          <SvgXml xml={LIKE_HEART_ICON_WHITE} color={'white'} />
        </LikeTouchable>
      </EmptyView>
      <CellBottomView>
        <BottomHeaderView>
          <EmptyRowView>
            <HeaderTextMain>{item.brand}</HeaderTextMain>
          </EmptyRowView>
        </BottomHeaderView>
        <BottomHeaderView isMiddle={true}>
          <EmptyRowView>
            <HeaderDes>{item.name}</HeaderDes>
          </EmptyRowView>
          <HeaderTextMain>${item.price}</HeaderTextMain>
        </BottomHeaderView>
        <EmptyRowView>
          <HeaderTextMain>Size {item.size}</HeaderTextMain>
        </EmptyRowView>
      </CellBottomView>
      {renderTradeTags()}
    </ItemContainer>
  );
});

export default LSProductCard;
