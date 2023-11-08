/***
  LootSwap - REVIEW SCREEN
 ***/

import React, {FC, useState} from 'react';
import {
  Container,
  ProfileContainerView,
  Image,
  UserNameText,
  StarContainer,
  ButtonContainer,
  CommentsText,
} from './submitReviewScreenStyles';
import {KeyboardAvoidingView} from './myOrdersStyle';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native';
import {StarIcon} from 'react-native-heroicons/outline';
import {moderateScale} from 'react-native-size-matters';
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';
import {useTheme} from 'styled-components';
import LSInput from '../../components/commonComponents/LSInput';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {newRating, getAllOrders} from '../../redux/modules/';
import {Alert} from 'custom_top_alert';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const SubmitReviewScreen: FC<{}> = ({route}) => {
  const {orderDetails, isTradeOrder = false} = route.params;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const dispatch = useDispatch();
  const isReciever = orderDetails?.reciever?._id === userData?._id;
  const isSeller = orderDetails?.sellerId?._id === userData?._id;
  const theme = useTheme();
  const [chosenRating, setChosenRating] = useState(4); // 1,2,3,4,5
  const [comment, setComment] = useState('');

  const submitRating = () => {
    let otherUserId;
    let ratingType;
    if (isTradeOrder) {
      otherUserId = isReciever ? orderDetails?.sender?._id : orderDetails?.reciever?._id;
      ratingType = 'trade-order';
    } else {
      otherUserId = isSeller ? orderDetails?.buyerId?._id : orderDetails?.sellerId?._id;
      ratingType = 'paypal-order';
    }
    const reqData = { //I know some of the attributes are redudant (too lazy to change backend)
      userId: userData?._id,
      otherUserId: otherUserId,
      orderId: orderDetails?._id,
      ratingData: {
        rating: chosenRating,
        description: comment,
        ratingType: ratingType,
        orderId: orderDetails?._id,
        userId: userData?._id,
      },
    };
    dispatch(
      newRating(
        reqData,
        () => {
          console.log('success');
          dispatch(
            getAllOrders({
              userId: userData?._id,
            }),
          );
          Alert.showSuccess('Rating Submitted!');
          navigation.goBack();
        },
        () => {
          console.log('error');
        },
      ),
    );
  };

  const renderPfpCondition = () => {
    if (isTradeOrder) {
      return (
        <>
          {isReciever ? (
            <Image source={{uri: orderDetails?.sender?.profile_picture}} />
          ) : (
            <Image source={{uri: orderDetails?.reciever?.profile_picture}} />
          )}
        </>
      );
    } else {
      return (
        <>
          {isSeller ? (
            <Image source={{uri: orderDetails?.buyerId?.profile_picture}} />
          ) : (
            <Image source={{uri: orderDetails?.sellerId?.profile_picture}} />
          )}
        </>
      );
    }
  };

  const renderNameCondition = () => {
    if (isTradeOrder) {
      return (
        <>
          {isReciever ? (
            <UserNameText>{orderDetails?.sender?.name}</UserNameText>
          ) : (
            <UserNameText>{orderDetails?.reciever?.name}</UserNameText>
          )}
        </>
      );
    } else {
      return (
        <>
          {isSeller ? (
            <UserNameText>{orderDetails?.buyerId?.name}</UserNameText>
          ) : (
            <UserNameText>{orderDetails?.sellerId?.name}</UserNameText>
          )}
        </>
      );
    }
  };

  const chooseRating = () => (
    <StarContainer>
      {[...new Array(5).keys()].map(ratIndex => {
        if (chosenRating > ratIndex) {
          return (
            <StarIconSolid
              key={ratIndex}
              size={moderateScale(45)}
              color={theme?.colors?.primary}
              onPress={() => setChosenRating(ratIndex + 1)}
            />
          );
        } else {
          return (
            <StarIcon
              key={ratIndex}
              size={moderateScale(45)}
              onPress={() => setChosenRating(ratIndex + 1)}
          />
          );
        }
      })}

    </StarContainer>
  );

  return (
    <Container>
      <InStackHeader title={'Give a Rating'} />
      <KeyboardAvoidingView>
        <ScrollView>
        <ProfileContainerView>{renderPfpCondition()}</ProfileContainerView>
        {renderNameCondition()}
        {chooseRating()}

        <CommentsText>Comments</CommentsText>

        <LSInput
          onChangeText={setComment}
          value={comment}
          placeholder={'How was your experience?'}
          returnKeyLabel={'done'}
          multiline={true}
          height={80}
        />
        <ButtonContainer>
          <LSButton
            title={'Submit'}
            size={Size.Full}
            type={Type.Primary}
            radius={20}
            onPress={() => submitRating()}
          />
        </ButtonContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SubmitReviewScreen;
