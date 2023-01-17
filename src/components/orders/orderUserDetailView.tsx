import * as React from 'react';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {daysPast, paypalOrderShippingStatus} from '../../utility/utility';
import {
  RowView,
  UserLeftView,
  OwnerDetailsView,
  NameLabel,
  StatusContainerView,
  StatusLabel,
  TimeLabel,
  UserRightView,
  PrintLabelContainer,
  PrintIcon,
  PrintLabel,
} from './styles';

interface OrderUserDetailViewProps {
  item?: any;
  isSales?: boolean;
  userData?: any;
}

const OrderUserDetailView = (props: OrderUserDetailViewProps) => {
  const {item = {}, isSales = false, userData} = props;
  //const statusColorObj = getShippingStatusColor(item?.status || '');
  return (
    <RowView>
      <UserLeftView>
        <LSProfileImageComponent
          profileUrl={
            isSales
              ? item?.buyerId?.profile_picture
              : item?.sellerId?.profile_picture
          }
          imageHeight={50}
          imageWidth={50}
          imageRadius={30}
        />
        <OwnerDetailsView>
          <NameLabel>
            {isSales ? item?.buyerId?.name : item?.sellerId?.name}
          </NameLabel>
          <StatusContainerView
            bgColor={paypalOrderShippingStatus(userData?._id, item)?.backColor}
            borderColor={
              paypalOrderShippingStatus(userData?._id, item)?.labelColor
            }>
            <StatusLabel
              color={
                paypalOrderShippingStatus(userData?._id, item)?.labelColor
              }>
              {paypalOrderShippingStatus(userData?._id, item)?.text}
            </StatusLabel>
          </StatusContainerView>
        </OwnerDetailsView>
      </UserLeftView>
      <UserRightView>
        <TimeLabel>{daysPast(item?.createdAt)}</TimeLabel>
        <PrintLabelContainer>
          <PrintIcon />
          <PrintLabel>Print Label</PrintLabel>
        </PrintLabelContainer>
      </UserRightView>
    </RowView>
  );
};

export default OrderUserDetailView;
