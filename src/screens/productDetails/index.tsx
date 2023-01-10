/***
  LootSwap - PRODUCT DETAILS SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
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
} from '../../redux/modules';
import {getProductTags, configureAndGetLootData} from '../../utility/utility';
import {Alert} from 'custom_top_alert';

const height = Dimensions.get('window').height;

export const ProductDetailsScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const homeStates: AuthProps = useSelector(state => state.home);
  const theme = useTheme();
  const [isSendOfferModalVisible, setSendOfferModalVisible] = useState(false);
  const [sendOfferItems, setSendOfferItems] = useState([]);
  const {requestedUserDetails, userData, isLogedIn} = auth;
  const {selectedProductDetails} = homeStates;
  const {productData = {}} = route?.params;

  useEffect(() => {
    if (productData?.userId) {
      dispatch(getUsersDetailsRequest(productData?.userId));
      dispatch(getProductDetails(productData?.objectID));
    }
  }, [dispatch, productData?.userId, productData?.objectID]);

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
          const url = res?.url;
          const urlData = url.split('/');
          navigation.navigate('UserChatScreen', {
            messageId: urlData[2],
            productOwnerId: productData?.userId,
            productOwnerName: requestedUserDetails?.name || 'Owner',
          });
        },
        (error: any) => {
          console.log('error ===', error);
        },
      ),
    );
  };

  const onMessagePress = () => {
    if (isLogedIn) {
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
                messageId: res?.messageDoc?._id,
                productOwnerId: productData?.userId,
                productOwnerName: requestedUserDetails?.name || 'Owner',
              });
            }
          },
          () => {
            Alert.showError('Something went wrong!');
          },
        ),
      );
    } else {
      Alert.showError('Please Login first');
    }
  };

  const onSendOfferPress = () => {
    dispatch(
      getProductListedItemsForOffer(
        productData?.userId,
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
          console.log('Success ====', res);
          navigation.navigate('OffersMessageScreen', {item: res});
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
    if (userData?._id === requestedUserDetails?._id) {
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
            onPress={() => {}}
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
            onPress={() => {}}
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
          imageHeight={42}
          imageWidth={42}
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
      {requestedUserDetails && (
        <ScrollContainer>
          <TopSpace />
          <CarouselComponent
            height={height / 2 + 40}
            isProduct={true}
            autoPlay={false}
            loop={false}
            imagesArr={
              selectedProductDetails?.secondary_photos || [
                selectedProductDetails?.primary_photo,
              ]
            }
            showDummy={false}
          />
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
