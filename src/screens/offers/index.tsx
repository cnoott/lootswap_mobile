/***
LootSwap - OFFERS SCREEN
***/

import React, {FC, useState} from 'react';
import {useWindowDimensions, RefreshControl} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  getTradesHistory,
  getAllMyMessages,
  getPublicOffers,
  deletePublicOffer,
} from '../../redux/modules';
import {TradeProps} from '../../redux/modules/offers/reducer';
import {MessageProps} from '../../redux/modules/message/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import {SvgXml} from 'react-native-svg';
import {STOCKX_SEARCH_DROP_DOWN_ARROW} from 'localsvgimages';
import TradeOfferCell from './offerItems/TradeOfferCell';
import NoOffersView from './offerItems/NoOffersView';
import {getTradeStatusColor, daysPast} from '../../utility/utility';
import NoMessagesView from './offerItems/NoMessagesView';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
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
  PublicOffersFilterContainer,
  SizeDropdownStyle,
  ItemTextStyle,
} from './styles';
import {
  SelectedTextStyle,
} from '../search/stockxScreenStyles';
import {Dropdown} from 'react-native-element-dropdown';
import PublicOfferItem from '../../components/publicOffer/PublicOfferItem';

export const OffersScreen: FC<{}> = () => {
  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(0);
  const [publicOfferFilter, setPublicOfferFilter] = useState({value: 'For You'});
  const [publicOffers, setPublicOffers] = useState([]);
  const [routes] = React.useState([
    {key: 'first', title: 'Public Offers'},
    {key: 'second', title: 'Trade offers'},
    {key: 'third', title: 'Messages'},
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
      const reqData = {
        type: publicOfferFilter.value,
        userId: userData?._id,
      };
      dispatch(
        getPublicOffers(
          reqData,
          res => {
            setPublicOffers(res);
          },
          err => {
            console.log('Err => ', err);
          },
        ),
      );

      dispatch(
        getTradesHistory({
          userId: userData?._id,
        }),
      );
      dispatch(getAllMyMessages(userData?._id));
    }, [userData?._id, dispatch, publicOfferFilter]),
  );

  const onTradeOffersRefresh = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    dispatch(
      getTradesHistory({
        userId: userData?._id,
      }),
    );
  };

  const onMessagesRefresh = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    dispatch(getAllMyMessages(userData?._id));
  };

  const goToMessageScreen = (msgData: any) => {
    navigation.navigate('UserChatScreen', {messageId: msgData._id});
  };

  const handleDeletePublicOffer = (publicOfferId: string) => {
    const reqData = {
      userId: userData?._id,
      publicOfferId: publicOfferId,
    };
    dispatch(
      deletePublicOffer(
        reqData,
        res => {
          const newPublicOffers = publicOffers.filter(
            offer => offer._id !== publicOfferId
          );
          setPublicOffers(newPublicOffers);
        },
        err => {
          console.log('ERROR => ', err);
        },
      ),
    );

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
            imageHeight={40}
            imageWidth={40}
            imageRadius={10}
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

  const tradeOfferCellOnPress = (item) => {
    setSelectedTrade(item._id);
    navigation.navigate('OffersMessageScreen', {item});
  };

  const renderPublicOfferItem = ({item}: any) => {
    return (
      <PublicOfferItem
        publicOffer={item}
        handleDelete={handleDeletePublicOffer}
      />
    );
  };

  const renderOfferItem = ({item}: any) => {
    return (
      <OfferCellContainer
        key={item._id}
        onPress={() => tradeOfferCellOnPress(item)}>
        <RenderUserDetails item={item} />
        <TradeOfferCell
          offerItem={item}
          isInTrade={false}
          onPress={() => tradeOfferCellOnPress(item)}
        />
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
      <PublicOffersFilterContainer>
        <Dropdown
          style={[SizeDropdownStyle]}
          selectedTextStyle={SelectedTextStyle}
          placeholderStyle={SelectedTextStyle}
          itemTextStyle={ItemTextStyle}
          placeholder={'For You'}
          labelField={'value'}
          valueField={'value'}
          onChange={item => setPublicOfferFilter(item)}
          data={[{value: 'For You'}, {value: 'My Public Offers'}, {value: 'All'}]}
          value={publicOfferFilter}
          maxHeight={300}
          renderRightIcon={() => <SvgXml xml={STOCKX_SEARCH_DROP_DOWN_ARROW} />}
        />
      </PublicOffersFilterContainer>
      <OffersListView
        data={publicOffers}
        renderItem={renderPublicOfferItem}
        keyExtractor={item => item?._id}
        ListEmptyComponent={() => <NoOffersView navigation={navigation} />}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onTradeOffersRefresh} />
        }
      />
    </TabContainer>
  );

  const SecondRoute = () => (
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

  const ThirdRoute = () => (
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
    third: ThirdRoute,
  });
  return (
    <Container>
      <InStackHeader back={false} title={'Inbox'} centerAligned={true} />
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
