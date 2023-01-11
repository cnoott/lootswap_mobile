/***
INSQUAD - MY ORDERS SCREEN
***/

import React, {FC, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import OrderPurchaseCell from '../../components/orders/orderPurchaseCell';
import {
  Container,
  TopTabView,
  CustomTabBar,
  TabBarLabel,
  TabContainer,
  PurchasesListView,
  SalesListView,
} from './myOrdersStyle';
export const MyOrdersListScreen: FC<{}> = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Purchases'},
    {key: 'second', title: 'Sales'},
    {key: 'third', title: 'Trade Orders'},
  ]);

  const renderPurchasesItem = () => {
    return <OrderPurchaseCell />;
  };

  const renderSalesItem = () => {
    return <OrderPurchaseCell isSales={true} />;
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
      <></>
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
