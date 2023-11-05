/***
  LootSwap - MY ORDERS SCREEN
 ***/

import React, {FC, useState, useEffect} from 'react';
import {useWindowDimensions, RefreshControl} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {OrderProps} from '../../redux/modules/orders/reducer';
import {
  getAllOrders,
  acceptTrade,
  setNotifsAsReadRequest,
} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import OrderPurchaseCell from '../../components/orders/orderPurchaseCell';
import OrderTradeOrdersCell from '../../components/orders/orderTradeOrdersCell';
import {LSModal} from '../../components/commonComponents/LSModal';
import ShippingInstructionModalComponent from '../../components/orders/shippingInstructionModalComponent';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
  Container,
  TopTabView,
  CustomTabBar,
  TabBarLabel,
  TabContainer,
  PurchasesListView,
  SalesListView,
  TradeOrdersListView,
} from './myOrdersStyle';
import {Badge, BadgeText} from '../offers/styles';

export const MyOrdersListScreen: FC<any> = ({route}) => {
  const {initialState = 0} = route?.params || {};
  const dispatch = useDispatch();
  const orders: OrderProps = useSelector(state => state.orders);
  const {paypalOrders, tradeOrders} = orders;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(initialState);
  const [isShipInsModalVisible, setShipInsModalVisible] = useState(false);
  const [routes] = React.useState([
    {key: 'first', title: 'Purchases'},
    {key: 'second', title: 'Sales'},
    {key: 'third', title: 'Trade Orders'},
  ]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedPaypalOrderId, setSelectedPaypalOrderId] = useState('');

  useEffect(() => {
    setIndex(initialState);
    dispatch(
      getAllOrders({
        userId: userData?._id,
      }),
    );
    dispatch(setNotifsAsReadRequest({
      userId: userData?._id,
      notifType: 'orders',
    }));
  }, [dispatch, userData?._id, initialState]);

  const onRefresh = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    dispatch(
      getAllOrders({
        userId: userData?._id,
      }),
    );
  };

  const onPaypalItemPress = (paypalOrder: any) => {
    const isSeller = userData?._id === paypalOrder?.sellerId?._id;

    if (isSeller && paypalOrder?.shippingStep === 0) {
      setShipInsModalVisible(true);
      setSelectedProductId(paypalOrder?.productId?._id);
      setSelectedPaypalOrderId(paypalOrder?._id);
    } else {
      navigation?.navigate('TrackOrderScreen', {
        isTradeOrder: false,
        item: paypalOrder,
      });
    }
  };

  const handleAcceptTrade = (tradeData: any) => {
    console.log(tradeData._id);
    const reqData = {
      tradeId: tradeData?._id,
      userId: userData?._id,
    };
    dispatch(
      acceptTrade(
        reqData,
        res => {
          navigation?.navigate('TradeCheckoutScreen', {
            tradeData: tradeData,
            orderData: res,
          });
        },
        error => {
          console.log('error:', error);
        },
      ),
    );
  };

  const goToShippingLabelScreen = () => {
    setShipInsModalVisible(false);
    setTimeout(() => {
      navigation?.navigate('ShippingLabelScreen', {
        productId: selectedProductId,
        paypalOrderId: selectedPaypalOrderId,
      });
    }, 300);
  };

  const onTradeItemPress = (tradeOrder: any) => {
    const isReciever = userData?._id === tradeOrder?.reciever?._id;

    if (isReciever) {
      switch (tradeOrder.recieverPaymentStatus) {
        case 'paid':
        case 'processing':
          navigation?.navigate('TrackOrderScreen', {
            isTradeOrder: true,
            item: tradeOrder,
          });
          break;
        case 'failed':
          console.log('CALLED');
          handleAcceptTrade(tradeOrder.tradeId);
          return;
      }

      if (tradeOrder?.recieverSessionStatus === 'complete') {
        navigation?.navigate('TrackOrderScreen', {
          isTradeOrder: true,
          item: tradeOrder,
        });
      }
    } else {
      switch (tradeOrder.senderPaymentStatus) {
        case 'paid':
        case 'processing':
          navigation?.navigate('TrackOrderScreen', {
            isTradeOrder: true,
            item: tradeOrder,
          });
          break;
        case 'unpaid':
          navigation?.navigate('TradeCheckoutScreen', {
            tradeData: tradeOrder.tradeId,
            orderData: tradeOrder,
          });
          break;
        case 'failed':
          navigation?.navigate('TradeCheckoutScreen', {
            tradeData: tradeOrder.tradeId,
            orderData: tradeOrder,
          });
          break;
      }
    }
  };

  const renderShippingInstructionModal = () => {
    return (
      <LSModal isVisible={isShipInsModalVisible}>
        <LSModal.Container>
          <ShippingInstructionModalComponent
            onButtonPress={() => goToShippingLabelScreen()}
          />
          <LSModal.CloseButton
            onCloseButtonPress={() => setShipInsModalVisible(false)}
          />
        </LSModal.Container>
      </LSModal>
    );
  };

  const renderPurchasesItem = ({item}) => {
    return (
      <>
        {item?.buyerId?._id === userData?._id && (
          <OrderPurchaseCell
            isSales={item?.sellerId._id === userData?._id}
            onCellPress={() => onPaypalItemPress(item)}
            item={item}
            userData={userData}
          />
        )}
      </>
    );
  };

  const renderSalesItem = ({item}) => {
    return (
      <>
        {item?.sellerId?._id === userData?._id && (
          <OrderPurchaseCell
            isSales={item?.sellerId._id === userData?._id}
            onCellPress={() => onPaypalItemPress(item)}
            item={item}
            userData={userData}
          />
        )}
      </>
    );
  };

  const renderTradeOrdersItem = ({item}) => {
    return (
      <OrderTradeOrdersCell
        onCellPress={() => onTradeItemPress(item)}
        item={item}
        userData={userData}
      />
    );
  };

  const FirstRoute = () => (
    <TabContainer>
      <PurchasesListView
        data={paypalOrders}
        renderItem={renderPurchasesItem}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      />
    </TabContainer>
  );

  const SecondRoute = () => (
    <TabContainer>
      <SalesListView
        data={paypalOrders}
        renderItem={renderSalesItem}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      />
    </TabContainer>
  );

  const ThirdRoute = () => (
    <TabContainer>
      <TradeOrdersListView
        data={tradeOrders}
        renderItem={renderTradeOrdersItem}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      />
    </TabContainer>
  );

  const countNotifs = (title: string) => {
    switch(title) {
      case 'Purchases':
        return paypalOrders?.filter(
          order => userData?._id === order.buyerId?._id && order?.buyerNewNotif
        ).length;
      case 'Sales':
        return paypalOrders?.filter(
          order => userData?._id === order?.sellerId?._id && order?.sellerNewNotif
        ).length;
      case 'Trade Orders':
        return tradeOrders?.filter(
          order =>
            (userData?._id === order.reciever._id && order?.recieverNewNotif) ||
            (userData?._id === order.sender._id && order?.senderNewNotif)
        ).length;
      default:
        return 0;
    }
  };

  const renderTabBar = (props: any) => (
    <CustomTabBar
      {...props}
      renderLabel={({route, focused}: any) => (
        <>
          <TabBarLabel focused={focused}>{route.title}</TabBarLabel>
          {countNotifs(route.title) !== 0 && (
            <Badge>
              <BadgeText>{countNotifs(route.title)}</BadgeText>
            </Badge>
          )}
        </>
      )}
    />
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  return (
    <Container>
      <InStackHeader
        onlyTitleCenterAlign={true}
        title={'My Orders'}
        onBackCall={() => navigation.navigate('ProfileScreen')}
      />
      <TopTabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      {renderShippingInstructionModal()}
    </Container>
  );
};

export default MyOrdersListScreen;
