import * as React from 'react';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {getShippingStatusColor, daysPast} from '../../utility/utility';
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
}

const OrderUserDetailView = (props: OrderUserDetailViewProps) => {
  const {item = {}, isSales = false} = props;
  const statusColorObj = getShippingStatusColor(item?.status || '');
  return (
    <RowView>
      <UserLeftView>
        <LSProfileImageComponent
          profileUrl={isSales ? item?.buyerId?.name : item?.sellerId?.name}
          imageHeight={50}
          imageWidth={50}
          imageRadius={30}
        />
        <OwnerDetailsView>
          <NameLabel>
            {isSales ? item?.buyerId?.name : item?.sellerId?.name}
          </NameLabel>
          <StatusContainerView
            bgColor={statusColorObj?.backColor}
            borderColor={statusColorObj?.labelColor}>
            <StatusLabel color={statusColorObj?.labelColor}>
              {isSales ? 'Shipped' : 'In transit'}
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
