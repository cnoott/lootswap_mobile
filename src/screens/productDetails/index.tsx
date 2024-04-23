/***
  LootSwap - PRODUCT DETAILS SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
import {Dimensions, Alert as NativeAlert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import CarouselComponent from '../../components/Carousel';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {TradeProps} from '../../redux/modules/offers/reducer';
import {
  Container,
  SubContainer,
  TopSpace,
  ProductLabel,
  ProductDetails,
  PriceLabel,
  PriceContainer,
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
  ProductName,
  BoldText,
  ShippingLabel,
  DetailsContainer,
  DetailsLeftView,
  DetailsRightView,
  SVGImageStyle,
  ProtectionIconStyle,
  SellerInfoLabel,
  EmptyRowView,
  NewSellerTagView,
  NewSellerLabel,
  DescriptionContainerView,
  ButtonContainer,
  MessageButtonWrapper,
  ShareButtonTouchable,
} from './styles';
import {LikeTouchable} from '../../components/productCard/styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  SHIELD_ICON,
  LIKE_HEART_ICON,
  LIKE_HEART_ICON_RED,
  PAY_PAL_LABEL,
  LOOT_SWAP_LOGO_LABEL,
  SHARE_ICON,
} from 'localsvgimages';
import {Share} from 'react-native';
import StarRatings from '../../components/starRatings';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import {
  getUsersDetailsRequest,
  getProductDetails,
  getMessageInitiatedStatus,
  getAllMyMessages,
  createFirstMessage,
  getTradesHistory,
  UpdateAddProductData,
  likeProduct,
  unlikeProduct,
  deleteProduct,
  preselectChosenItem,
  getMyDetailsNoLoadRequest,
} from '../../redux/modules';
import {
  getProductTags,
  configureAndGetLootData,
  isAlreadyTrading,
  convertUsSizeToEu,
  handleSendOfferNavigation,
} from '../../utility/utility';
import {Alert} from 'custom_top_alert';
import {Trade_Options, Deal_Type} from 'custom_enums';
import defaultExport from '@react-native-firebase/messaging';
import DealBadge from '../../components/dealBadges';
import {loggingService} from '../../services/loggingService';
import ProductShareModal from '../../components/product/ProductShareModal';

const height = Dimensions.get('window').height;

export const ProductDetailsScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const homeStates: AuthProps = useSelector(state => state.home);
  const {selectedProductDetails} = homeStates;
  const tradesData: TradeProps = useSelector(state => state.offers);
  const {historyTrades} = tradesData;
  const theme = useTheme();
  const {requestedUserDetails, userData, isLogedIn} = auth;
  const {productData = {}, likedParam} = route?.params;
  const [liked, setLiked] = useState(likedParam);
  const [timesLiked, setTimesLiked] = useState(productData?.timesLiked);

  const [shareModalVisible, setShareModalVisible] = useState(false);

  useEffect(() => {
    if (likedParam) {
      setLiked(true);
    }
    if (
      isLogedIn &&
      userData?.likedProducts?.some(prod => {
        return prod?._id === productData?._id;
      })
    ) {
      setLiked(true);
    }
    if (isLogedIn) {
      dispatch(getMyDetailsNoLoadRequest(userData?._id));
      dispatch(
        getTradesHistory({
          userId: userData?._id,
        }),
      );
    }
    if (productData?.userId) {
      dispatch(getUsersDetailsRequest(productData?.userId));
      dispatch(getProductDetails(productData?._id));
    }
  }, [productData?.userId, isLogedIn, likedParam, productData?._id]);

  useEffect(() => {
    if (selectedProductDetails?.timesLiked) {
      setTimesLiked(parseInt(selectedProductDetails?.timesLiked));
    }
  }, [selectedProductDetails?.timesLiked]);

  const onLikePress = () => {
    if (!isLogedIn) {
      return;
    }
    const reqData = {
      userId: userData?._id,
      productId: productData?._id,
    };
    setTimesLiked(timesLiked + 1);
    setLiked(true);
    dispatch(likeProduct(reqData));
  };

  const onUnlikePress = () => {
    const reqData = {
      userId: userData?._id,
      productId: productData?._id,
    };
    setTimesLiked(timesLiked - 1);
    setLiked(false);
    dispatch(unlikeProduct(reqData));
  };

  const handleGoToTrade = () => {
    const trade = isAlreadyTrading(historyTrades, productData?._id);
    if (trade) {
      navigation?.navigate('OffersMessageScreen', {item: trade});
    }
  };

  const handleYouSureDeleteProduct = () => {
    NativeAlert.alert('Are you sure?', 'You cannot undo deleting a product', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: "I'm sure", onPress: () => handleDeleteProduct()},
    ]);
  };

  const handleDeleteProduct = () => {
    const reqData = {
      userId: userData?._id,
      productId: productData?._id,
    };
    dispatch(
      deleteProduct(
        reqData,
        () => {
          console.log('successfully delete item');
        },
        err => {
          console.log('There was an error in deleteing an item: ', err);
        },
      ),
    );
  };

  const initiateFirstMessage = () => {
    const reqObj = {
      userId: userData?._id,
      receiverId: productData?.userId,
      senderId: userData?._id,
      productId: productData?._id,
    };
    dispatch(
      createFirstMessage(
        reqObj,
        (res: any) => {
          console.log('RESPONSE', res);
          navigation.navigate('UserChatScreen', {
            messageId: res.messageId,
          });
          loggingService().logEvent('start_message', {
            id: res.messageId,
          });

          dispatch(getAllMyMessages(userData?._id));
        },
        (error: any) => {
          console.log('error ===', error);
        },
      ),
    );
  };

  const goToLogin = () => {
    navigation.navigate('SignInScreen');
  };

  const toggleShareModal = () => {
    if (!isLogedIn) {
      goToLogin();
      return;
    }
    setShareModalVisible(!shareModalVisible);
  };

  const onBuyNowPress = () => {
    if (!isLogedIn) {
      goToLogin();
      return;
    }

    navigation.navigate('CheckoutScreen', {
      productData: productData,
    });
  };

  const onMessagePress = () => {
    if (!isLogedIn) {
      goToLogin();
      return;
    }

    if (
      isLogedIn &&
      historyTrades &&
      isAlreadyTrading(historyTrades, selectedProductDetails?._id)
    ) {
      handleGoToTrade();
      return;
    }
    dispatch(
      getMessageInitiatedStatus(
        JSON.stringify({
          userId: userData?._id,
          productId: productData?._id,
        }),
        (res: any) => {
          if (res?.noMessage) {
            initiateFirstMessage();
          } else {
            navigation.navigate('UserChatScreen', {
              messageId: res.messageId,
            });
            loggingService().logEvent('start_message', {
              id: res.messageId,
            });
          }
        },
        () => {
          Alert.showError('Something went wrong!');
        },
      ),
    );
  };

  const onSendOfferPress = () => {
    if (!isLogedIn) {
      goToLogin();
      return;
    }
    dispatch(preselectChosenItem(productData?._id));

    handleSendOfferNavigation(
      navigation,
      productData.type,
      userData,
      requestedUserDetails,
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

  // XXX This code (sort of) repeats itself in the MessageOptionsModal
  const renderInteractButtons = () => {
    if (isLogedIn && userData?._id === productData?.userId) {
      return <></>;
    }
    if (!selectedProductDetails?.isVisible) {
      return (
        <ButtonContainer>
          <LSButton
            title={'Item No Longer Available'}
            size={Size.Full}
            type={Type.View}
            onPress={() => {}}
          />
        </ButtonContainer>
      );
    } else if (
      isLogedIn &&
      historyTrades &&
      isAlreadyTrading(historyTrades, selectedProductDetails?._id)
    ) {
      return (
        <ButtonContainer>
          <LSButton
            title={'Go To Trade'}
            size={Size.Full}
            radius={100}
            type={Type.Primary}
            onPress={() => handleGoToTrade()}
          />
        </ButtonContainer>
      );
    } else {
      return (
        <ButtonContainer>
          <LSButton
            title={'Send Offer'}
            size={Size.Custom}
            customWidth={'45%'}
            radius={100}
            type={Type.Primary}
            onPress={() => onSendOfferPress()}
          />
          {selectedProductDetails.type !== 'trade-only' && (
            <LSButton
              title={'Buy Now'}
              size={Size.Custom}
              customWidth={'45%'}
              radius={100}
              type={Type.Secondary}
              onPress={onBuyNowPress}
            />
          )}
        </ButtonContainer>
      );
    }
  };

  const renderEditButtons = () => {
    if (isLogedIn && userData?._id === requestedUserDetails?._id) {
      return (
        <TopSpace>
          <LSButton
            title={'Edit Item'}
            size={Size.Full}
            type={Type.Secondary}
            onPress={() => {
              const prodData = configureAndGetLootData(selectedProductDetails);
              dispatch(UpdateAddProductData(prodData));
              navigation.navigate('AddProductOverviewScreen', {
                isFromEdit: true,
                productId: productData._id,
              });
            }}
          />
          <TopSpace />
          <LSButton
            title={'Delete Item'}
            size={Size.Full}
            type={Type.Error}
            onPress={() => handleYouSureDeleteProduct()}
          />
        </TopSpace>
      );
    }
    return <></>;
  };
  const renderProtectionView = () => {
    return (
      <GuarenteedView>
        <SvgXml xml={SHIELD_ICON} style={ProtectionIconStyle} />
        <GuarenteedDesView>
          <ProtectionTopLabel>
            Buyer & Trade protection Guarantee
          </ProtectionTopLabel>
          <ProtectionBottomLabel>
            {'Protection Purchases are covered by\n'}{' '}
            <SvgXml xml={PAY_PAL_LABEL} style={SVGImageStyle} /> Purchase
            Protection & Trades are covered by{' '}
            <SvgXml xml={LOOT_SWAP_LOGO_LABEL} style={SVGImageStyle} /> manual
            Verification
          </ProtectionBottomLabel>
        </GuarenteedDesView>
      </GuarenteedView>
    );
  };
  const renderDescriptionView = () => {
    return (
      <DescriptionContainerView>
        <DescriptionLabel>Description</DescriptionLabel>
        <TopSpace space={5} />
        <ProductDetails>{productData?.description}</ProductDetails>
      </DescriptionContainerView>
    );
  };
  const renderLookingForView = () => {
    return (
      <DescriptionContainerView>
        <DescriptionLabel>This user is looking for</DescriptionLabel>
        <TopSpace space={5} />
        <ProductDetails>{productData?.interestedIn}</ProductDetails>
      </DescriptionContainerView>
    );
  };
  const renderUserDetailsView = () => {
    return (
      <>
        <SellerInfoLabel>SELLER INFO :</SellerInfoLabel>
        <RatingsContainer
          onPress={() =>
            navigation.navigate('PublicProfileScreen', {
              requestedUserDetails: requestedUserDetails,
            })
          }>
          <LSProfileImageComponent
            profileUrl={requestedUserDetails?.profile_picture}
            imageHeight={57}
            imageWidth={57}
            imageRadius={10}
          />
          <GuarenteedDesView>
            <EmptyRowView>
              <ProductOwnerLabel>
                {requestedUserDetails?.name}
              </ProductOwnerLabel>
              {requestedUserDetails?.ratings.length > 0 ? null : (
                <NewSellerTagView>
                  <NewSellerLabel>New Seller</NewSellerLabel>
                </NewSellerTagView>
              )}
            </EmptyRowView>
            <EmptyRowView>
              {requestedUserDetails?.ratings.length > 0 ? (
                <>
                  <StarRatings
                    rating={Math.floor(
                      requestedUserDetails?.ratings?.reduce(
                        (total, next) => (total += next.rating),
                        0,
                      ) / requestedUserDetails?.ratings.length,
                    )}
                  />
                  <ShippingLabel>
                    {` (${requestedUserDetails?.ratings?.length} Reviews)`}
                  </ShippingLabel>
                </>
              ) : (
                <ShippingLabel>No Reviews yet</ShippingLabel>
              )}
            </EmptyRowView>
          </GuarenteedDesView>
        </RatingsContainer>
      </>
    );
  };
  return (
    <Container>
      <InStackHeader
        back={true}
        title={''}
        right={true}
        onlyTitleCenterAlign={true}
        rightIcon={SHARE_ICON}
        onRightIconPress={toggleShareModal}
      />
      <ScrollContainer>
        <CarouselComponent
          height={height / 2 + 40}
          isProduct={true}
          autoPlay={false}
          loop={false}
          imagesArr={[
            productData?.primary_photo,
            ...productData?.secondary_photos,
          ]}
          showDummy={false}
        />
        <SubContainer>
          <DetailsContainer>
            <DetailsLeftView>
              {!!productData?.type && renderTags()}
              <ProductLabel>{productData?.brand}</ProductLabel>
              <ProductName>{productData?.name}</ProductName>
              <ProductDetails>
                Condition: <BoldText>{productData?.condition}</BoldText>
              </ProductDetails>
              <ProductDetails>
                Size:{' '}
                <BoldText>{convertUsSizeToEu(productData?.size)}</BoldText>
              </ProductDetails>
              {productData?.type !== Trade_Options?.TradeOnly && (
                <PriceContainer>
                  <PriceLabel>${productData?.price}</PriceLabel>
                  {/*selectedProductDetails?.stockxId && (
                  <DealBadge
                    fromProductPage={true}
                    item={selectedProductDetails}
                  />
                  )*/}
                </PriceContainer>
              )}
              {productData?.type !== Trade_Options?.TradeOnly && (
                <ShippingLabel>
                  +${productData?.sellerShippingCost} Shipping Cost
                </ShippingLabel>
              )}
            </DetailsLeftView>
            <DetailsRightView>
              <LikeTouchable
                onPress={() => {
                  liked ? onUnlikePress() : onLikePress();
                }}>
                <SvgXml
                  xml={liked ? LIKE_HEART_ICON_RED : LIKE_HEART_ICON}
                  color={'white'}
                />
                <ProductDetails>{timesLiked}</ProductDetails>
              </LikeTouchable>
            </DetailsRightView>
          </DetailsContainer>
          <HorizontalBar />
          {renderProtectionView()}
          {requestedUserDetails && <>{renderUserDetailsView()}</>}
          {isLogedIn && requestedUserDetails?._id !== userData?._id && (
            <MessageButtonWrapper>
              <LSButton
                title={'Message'}
                size={Size.Custom}
                customWidth={'100%'}
                customHeight={50}
                radius={100}
                type={Type.Grey}
                onPress={onMessagePress}
              />
            </MessageButtonWrapper>
          )}
          {renderDescriptionView()}
          {!!productData?.interestedIn && renderLookingForView()}
          {renderEditButtons()}
          <BottomSpace />
        </SubContainer>
      </ScrollContainer>

      {renderInteractButtons()}
      <ProductShareModal
        isVisible={shareModalVisible}
        onCloseModal={() => setShareModalVisible(false)}
        productDetails={productData}
      />
    </Container>
  );
};

export default ProductDetailsScreen;
