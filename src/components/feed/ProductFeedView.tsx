import React, {FC, useEffect, useState} from 'react';
import {
  Container,
  ItemCenterContainer,
  Image,
  CarouselContainer,
  DotsComponent,
  DotsContainer,
  ProductInfoContainer,
  RowView,
  BrandText,
  PriceText,
  TimeText,
  NameText,
  LabelText,
  ReadDescText,
  TagsContainer,
  TagView,
  TagLabel,
  FadeImageContainer,
  ProductOwnerLabel,
  ProfileContainer,
  NewSellerTagView,
  NewSellerLabel,
  EmptyRowView,
  StarLabel,
} from './styles';
import {Dimensions, Alert as NativeAlert} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {moderateScale, scale} from 'react-native-size-matters';
import {getProductTags} from '../../utility/utility';
import {useTheme} from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUsersDetailsRequest,
} from '../../redux/modules';
import StarRatings from '../../components/starRatings';
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface ProductFeedViewProps {
  product: any;
}

const ProductFeedView: FC<ProductFeedViewProps> = React.memo(props => {
  const {product, product: {userId: requestedUserDetails}} = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  // TODO: we have to populate user data in product fetch
  const {userData = null, isLogedIn} = auth;

  useEffect(() => {
    if (product?.userId) {
      //dispatch(getProductDetails(productData?._id, userData?._id));

      // TODO: figure you if you still want to do this
      //dispatch(getProductDetails(product?._id, userData?._id));
    }
  }, []);

  return (
    <Container height={height * 0.9}>
      <TagsContainer>
        {getProductTags(product?.type, theme)?.map(tag => {
          return (
            <TagView backColor={tag?.backColor}>
              <TagLabel tagColor={tag?.labelColor}>{tag?.label}</TagLabel>
            </TagView>
          );
        })}
      </TagsContainer>
      <ProfileContainer>
        <LSProfileImageComponent
          profileUrl={requestedUserDetails?.profile_picture}
          imageHeight={34}
          imageWidth={35}
          imageRadius={10}
        />
        <EmptyRowView>
        <ProductOwnerLabel>
          {requestedUserDetails?.name}
        </ProductOwnerLabel>
              {requestedUserDetails?.ratings.length > 0 ? null : (
                <NewSellerTagView>
                  <NewSellerLabel>New Seller</NewSellerLabel>
                </NewSellerTagView>
              )}
          <>
          {requestedUserDetails?.ratings.length > 0 && (
            <>
              <StarIconSolid
                size={moderateScale(16)}
                color={'yellow'}
              />
              <StarLabel>
                {` (${requestedUserDetails?.ratings?.length} Reviews)`}
              </StarLabel>
            </>
          )}
          </>
        </EmptyRowView>
      </ProfileContainer>
      <CarouselContainer>
        <Carousel
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={true}
          width={width}
          height={height / 1.6}
          parallaxScrollingOffset={50} // What does this do again?
          autoPlay={false}
          keyExtractor={item => item._id}
          onSnapToItem={newIndex => setActiveIndex(newIndex)}
          data={[product.primary_photo, ...product.secondary_photos]}
          renderItem={({index, item}) => (
            <>
          <FadeImageContainer>
            <Image source={{uri: item}} width={width} height={height} />
            <LinearGradient
              colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4%',
              }}
            />
            </FadeImageContainer>

              <ItemCenterContainer>
                <Image width={'100%'} height={'100%'} source={{uri: item}} />
              </ItemCenterContainer>
            </>
          )}
        />
        <DotsContainer>
          <DotsComponent
            length={product.secondary_photos.length + 1}
            active={activeIndex}
          />
        </DotsContainer>
      </CarouselContainer>
      <ProductInfoContainer>
        <RowView>
          <BrandText>{product.brand}  <TimeText>2d ago</TimeText></BrandText>
          <PriceText>${parseFloat(product.price).toFixed(2)}</PriceText>
        </RowView>
        <RowView>
          <NameText>{product.name}</NameText>
        </RowView>
        <RowView>
          <LabelText>Condition: <NameText>{product.condition}</NameText></LabelText>
        </RowView>
        <RowView>
          <LabelText>Size: <NameText>{product.size}</NameText></LabelText>
        </RowView>
        <RowView>
          <ReadDescText>Read Description</ReadDescText>
        </RowView>
      </ProductInfoContainer>
    </Container>
  );

});

export default ProductFeedView;
