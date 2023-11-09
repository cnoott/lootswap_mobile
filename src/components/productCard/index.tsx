import React, {FC, useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {SvgXml} from 'react-native-svg';
import {getProductTags} from '../../utility/utility';
import {LIKE_HEART_ICON_WHITE, LIKE_HEART_ICON_RED} from 'localsvgimages';
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
  LikeTouchable,
} from './styles';
import {
  likeProduct,
  unlikeProduct,
  getMyDetailsNoLoadRequest,
} from '../../redux/modules';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface LSProductCardProps {
  onPress?: Function;
  item: any;
  liked?: boolean;
  isHorizontalView?: boolean;
}

const LSProductCard: FC<LSProductCardProps> = React.memo(props => {
  const {item, onPress = () => {}, isHorizontalView = false} = props;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const theme = useTheme();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (
      isLogedIn &&
      userData?.likedProducts?.some(prodId => {
        return prodId === item?._id;
      })
    ) {
      setLiked(true);
    }
  }, [isLogedIn, item?._id, userData, item]);

  const onProductPress = () => {
    navigation.navigate('ProductDetailsScreen', {
      productData: item,
      likedParam: liked,
    });
  };

  const onLikePress = () => {
    if (!isLogedIn) {
      return;
    }
    setLiked(true);
    const reqData = {
      userId: userData?._id,
      productId: item?._id,
    };
    dispatch(likeProduct(reqData));
  };
  const onUnlikePress = () => {
    if (!isLogedIn) {
      return;
    }
    const reqData = {
      userId: userData?._id,
      productId: item?._id,
    };
    setLiked(false);
    dispatch(unlikeProduct(reqData));
  };
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
    <ItemContainer
      onPress={() => onProductPress()}
      isHorizontalView={isHorizontalView}>
      <EmptyView>
        <Image source={{uri: item.primary_photo}} />
        {item.who_pays === 'seller-pays' && (
          <FreeShipingContainer>
            <ShippingText>Free Shipping</ShippingText>
          </FreeShipingContainer>
        )}
        <LikeTouchable
          onPress={() => {
            liked ? onUnlikePress() : onLikePress();
          }}>
          <SvgXml
            xml={liked ? LIKE_HEART_ICON_RED : LIKE_HEART_ICON_WHITE}
            color={'white'}
          />
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
          {item.type !== 'trade-only' && (
            <HeaderTextMain>${item.price}</HeaderTextMain>
          )}
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
