/***
INSQUAD - OFFERS SCREEN
***/

import React, {FC, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import TradeOfferCell from './offerItems/TradeOfferCell';
import {
  Container,
  TopTabView,
  CustomTabBar,
  TabBarLabel,
  TabContainer,
  OfferCellContainer,
  OffersListView,
  RowView,
  OwnerDetailsView,
  EmptyRowView,
  NameLabel,
  DesignationLabel,
  TimeLabel,
} from './styles';
export const OffersScreen: FC<{}> = () => {
  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Trade offers'},
    {key: 'second', title: 'Messages'},
  ]);
  const renderUserDetails = () => {
    return (
      <RowView>
        <EmptyRowView>
          <LSProfileImageComponent
            profileUrl={''}
            imageHeight={60}
            imageWidth={60}
            imageRadius={30}
          />
          <OwnerDetailsView>
            <NameLabel>Jamel Eusebio</NameLabel>
            <DesignationLabel>Dancer</DesignationLabel>
          </OwnerDetailsView>
        </EmptyRowView>
        <TimeLabel>2 months ago</TimeLabel>
      </RowView>
    );
  };
  const renderOfferItem = ({item}: any) => {
    return (
      <OfferCellContainer
        onPress={() => navigation.navigate('OffersMessageScreen')}>
        {renderUserDetails()}
        <TradeOfferCell offerItem={item} />
      </OfferCellContainer>
    );
  };
  const FirstRoute = () => (
    <TabContainer>
      <OffersListView
        data={[...new Array(6).keys()]}
        renderItem={renderOfferItem}
      />
    </TabContainer>
  );

  const SecondRoute = () => (
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
  });
  return (
    <Container>
      <InStackHeader back={false} title={'Trade feed'} centerAligned={true} />
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

export default OffersScreen;
