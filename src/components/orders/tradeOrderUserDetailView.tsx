import * as React from 'react';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {daysPast, tradeOrderShippingStatus} from '../../utility/utility';
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

interface TradeOrderUserDetailViewProps {
  item?: any;
  userData?: any;
}
//TODO
// - shipping status function
//
const TradeOrderUserDetailView = (props: TradeOrderUserDetailViewProps) => {
  const {item = {}, userData} = props;
  const isReciever = item?.reciever?._id === userData?._id;
  const {labelColor, backColor, text} = tradeOrderShippingStatus(
    userData?._id,
    item,
  );

  return (
    <RowView>
      <UserLeftView>
        <LSProfileImageComponent
          profileUrl={
            isReciever
              ? item?.sender?.profile_picture
              : item?.reciever?.profile_picture
          }
          imageHeight={50}
          imageWidth={50}
          imageRadius={30}
        />
        <OwnerDetailsView>
          <NameLabel>
            {isReciever ? item?.sender?.name : item?.reciever?.name}
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

export default TradeOrderUserDetailView;
