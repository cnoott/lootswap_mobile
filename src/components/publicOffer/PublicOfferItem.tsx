import React, {FC, useState} from 'react';
import {
  RowView,
  EmptyRowView,
  OwnerDetailsView,
  NameLabel,
  OfferCellContainer,
} from '../../screens/offers/styles';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import PublicOfferCell from './PublicOfferCell';

interface PublicOfferProps {
  publicOffer: any;
}

export const PublicOfferItem: FC<PublicOfferProps> = (props) => {
  const {publicOffer} = props;

  const RenderPublicOfferUserDetails = ({user}: any) => {
    return (
      <RowView>
        <EmptyRowView>
          <LSProfileImageComponent
            profileUrl={user?.profile_picture}
            imageHeight={50}
            imageWidth={50}
            imageRadius={30}
          />
          <OwnerDetailsView>
            <NameLabel>{user.name}</NameLabel>
          </OwnerDetailsView>
        </EmptyRowView>
      </RowView>
    );
  };

  return (
    <OfferCellContainer
      key={publicOffer._id}
      onPress={() => {}}
    >
      <RenderPublicOfferUserDetails user={publicOffer?.userId}/>
      <PublicOfferCell
        receivingStockxIds={publicOffer?.receivingStockxIds}
        sendingProductIds={publicOffer?.sendingProductIds}
        receivingMoneyOffer={publicOffer?.receivingMoneyOffer}
        sendingMoneyOffer={publicOffer?.sendingMoneyOffer}
      />
    </OfferCellContainer>
  );
};

export default PublicOfferItem;
