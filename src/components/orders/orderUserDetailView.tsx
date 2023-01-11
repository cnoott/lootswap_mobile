import * as React from 'react';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {getTradeStatusColor} from '../../utility/utility';
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
  item?: number;
  isSales?: boolean;
}

const OrderUserDetailView = (props: OrderUserDetailViewProps) => {
  const {item = {}, isSales = false} = props;
  const statusColorObj = getTradeStatusColor(item?.status || '');
  return (
    <RowView>
      <UserLeftView>
        <LSProfileImageComponent
          profileUrl={''}
          imageHeight={50}
          imageWidth={50}
          imageRadius={30}
        />
        <OwnerDetailsView>
          <NameLabel>Jamel Eusebio</NameLabel>
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
        <TimeLabel>2 months ago</TimeLabel>
        <PrintLabelContainer>
          <PrintIcon />
          <PrintLabel>Print Label</PrintLabel>
        </PrintLabelContainer>
      </UserRightView>
    </RowView>
  );
};

export default OrderUserDetailView;
