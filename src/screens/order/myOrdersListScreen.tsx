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
//- dont show trade orders that havent been paid for
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

  const onPurchasesRefresh = () => {};
  const onSalesRefresh = () => {};
  const onTradeOrdersRefresh = () => {};


  const onItemPress = (isTradeOrder: boolean = false) => {
    navigation?.navigate('TrackOrderScreen', {
      isTradeOrder: isTradeOrder,
    });
  };

  const renderPurchasesItem = ({item}) => {
    return (
      <>
        {item?.buyerId?._id === userData?._id && (
          <OrderPurchaseCell
            isSales={item?.sellerId._id === userData?._id}
            onCellPress={onItemPress}
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
            onCellPress={onItemPress}
            item={item}
            userData={userData}
          />
        )}
      </>
    );
  };

  const renderTradeOrdersItem = ({item}) => {
    return <OrderTradeOrdersCell onCellPress={onItemPress} item={item} />;
  };

  const FirstRoute = () => (
    <TabContainer>
      <PurchasesListView
        data={paypalOrders}
        renderItem={renderPurchasesItem}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPurchasesRefresh} />
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
          <RefreshControl refreshing={false} onRefresh={onSalesRefresh} />
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
          <RefreshControl refreshing={false} onRefresh={onTradeOrdersRefresh} />
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
