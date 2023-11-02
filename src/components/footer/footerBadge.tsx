import React, {FC} from 'react';
import {Badge, BadgeText} from './styles';
import {countNotifs} from '../../utility/notification';

interface FooterBadgeProps {
  notifications: Array<any>;
  routeName: String;
};

const FooterBadge: FC<FooterBadgeProps> = props => {
  const {notifications, routeName} = props;

  const numNotifsByRouteName = () => {
    switch (routeName) {
      case 'Profile':
        return countNotifs(notifications, [
          'trade-order',
          'new-paypal-order',
          'paypal-order',
        ]);
      case 'Inbox':
        return countNotifs(notifications, ['trade', 'message']);
      default:
        return 0;
    }
  };
  if (!numNotifsByRouteName()) {
    return <></>
  }
  return (
    <Badge>
      <BadgeText>{numNotifsByRouteName()}</BadgeText>
    </Badge>
  );
};

export default FooterBadge;
