/***
  LootSwap - MY ORDERS SCREEN
 ***/

import React, {FC, useState, useEffect} from 'react';
import {useWindowDimensions, RefreshControl} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {OrderProps} from '../../redux/modules/orders/reducer';
import {getAllOrders} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import OrderPurchaseCell from '../../components/orders/orderPurchaseCell';
import OrderTradeOrdersCell from '../../components/orders/orderTradeOrdersCell';
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
//TODO:
//- handle printing label button
export const MyOrdersListScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const orders: OrderProps = useSelector(state => state.orders);
  const {paypalOrders, tradeOrders} = orders;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Purchases'},
    {key: 'second', title: 'Sales'},
    {key: 'third', title: 'Trade Orders'},
  ]);

  useEffect(() => {
    dispatch(
      getAllOrders({
        userId: userData?._id,
      }),
    );
  }, [dispatch, userData?._id]);

  const onRefresh = () => {
    dispatch(
      getAllOrders({
        userId: userData?._id,
      }),
    );
  };

  /* make sales order item press
     const onItemPress = (isTradeOrder: boolean = false, tradeOrder: any) => {
     navigation?.navigate('TrackOrderScreen', {
isTradeOrder: isTradeOrder,
});
};
*/
  const onPaypalItemPress = () => {
    console.log('WIP');
  };

  const onTradeItemPress = (tradeOrder: any) => {
    const isReciever = userData?._id === tradeOrder.reciever._id;

    if (isReciever) {
      if (tradeOrder?.recieverSessionStatus === 'complete') {
        navigation?.navigate('TrackOrderScreen', {
          isTradeOrder: true,
          item: tradeOrder,
        });
      }

      switch (tradeOrder.recieverPaymentStatus) {
        case 'paid':
        case 'processing':
          navigation?.navigate('TrackOrderScreen', {
            isTradeOrder: true,
            item: tradeOrder,
          });
          break;
        case 'failed':
          //TODO dispatch accept trade again
          console.log('failed wip');
          break;
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
          navigation?.navigate('Offers/Inbox', {
            screen: 'TradeCheckoutScreen',
            params: {
              tradeData: tradeOrder.tradeId,
              orderData: tradeOrder,
            },
          });
          break;
        case 'failed':
          console.log('failed wip');
      }
    }
  };

  const renderPurchasesItem = ({item}) => {
    return (
      <>
        {item?.buyerId?._id === userData?._id && (
          <OrderPurchaseCell
            isSales={item?.sellerId._id === userData?._id}
            onCellPress={onPaypalItemPress}
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
            onCellPress={onPaypalItemPress}
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

  const renderTabBar = (props: any) => (
    <CustomTabBar
      {...props}
      renderLabel={({route, focused}: any) => (
        <TabBarLabel focused={focused}>{route.title}</TabBarLabel>
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
      <InStackHeader onlyTitleCenterAlign={true} title={'My Orders'} />
      <TopTabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </Container>
  );
};

export default MyOrdersListScreen;
