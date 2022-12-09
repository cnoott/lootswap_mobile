/***
  LootSwap - PRODUCT DETAILS SCREEN
 ***/

import React, {FC, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import CarouselComponent from '../../components/Carousel';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  Container,
  SubContainer,
  TopSpace,
  GoBackContainer,
  GoBackText,
  ProductLabel,
  ProductDetails,
  PriceLabel,
  TagsContainer,
  TagView,
  TagLabel,
  BottomSpace,
  ScrollContainer,
  GuarenteedView,
  GuarenteedDesView,
  ProtectionTopLabel,
  ProtectionBottomLabel,
  HorizontalBar,
  DescriptionLabel,
  RatingsContainer,
  ProductOwnerLabel,
} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {LEFT_PRIMARY_ARROW, SHIELD_ICON} from 'localsvgimages';
import StarRatings from '../../components/starRatings';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import {getUsersDetailsRequest} from '../../redux/modules';
import {getProductTags} from '../../utility/utility';

const height = Dimensions.get('window').height;

export const ProductDetailsScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const theme = useTheme();
  const {requestedUserDetails} = auth;
  const {productData = {}} = route?.params;
  useEffect(() => {
    if (productData?.userId) {
      // Getting Product owner details(
      dispatch(getUsersDetailsRequest(productData?.userId));
    }
  }, []);

  const renderGoBackView = () => {
    return (
      <GoBackContainer onPress={() => navigation.goBack()}>
        <SvgXml xml={LEFT_PRIMARY_ARROW} />
        <GoBackText>Go Back</GoBackText>
      </GoBackContainer>
    );
  };
  const renderTags = () => {
    return (
      <TagsContainer>
        {getProductTags(productData?.type, theme)?.map(tag => {
          return (
            <TagView backColor={tag?.backColor}>
              <TagLabel tagColor={tag?.labelColor}>{tag?.label}</TagLabel>
            </TagView>
          );
        })}
      </TagsContainer>
    );
  };
  const renderButtons = () => {
    return (
      <TopSpace>
        <LSButton
          title={'Buy Now'}
          size={Size.Full}
          type={Type.Secondary}
          onPress={() => {}}
        />
        <TopSpace />
        <LSButton
          title={'Send Offer'}
          size={Size.Full}
          type={Type.Primary}
          onPress={() => {}}
        />
      </TopSpace>
    );
  };
  const renderProtectionView = () => {
    return (
      <GuarenteedView>
        <SvgXml xml={SHIELD_ICON} />
        <GuarenteedDesView>
          <ProtectionTopLabel>Buyer Protection Gyarantee</ProtectionTopLabel>
          <ProtectionBottomLabel>
            Purchase are covered by Paypal Purchase Protection
          </ProtectionBottomLabel>
        </GuarenteedDesView>
      </GuarenteedView>
    );
  };
  const renderDescriptionView = () => {
    return (
      <TopSpace>
        <DescriptionLabel>Description</DescriptionLabel>
        <ProductDetails>{productData?.description}</ProductDetails>
      </TopSpace>
    );
  };
  const renderRatingsContainer = () => {
    return (
      <RatingsContainer>
        <LSProfileImageComponent
          profileUrl={requestedUserDetails?.profile_picture}
        />
        <GuarenteedDesView>
          <ProductOwnerLabel>{requestedUserDetails?.name}</ProductOwnerLabel>
          <StarRatings rating={requestedUserDetails?.combinedRatings} />
        </GuarenteedDesView>
      </RatingsContainer>
    );
  };
  return (
    <Container>
      <InHomeHeader />
      <ScrollContainer>
        <TopSpace />
        <CarouselComponent height={height / 2 + 40} isProduct={true} />
        <SubContainer>
          {renderGoBackView()}
          <ProductLabel>{productData?.brand}</ProductLabel>
          {!!productData?.type && renderTags()}
          <ProductDetails>{productData?.name}</ProductDetails>
          <ProductDetails>Size: {productData?.size}</ProductDetails>
          <ProductDetails>Condition: {productData?.condition}</ProductDetails>
          <PriceLabel>${productData?.price}</PriceLabel>
          {renderButtons()}
          {renderProtectionView()}
          {requestedUserDetails && (
            <>
              <HorizontalBar />
              {renderRatingsContainer()}
            </>
          )}
          <HorizontalBar />
          {renderDescriptionView()}
          <BottomSpace />
        </SubContainer>
      </ScrollContainer>
    </Container>
  );
};

export default ProductDetailsScreen;
