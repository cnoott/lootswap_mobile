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

function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const OrderStatusDetails: FC<any> = React.memo(props => {
  const {trackingHistory} = props;
  const theme = useTheme();

  const renderStatusCell = detail => {
    const date = new Date(detail.object_created);
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    const time = formatAMPM(date);

    const formattedDate = mm + '/' + dd;

    return (
      <StatusDetailsContainer>
        <SvgXml xml={ORDER_DETAILS_ICON} />
        <OrderStatusView>
          <OrderStatusTitleText>
            {detail.status} - {formattedDate}
          </OrderStatusTitleText>
          <OrderStatusDesText>{detail.status_details}</OrderStatusDesText>
        </OrderStatusView>
        <OrderStatusTimeText>{time}</OrderStatusTimeText>
      </StatusDetailsContainer>
    );
  };
  const renderProgressLine = (index: Number) => {
    return (
      <StatusDetailsDivider key={index}>
        <DashLineNew dashColor={theme?.colors?.greySubDetails} />
      </StatusDetailsDivider>
    );
  };
  return (
    <>
      <OrderStatusDetailsText>Order Status Details</OrderStatusDetailsText>
      {trackingHistory?.map((detail, index) => {
        return (
          <>
            {renderStatusCell(detail)}
            {index + 1 < trackingHistory?.length && renderProgressLine(index)}
          </>
        );
      })}
    </>
  );
});

export default OrderStatusDetails;
