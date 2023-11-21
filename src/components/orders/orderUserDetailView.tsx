import * as React from 'react';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {
  daysPast,
  paypalOrderShippingStatus,
  salePrintLabel,
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
import RateUserButton from '../orders/rateUserButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface OrderUserDetailViewProps {
  item?: any;
  isSales?: boolean;
  userData?: any;
}

const OrderUserDetailView = (props: OrderUserDetailViewProps) => {
  const {item = {}, userData} = props;
  const {labelColor, backColor, text} = paypalOrderShippingStatus(
    userData?._id,
    item,
  );
  const isSeller = userData?._id === item?.sellerId?._id;
  const navigation: NavigationProp<any, any> = useNavigation();


  const printLabelRenderOptions = () => {
    if (item?.shippingStep === 3) {
      return (
        <RateUserButton
          isTradeOrder={false}
          isReceiver={false}
          isSeller={isSeller}
          order={item}
          navigation={navigation}
        />
      );
    }
    if (isSeller && item?.shippingStep > 0) {
      return (
        <PrintLabelContainer
          onPress={() => salePrintLabel(item?.shippoData?.label_url)}>
          <PrintIcon />
          <PrintLabel>Print Label</PrintLabel>
        </PrintLabelContainer>
      );
    }
  };

  return (
    <RowView>
      <UserLeftView>
        <LSProfileImageComponent
          profileUrl={
            isSeller
              ? item?.buyerId?.profile_picture
              : item?.sellerId?.profile_picture
          }
          imageHeight={45}
          imageWidth={45}
          imageRadius={10}
        />
        <OwnerDetailsView>
          <NameLabel>
            {isSeller ? item?.buyerId?.name : item?.sellerId?.name}
            {item?.isGuest && 'Guest'}
          </NameLabel>
          <StatusContainerView bgColor={backColor} borderColor={labelColor}>
            <StatusLabel color={labelColor}>{text}</StatusLabel>
          </StatusContainerView>
        </OwnerDetailsView>
      </UserLeftView>
      <UserRightView>
        <TimeLabel>{daysPast(item?.createdAt)}</TimeLabel>
        {printLabelRenderOptions()}
      </UserRightView>
    </RowView>
  );
};

export default OrderUserDetailView;
