/***
INSQUAD - MY ORDERS SCREEN
***/

import React, {FC, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
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
export const MyOrdersListScreen: FC<{}> = () => {
  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Purchases'},
    {key: 'second', title: 'Sales'},
    {key: 'third', title: 'Trade Orders'},
  ]);

  const onItemPress = (isTradeOrder: boolean = false) => {
    navigation?.navigate('TrackOrderScreen', {
      isTradeOrder: isTradeOrder,
    });
  };

  const renderPurchasesItem = () => {
    return <OrderPurchaseCell onCellPress={onItemPress} />;
  };

  const renderSalesItem = () => {
    return <OrderPurchaseCell isSales={true} onCellPress={onItemPress} />;
  };

  const renderTradeOrdersItem = () => {
    return <OrderTradeOrdersCell onCellPress={onItemPress} />;
  };

  const FirstRoute = () => (
    <TabContainer>
      <PurchasesListView data={[1, 2, 3, 4]} renderItem={renderPurchasesItem} />
    </TabContainer>
  );

  const SecondRoute = () => (
    <TabContainer>
      <SalesListView data={[1, 2, 3, 4]} renderItem={renderSalesItem} />
    </TabContainer>
  );

  const ThirdRoute = () => (
    <TabContainer>
      <TradeOrdersListView
        data={[1, 2, 3, 4]}
        renderItem={renderTradeOrdersItem}
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
