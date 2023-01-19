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
  const {labelColor, backColor, text} = paypalOrderShippingStatus(
    userData?._id,
    item,
  );
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
            {item?.isGuest && isSales
              ? item?.buyerId?.name
              : item?.sellerId?.name}
            {item?.isGuest && 'Guest'}
          </NameLabel>
          <StatusContainerView bgColor={backColor} borderColor={labelColor}>
            <StatusLabel color={labelColor}>{text}</StatusLabel>
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
