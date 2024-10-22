import React, {FC, useEffect, useState} from 'react';
import {useTheme} from 'styled-components';
import {SvgXml} from 'react-native-svg';
import {getProductTags} from '../../utility/utility';
import {LIKE_HEART_ICON_WHITE, LIKE_HEART_ICON_RED} from 'localsvgimages';
import {
  ItemContainer,
  Image,
  ImageContainer,
  FreeShipingContainer,
  ShippingText,
  CellBottomView,
  BottomHeaderView,
  HeaderTextMain,
  PriceDropText,
  EmptyRowView,
  HeaderDes,
  TagsContainer,
  TagView,
  TagLabel,
  EmptyView,
  LikeTouchable,
} from './styles';
import {likeProduct, unlikeProduct} from '../../redux/modules';
import {useSelector, useDispatch} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';
import {loggingService} from '../../services/loggingService';

interface LSProductCardProps {
  onPress?: Function;
  item: any;
  liked?: boolean;
  isHorizontalView?: boolean;
  onImageLoad?: Function;
}

const LSProductCard: FC<LSProductCardProps> = React.memo(props => {
  const {
    item,
    onPress = () => {},
    isHorizontalView = false,
    onImageLoad = () => {},
  } = props;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const theme = useTheme();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;
  const dispatch = useDispatch();

  const [imageLoading, setImageLoading] = useState(true);
  const [opacity] = useState(new Animated.Value(1));

  const BlinkingImage = () => {
    return (
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          backgroundColor: 'lightgrey',
          opacity,
        }}
      />
    );
  };

  useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    const loop = Animated.loop(blink);
    loop.start();

    return () => loop.stop();
  }, []);

  const isLiked = () => {
    return userData?.likedProducts?.some(prodId => {
      return prodId === item?._id;
    });
  };

  useEffect(() => {
    if (
      isLogedIn &&
      userData?.likedProducts?.some(prodId => {
        return prodId === item?._id;
      })
    ) {
    }
  }, [isLogedIn, item?._id, userData, item]);

  const onProductPress = () => {
    navigation.navigate('ProductDetailsScreen', {
      productData: item,
      likedParam: isLiked(),
    });
    loggingService().logEvent('select_item', {
      content_type: item?.category,
      item_list_id: item?._id,
      item_list_name: item?.name,
    });
  };

  const onLikePress = () => {
    if (!isLogedIn) {
      return;
    }
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
        <ImageContainer>
          {imageLoading && <BlinkingImage />}
          <Image
            source={{uri: item.primary_photo}}
            onLoad={() => {
              setImageLoading(false);
              onImageLoad();
            }}
          />
        </ImageContainer>
        {item.who_pays === 'seller-pays' && (
          <FreeShipingContainer>
            <ShippingText>Free Shipping</ShippingText>
          </FreeShipingContainer>
        )}
        <LikeTouchable
          onPress={() => {
            isLiked() ? onUnlikePress() : onLikePress();
          }}>
          <SvgXml
            xml={isLiked() ? LIKE_HEART_ICON_RED : LIKE_HEART_ICON_WHITE}
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
            <>
              <HeaderTextMain priceDrop={item?.priceHistory?.length > 0}>
                $
                {item?.priceHistory?.length > 0
                  ? item?.priceHistory[item.priceHistory.length - 1]
                  : item?.price}
              </HeaderTextMain>
            </>
          )}
        </BottomHeaderView>
        <BottomHeaderView>
          <EmptyRowView>
            <HeaderTextMain>Size {item.size}</HeaderTextMain>
          </EmptyRowView>
          {item?.priceHistory?.length > 0 && (
            <PriceDropText>${item?.price}</PriceDropText>
          )}
        </BottomHeaderView>
      </CellBottomView>
      {renderTradeTags()}
    </ItemContainer>
  );
});

export default LSProductCard;
