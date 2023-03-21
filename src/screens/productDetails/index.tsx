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
} from 'localsvgimages';
import StarRatings from '../../components/starRatings';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import SendOfferModal from '../offers/offerItems/SendOfferModal';
import {
  getUsersDetailsRequest,
  getProductDetails,
  getMessageInitiatedStatus,
  createFirstMessage,
  getProductListedItemsForOffer,
  sendTradeOffer,
  getTradesHistory,
  UpdateAddProductData,
  likeProduct,
  unlikeProduct,
  getMyDetailsNoLoadRequest,
  deleteProduct,
} from '../../redux/modules';
import {getProductTags, configureAndGetLootData} from '../../utility/utility';
import {Alert} from 'custom_top_alert';
import {Trade_Options} from 'custom_enums';

const height = Dimensions.get('window').height;

export const ProductDetailsScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const homeStates: AuthProps = useSelector(state => state.home);
  const tradesData: TradeProps = useSelector(state => state.offers);
  const {historyTrades} = tradesData;
  const theme = useTheme();
  const [isSendOfferModalVisible, setSendOfferModalVisible] = useState(false);
  const [sendOfferItems, setSendOfferItems] = useState([]);
  const {requestedUserDetails, userData, isLogedIn} = auth;
  const {selectedProductDetails} = homeStates;
  const {productData = {}, likedParam} = route?.params;
  const [liked, setLiked] = useState(likedParam);

  useEffect(() => {
    if (likedParam) {
      setLiked(true);
    }
    if (
      isLogedIn &&
      userData?.likedProducts?.some(prod => {
        return (
          prod?._id === productData?.objectID || prod?._id === productData?._id
        );
      })
    ) {
      setLiked(true);
    }
    if (isLogedIn) {
      dispatch(
        getTradesHistory({
          userId: userData?._id,
        }),
      );
    }
    if (productData?.userId) {
      dispatch(getUsersDetailsRequest(productData?.userId));
      dispatch(getProductDetails(productData?.objectID));
    }
  }, [
    dispatch,
    productData?.userId,
    productData?.objectID,
    isLogedIn,
    userData?.likedProducts,
    userData?._id,
    likedParam,
    productData?._id,
  ]);

  const onLikePress = () => {
    if (!isLogedIn) {
      return;
    }
    const reqData = {
      userId: userData?._id,
      productId: productData?.objectID,
    };
    setLiked(true);
    dispatch(likeProduct(reqData));
    dispatch(getMyDetailsNoLoadRequest(userData?._id));
  };

  const onUnlikePress = () => {
    const reqData = {
      userId: userData?._id,
      productId: productData?.objectID,
    };
    setLiked(false);
    dispatch(unlikeProduct(reqData));
    dispatch(getMyDetailsNoLoadRequest(userData?._id));
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
      productId: productData?.objectID,
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
      recieverId: productData?.userId,
      senderId: userData?._id,
      productId: productData?.objectID,
    };
    dispatch(
      createFirstMessage(
        reqObj,
        (res: any) => {
          console.log('RESPONSE', res);
          navigation.navigate('UserChatScreen', {
            messageId: res.messageId,
          });
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

  const onBuyNowPress = () => {
    if (!isLogedIn) {
      goToLogin();
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{name: 'ProductDetailsScreen'}],
    });
    navigation.navigate('CheckoutScreen', {
      productData: selectedProductDetails,
    });
  };

  const onMessagePress = () => {
    if (!isLogedIn) {
      goToLogin();
      return;
    }
    dispatch(
      getMessageInitiatedStatus(
        JSON.stringify({
          userId: userData?._id,
          productId: productData?.objectID,
        }),
        (res: any) => {
          if (res?.noMessage) {
            initiateFirstMessage();
          } else {
            navigation.navigate('UserChatScreen', {
              messageId: res.messageId,
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
    dispatch(
      getProductListedItemsForOffer(
        userData?._id,
        (response: any) => {
          setSendOfferItems(response);
          setSendOfferModalVisible(true);
        },
        () => {
          Alert.showError('Something went wrong!');
        },
      ),
    );
  };

  const sendFinalOffer = (selectedItems: Array<any>, price: any) => {
    const idsList = selectedItems?.map(offerItem => {
      return offerItem?._id;
    });
    const reqData = {
      reciever: productData?.userId,
      recieverItem: productData.objectID,
      sender: userData?._id,
      senderItems: idsList,
      senderMoneyOffer: price,
    };
    dispatch(
      sendTradeOffer(
        reqData,
        res => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Offers/Inbox'}],
          });
          navigation.navigate('Offers/Inbox', {
            screen: 'OffersMessageScreen',
            params: {
              item: res,
            },
          });
          setSendOfferModalVisible(false);
          dispatch(
            getTradesHistory({
              userId: userData?._id,
            }),
          );
        },
        error => {
          console.log('error ====', error);
        },
      ),
    );
  };

  const updateOfferData = (newData: Array<any>) => {
    setSendOfferItems([...newData]);
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
                productId: selectedProductDetails._id,
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
    } else if (
      isLogedIn &&
      historyTrades?.some(
        trade => trade.recieverItem._id === productData?.objectID,
      )
    ) {
      return (
        <TopSpace>
          <LSButton
            title={'Already Trading'}
            size={Size.Full}
            type={Type.Secondary}
            onPress={onBuyNowPress}
          />
        </TopSpace>
      );
    } else {
      return (
        <TopSpace>
          <LSButton
            title={'Buy Now'}
            size={Size.Full}
            type={Type.Secondary}
            onPress={onBuyNowPress}
          />
          <TopSpace />
          <LSButton
            title={'Send Offer'}
            size={Size.Full}
            type={Type.Primary}
            onPress={() => onSendOfferPress()}
          />
          <TopSpace />
          <LSButton
            title={'Message'}
            size={Size.Full}
            type={Type.Grey}
            onPress={onMessagePress}
          />
        </TopSpace>
      );
    }
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
              {requestedUserDetails?.combinedRatings > 0 ? null : (
                <NewSellerTagView>
                  <NewSellerLabel>New Seller</NewSellerLabel>
                </NewSellerTagView>
              )}
            </EmptyRowView>
            <EmptyRowView>
              {requestedUserDetails?.combinedRatings > 0 ? (
                <>
                  <StarRatings rating={requestedUserDetails?.combinedRatings} />
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
      <InStackHeader back={true} title={''} />
      {requestedUserDetails && (
        <ScrollContainer>
          <CarouselComponent
            height={height / 2 + 40}
            isProduct={true}
            autoPlay={false}
            loop={false}
            imagesArr={selectedProductDetails?.product_photos}
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
                  Size: <BoldText>{productData?.size}</BoldText>
                </ProductDetails>
                {productData?.type !== Trade_Options?.TradeOnly && (
                  <PriceLabel>${productData?.price}</PriceLabel>
                )}
                {selectedProductDetails?.type !== Trade_Options?.TradeOnly && (
                  <ShippingLabel>
                    +${selectedProductDetails?.sellerShippingCost} Shipping Cost
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
                </LikeTouchable>
              </DetailsRightView>
            </DetailsContainer>
            <HorizontalBar />
            {renderProtectionView()}
            {requestedUserDetails && <>{renderUserDetailsView()}</>}
            <HorizontalBar />
            {renderDescriptionView()}
            {!!productData?.interestedIn && renderLookingForView()}
            {renderButtons()}
            <BottomSpace />
          </SubContainer>
        </ScrollContainer>
      )}
      <SendOfferModal
        isModalVisible={isSendOfferModalVisible}
        onCloseModal={() => setSendOfferModalVisible(false)}
        itemsData={sendOfferItems || []}
        updateOfferData={updateOfferData}
        sendFinalOffer={sendFinalOffer}
      />
    </Container>
  );
};

export default ProductDetailsScreen;
