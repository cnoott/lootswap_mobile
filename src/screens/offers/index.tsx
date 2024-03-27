/***
LootSwap - OFFERS SCREEN
***/

import React, {FC, useEffect, useState} from 'react';
import {useWindowDimensions, RefreshControl} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  getTradesHistory,
  getAllMyMessages,
  getPublicOffers,
  deletePublicOffer,
  setNotifsAsReadRequest,
} from '../../redux/modules';
import {TradeProps} from '../../redux/modules/offers/reducer';
import {MessageProps} from '../../redux/modules/message/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {LSProfileImageComponent} from '../../components/commonComponents/profileImage';
import LSButton from '../../components/commonComponents/LSButton';
import {SvgXml} from 'react-native-svg';
import {STOCKX_SEARCH_DROP_DOWN_ARROW} from 'localsvgimages';
import TradeOfferCell from './offerItems/TradeOfferCell';
import NoOffersView from './offerItems/NoOffersView';
import {getTradeStatusColor, daysPast} from '../../utility/utility';
import NoMessagesView from './offerItems/NoMessagesView';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Size, Type} from '../../enums';
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
  Badge,
  BadgeText,
} from './styles';
import {ButtonContainer} from '../publicOffers/styles';
import {SelectedTextStyle} from '../search/stockxScreenStyles';
import {Dropdown} from 'react-native-element-dropdown';
import PublicOfferItem from '../../components/publicOffer/PublicOfferItem';
import CellBadge from '../../components/offers/cellBadge';
import {loggingService} from '../../services/loggingService';

export const OffersScreen: FC<{}> = () => {
  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(0);
  const [publicOfferFilter, setPublicOfferFilter] = useState({value: 'All'});
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

  useEffect(() => {
    const reqData = {
      type: publicOfferFilter.value,
      userId: userData?._id,
    };
    dispatch(
      setNotifsAsReadRequest({
        userId: userData?._id,
        notifType: 'inbox',
      }),
    );
    dispatch(
      getPublicOffers(
        reqData,
        res => {
          setPublicOffers(res.publicOffers);
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
  }, [publicOfferFilter]);

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
    navigation.navigate('UserChatScreen', {
      messageId: msgData._id,
      key: new Date().toString(),
    });
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
            offer => offer._id !== publicOfferId,
          );
          setPublicOffers(newPublicOffers);
        },
        err => {
          console.log('ERROR => ', err);
        },
      ),
    );
  };

  const goToCreatePublicOfferScreen = () => {
    navigation?.navigate('CreatePublicOfferScreen');
  };

  const renderBottomButtonView = () => {
    if (index === 0) {
      return (
        <ButtonContainer>
          <LSButton
            title={'Create Public Offer'}
            size={Size.Large}
            type={Type.Primary}
            radius={20}
            onPress={() => goToCreatePublicOfferScreen()}
          />
        </ButtonContainer>
      );
    }
  };

  const RenderUserDetails = ({item}) => {
    const statusColorObj = getTradeStatusColor(item.status);
    const isReceiver = userData?._id === item.receiver._id;
    const showNotifBadge =
      (isReceiver && (item?.receiverNewMessage || item?.senderHasEdited)) ||
      (!isReceiver && (item?.senderNewMessage || item?.receiverHasEdited));
    return (
      <RowView>
        <EmptyRowView>
          <LSProfileImageComponent
            profileUrl={
              isReceiver
                ? item.sender.profile_picture
                : item.receiver.profile_picture
            }
            imageHeight={40}
            imageWidth={40}
            imageRadius={10}
          />
          {showNotifBadge && <CellBadge />}
          <OwnerDetailsView>
            <NameLabel>
              {isReceiver ? <>{item.sender.name}</> : <>{item.receiver.name}</>}
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

  const tradeOfferCellOnPress = item => {
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
    const isReceiver = userData?._id === item.receiver._id;
    const showNotifBadge =
      (isReceiver && item?.receiverNewMessage) ||
      (!isReceiver && item?.senderNewMessage);
    return (
      <MessageCellContainer
        key={item?._id}
        onPress={() => goToMessageScreen(item)}>
        <LSProfileImageComponent
          profileUrl={
            isReceiver
              ? item?.sender?.profile_picture
              : item.receiver?.profile_picture
          }
          imageHeight={40}
          imageWidth={40}
          imageRadius={10}
        />
        {showNotifBadge && <CellBadge top={5} left={5} />}
        <OwnerDetailsView>
          <NameLabel>
            {isReceiver ? <>{item?.sender?.name}</> : <>{item.receiver.name}</>}
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
          placeholder={'All'}
          labelField={'value'}
          valueField={'value'}
          onChange={item => setPublicOfferFilter(item)}
          data={[
            {value: 'For You'},
            {value: 'My Public Offers'},
            {value: 'All'},
          ]}
          value={publicOfferFilter}
          maxHeight={300}
          renderRightIcon={() => <SvgXml xml={STOCKX_SEARCH_DROP_DOWN_ARROW} />}
        />
      </PublicOffersFilterContainer>
      <OffersListView
        data={publicOffers}
        renderItem={renderPublicOfferItem}
        keyExtractor={item => item?._id}
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

  const countNotifs = (title: string) => {
    switch (title) {
      case 'Trade offers':
        return historyTrades?.filter(
          trade =>
            (userData?._id === trade.receiver._id &&
              trade.receiverNewMessage) ||
            (userData?._id === trade.sender._id && trade.senderNewMessage),
        ).length;
      case 'Messages':
        return allMyMessages?.messageDocs.filter(
          message =>
            (userData?._id === message.receiver?._id &&
              message.receiverNewMessage) ||
            (userData?._id === message?.sender?._id &&
              message.senderNewMessage),
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
      <InStackHeader back={false} title={'Inbox'} centerAligned={true} />
      <TopTabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      {renderBottomButtonView()}
    </Container>
  );
};

export default OffersScreen;
