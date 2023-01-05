import React, {FC} from 'react';
import {
  StatusDetailsContainer,
  OrderStatusDetailsText,
  OrderStatusView,
  OrderStatusTitleText,
  OrderStatusDesText,
  StatusDetailsDivider,
  DashLineNew,
  OrderStatusTimeText,
} from './styles';
import {SvgXml} from 'react-native-svg';
import {useTheme} from 'styled-components';
import {ORDER_DETAILS_ICON} from 'localsvgimages';

const detailsList = [
  {
    index: 1,
    title: 'Purchased',
    subDetails: '',
    time: '',
  },
  {
    index: 2,
    title: 'Purchased',
    subDetails: '',
    time: '',
  },
  {
    index: 3,
    title: 'Purchased',
    subDetails: '',
    time: '',
  },
  {
    index: 4,
    title: 'Purchased',
    subDetails: '',
    time: '',
  },
];

const OrderStatusDetails: FC<any> = React.memo(() => {
  const theme = useTheme();
  const renderStatusCell = () => {
    const date = 'Dec 17';
    return (
      <StatusDetailsContainer>
        <SvgXml xml={ORDER_DETAILS_ICON} />
        <OrderStatusView>
          <OrderStatusTitleText>Order In Transit - {date}</OrderStatusTitleText>
          <OrderStatusDesText>
            32 Manchester Ave. Ringgold, GA 30736
          </OrderStatusDesText>
        </OrderStatusView>
        <OrderStatusTimeText>15:20 PM</OrderStatusTimeText>
      </StatusDetailsContainer>
    );
  };
  const renderProgressLine = (detail: any) => {
    return (
      <StatusDetailsDivider key={detail?.index}>
        <DashLineNew dashColor={theme?.colors?.greySubDetails} />
      </StatusDetailsDivider>
    );
  };
  return (
    <>
      <OrderStatusDetailsText>Order Status Details</OrderStatusDetailsText>
      {detailsList?.map(detail => {
        return (
          <>
            {renderStatusCell()}
            {detail?.index < detailsList?.length && renderProgressLine(detail)}
          </>
        );
      })}
    </>
  );
});

export default OrderStatusDetails;
