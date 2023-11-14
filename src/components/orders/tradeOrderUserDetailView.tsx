import * as React from 'react';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {
  daysPast,
  tradeOrderShippingStatus,
  printLabel,
} from '../../utility/utility';
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
import RateUserButton from './rateUserButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';

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
  const navigation: NavigationProp<any, any> = useNavigation(); 
  const {labelColor, backColor, text} = tradeOrderShippingStatus(
    userData?._id,
    item,
  );
  const base64Img = isReciever
    ? item?.recieverUPSShipmentData?.toWarehouseLabel
    : item?.senderUPSShipmentData?.toWarehouseLabel;

  const printRateUserCondition = () => {
    if (item?.recieverStep === 5 && item?.senderStep === 5) {
      return (
        <RateUserButton
          isTradeOrder={true}
          isReciever={isReciever}
          isSeller={false}
          order={item}
          navigation={navigation}
        />
      );
    }
    if (
      item.recieverPaymentStatus === 'paid' &&
      item.senderPaymentStatus === 'paid'
    ) {
      return (
        <PrintLabelContainer onPress={() => printLabel(base64Img)}>
          <PrintIcon />
          <PrintLabel>Print Label</PrintLabel>
        </PrintLabelContainer>
      );
    }
  }

  return (
    <RowView>
      <UserLeftView>
        <LSProfileImageComponent
          profileUrl={
            isReciever
              ? item?.sender?.profile_picture
              : item?.reciever?.profile_picture
          }
          imageHeight={45}
          imageWidth={45}
          imageRadius={10}
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
        {printRateUserCondition()}
      </UserRightView>
    </RowView>
  );
};

export default TradeOrderUserDetailView;
