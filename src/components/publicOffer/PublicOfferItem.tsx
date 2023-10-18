import React, {FC, useState} from 'react';
import {
  RowView,
  EmptyRowView,
  OwnerDetailsView,
  NameLabel,
  OfferCellContainer,
  PublicOfferDeleteContainer,
  DeleteText,
  PublicOfferAcceptContainer,
  AcceptText,
} from '../../screens/offers/styles';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import PublicOfferCell from './PublicOfferCell';
import {TRASH_ICON_SMALL} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { isCameraPresent } from 'react-native-device-info';

interface PublicOfferProps {
  publicOffer: any;
  handleDelete?: Function;
}

export const PublicOfferItem: FC<PublicOfferProps> = (props) => {
  const {publicOffer, handleDelete = () => {}} = props;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();

  const renderDeleteButton = () => {
    if (isLogedIn && userData?._id === publicOffer.userId._id) {
      return (
        <PublicOfferDeleteContainer onPress={() => handleDelete(publicOffer._id)}>
          <SvgXml xml={TRASH_ICON_SMALL} style={{'marginTop': 5}}/>
          <DeleteText>Delete</DeleteText>
        </PublicOfferDeleteContainer>
      );
    }
  };

  const renderAcceptButton = () => {
    if (publicOffer?.isCompatible) {
      return (
        <PublicOfferAcceptContainer>
          <AcceptText>Accept</AcceptText>
        </PublicOfferAcceptContainer>
      );
    }
  };

  const RenderPublicOfferUserDetails = ({user}: any) => {
    return (
      <RowView>
        <EmptyRowView>
          <LSProfileImageComponent
            profileUrl={user?.profile_picture}
            imageHeight={40}
            imageWidth={40}
            imageRadius={10}
          />
          <OwnerDetailsView>
            <NameLabel>{user.name}</NameLabel>
          </OwnerDetailsView>
        </EmptyRowView>
        {renderDeleteButton()}
        {renderAcceptButton()}
      </RowView>
    );
  };

  const handlePress = () => {
    if (publicOffer?.isCompatible) {
      navigation.navigate('PublicOfferScreen', {
        publicOffer: publicOffer,
      });
    }
  };

  return (
    <OfferCellContainer key={publicOffer._id} onPress={() => handlePress()}>
      <RenderPublicOfferUserDetails user={publicOffer?.userId} />
      <PublicOfferCell
        receivingStockxProducts={publicOffer?.receivingStockxProducts}
        sendingProductIds={publicOffer?.sendingProductIds}
        receivingMoneyOffer={publicOffer?.receivingMoneyOffer}
        sendingMoneyOffer={publicOffer?.sendingMoneyOffer}
      />
    </OfferCellContainer>
  );
};

export default PublicOfferItem;
