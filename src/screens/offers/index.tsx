/***
LootSwap - OFFERS SCREEN
***/

import React, {FC, useState} from 'react';
import {useWindowDimensions, RefreshControl} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getTradesHistory, getAllMyMessages} from '../../redux/modules';
import {TradeProps} from '../../redux/modules/offers/reducer';
import {MessageProps} from '../../redux/modules/message/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import TradeOfferCell from './offerItems/TradeOfferCell';
import NoOffersView from './offerItems/NoOffersView';
import {getTradeStatusColor, daysPast} from '../../utility/utility';
import NoMessagesView from './offerItems/NoMessagesView';
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
  StatusContainerView,
  StatusLabel,
  TimeLabel,
  MessagesListView,
  MessageCellContainer,
  ProductNameLabel,
} from './styles';
export const OffersScreen: FC<{}> = () => {
  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Trade offers'},
    {key: 'second', title: 'Messages'},
  ]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const tradesData: TradeProps = useSelector(state => state.offers);
  const {historyTrades} = tradesData;
  const messagesStoreData: MessageProps = useSelector(state => state.message);
  const {allMyMessages} = messagesStoreData;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getTradesHistory({
          userId: userData?._id,
        }),
      );
      dispatch(getAllMyMessages(userData?._id));
    }, [userData?._id, dispatch]),
  );

  const onTradeOffersRefresh = () => {
    dispatch(
      getTradesHistory({
        userId: userData?._id,
      }),
    );
  };

  const onMessagesRefresh = () => {
    dispatch(getAllMyMessages(userData?._id));
  };

  const goToMessageScreen = (msgData: any) => {
    const prodOwnerName =
      msgData?.product?.userId === msgData.reciever._id
        ? msgData.reciever.name
        : msgData.sender.name;
    const params = {
      messageId: msgData?._id,
      productOwnerId: msgData?.product?.userId,
      productOwnerName: prodOwnerName || 'Owner',
    };
    navigation.navigate('UserChatScreen', params);
  };

  const RenderUserDetails = ({item}) => {
    const statusColorObj = getTradeStatusColor(item.status);
    return (
      <RowView>
        <EmptyRowView>
          <LSProfileImageComponent
            profileUrl={
              userData?._id === item.reciever._id
                ? item.sender.profile_picture
                : item.reciever.profile_picture
            }
            imageHeight={50}
            imageWidth={50}
            imageRadius={30}
          />
          <OwnerDetailsView>
            <NameLabel>
              {userData?._id === item?.reciever?._id ? (
                <>{item.sender.name}</>
              ) : (
                <>{item.reciever.name}</>
              )}
            </NameLabel>
            <StatusContainerView
              bgColor={statusColorObj?.backColor}
              borderColor={statusColorObj?.labelColor}>
              <StatusLabel color={statusColorObj?.labelColor}>
                {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
              </StatusLabel>
            </StatusContainerView>
          </OwnerDetailsView>
        </EmptyRowView>
        <TimeLabel> {daysPast(item.createdAt)} </TimeLabel>
      </RowView>
    );
  };

  const renderOfferItem = ({item}: any) => {
    return (
      <OfferCellContainer
        key={item._id}
        onPress={() => {
          setSelectedTrade(item._id);
          navigation.navigate('OffersMessageScreen', {item});
        }}>
        <RenderUserDetails item={item} />
        <TradeOfferCell offerItem={item} isInTrade={false} />
      </OfferCellContainer>
    );
  };

  const renderMessageItem = ({item}: any) => {
    return (
      <MessageCellContainer
        key={item?._id}
        onPress={() => goToMessageScreen(item)}>
        <LSProfileImageComponent
          profileUrl={
            userData?._id === item.reciever._id
              ? item.sender.profile_picture
              : item.reciever.profile_picture
          }
          imageHeight={60}
          imageWidth={60}
          imageRadius={30}
        />
        <OwnerDetailsView>
          <NameLabel>
            {userData?._id === item?.reciever?._id ? (
              <>{item.sender.name}</>
            ) : (
              <>{item.reciever.name}</>
            )}
          </NameLabel>
          <ProductNameLabel>{item?.product?.name}</ProductNameLabel>
        </OwnerDetailsView>
      </MessageCellContainer>
    );
  };

  const FirstRoute = () => (
    <TabContainer>
      <OffersListView
        data={historyTrades}
        renderItem={renderOfferItem}
        keyExtractor={item => item._id}
        extraData={selectedTrade}
        ListEmptyComponent={() => <NoOffersView navigation={navigation} />}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onTradeOffersRefresh} />
        }
      />
    </TabContainer>
  );

  const SecondRoute = () => (
    <TabContainer>
      <MessagesListView
        data={allMyMessages?.messageDocs || []}
        renderItem={renderMessageItem}
        keyExtractor={(item: any) => item?._id}
        ListEmptyComponent={() => <NoMessagesView />}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onMessagesRefresh} />
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
