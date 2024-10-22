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
  archiveTrade,
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
import EmptyListView from '../../components/commonComponents/EmptyListView';
import {
  getTradeStatusColor,
  daysPast,
  shouldShowArchive,
} from '../../utility/utility';
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
  PublicOfferDeleteContainer,
  DeleteText,
} from './styles';
import {ButtonContainer} from '../publicOffers/styles';
import {SelectedTextStyle} from '../search/stockxScreenStyles';
import {Dropdown} from 'react-native-element-dropdown';
import PublicOfferItem from '../../components/publicOffer/PublicOfferItem';
import CellBadge from '../../components/offers/cellBadge';
import {loggingService} from '../../services/loggingService';
import LoadingPublicOfferCell from '../../components/publicOffer/LoadingPublicOfferCell';
import LoadingMessageCell from '../../components/message/LoadingMessageCell';
import OfferForSellOnlyCell from './offerItems/OfferForSellOnlyCell';

export const OffersScreen: FC<{}> = () => {
  const layout = useWindowDimensions();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [index, setIndex] = useState(0);
  const [publicOfferFilter, setPublicOfferFilter] = useState({value: 'All'});
  const [publicOffers, setPublicOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState([]);

  const [combinedInbox, setCombinedInbox] = useState([]);

  const [routes] = React.useState([
    {key: 'first', title: 'Inbox'},
    {key: 'second', title: 'Public Offers'},
  ]);

  const [selectedTrade, setSelectedTrade] = useState(null);
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const tradesData: TradeProps = useSelector(state => state.offers);
  const {historyTrades} = tradesData;
  const messagesStoreData: MessageProps = useSelector(state => state.message);
  const {allMyMessages} = messagesStoreData;
  const tradeLoading = useSelector(state => state.offers.tradeLoading);
  const messageLoading = useSelector(state => state.message.messageLoading);

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
          setPublicOffers([...publicOffers, ...res.publicOffers]);
          setLoadingItems([]);
          setLoading(false);
          console.log(res);
        },
        err => {
          console.log('Err => ', err);
          setLoadingItems([]);
          setLoading(false);
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

  useEffect(() => {
    if (loading) {
      if (publicOffers.length === 0) {
        setLoadingItems(new Array(6).fill({loading: true}));
      }
    }
  }, [loading, publicOffers.length]);

  useEffect(() => {
    if (!tradeLoading && !messageLoading && allMyMessages?.messageDocs) {
      const trades = historyTrades.map(trade => ({...trade, isTrade: true}));
      const messages = allMyMessages?.messageDocs.map(message => ({
        ...message,
        isTrade: false,
      }));

      let combinedData = [...trades, ...messages];
      combinedData.sort(sortInboxByDate);
      setCombinedInbox(combinedData);
    }
  }, [historyTrades, allMyMessages, tradeLoading, messageLoading]);

  const sortInboxByDate = (objA: any, objB: any) => {
    // Check for support messages and prioritize them
    if (objA.isSupportMessage && !objB.isSupportMessage) {
      return -1;
    }
    if (!objA.isSupportMessage && objB.isSupportMessage) {
      return 1;
    }

    const dateA = new Date(objA.updatedAt).getTime();
    const dateB = new Date(objB.updatedAt).getTime();
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
    return 0;
  };

  const handleArchiveTrade = (tradeId: string) => {

    let newCombinedInbox = [...combinedInbox];
    newCombinedInbox = newCombinedInbox.filter(trade => trade?._id !== tradeId);
    setCombinedInbox(newCombinedInbox);
    const reqData = {
      userId: userData?._id,
      tradeId: tradeId,
    };
    dispatch(
      archiveTrade(
        reqData,
        (res: any) => {
        },
        (err: any) => {
          console.log(err);
        },
      ),
    );
  };

  const onInboxRefresh = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    dispatch(getAllMyMessages(userData?._id));
    dispatch(
      getTradesHistory({
        userId: userData?._id,
      }),
    );
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
    loggingService().logEvent('start_create_public_offer');
  };

  const renderBottomButtonView = () => {
    if (index === 1) {
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

  const RenderUserDetails = ({item, isTrade}) => {
    let statusColorObj;
    let showArchive = isTrade && shouldShowArchive(item);
    if (isTrade) {
      statusColorObj = getTradeStatusColor(item.status);
    }
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
            {item?.isSupportMessage && (
              <ProductNameLabel>
                {item.messages[item.messages.length - 1].message.slice(0, 33) +
                  '...'}
              </ProductNameLabel>
            )}
            {isTrade && (
              <StatusContainerView
                bgColor={statusColorObj?.backColor}
                borderColor={statusColorObj?.labelColor}>
                <StatusLabel color={statusColorObj?.labelColor}>
                  {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
                </StatusLabel>
              </StatusContainerView>
            )}
          </OwnerDetailsView>
        </EmptyRowView>
        {showArchive === true ? (
          <PublicOfferDeleteContainer
            onPress={() => handleArchiveTrade(item?._id)}
          >
            <DeleteText>Archive</DeleteText>
          </PublicOfferDeleteContainer>
        ) : (
          <TimeLabel> {daysPast(item.createdAt)} </TimeLabel>
        )}
      </RowView>
    );
  };

  const tradeOfferCellOnPress = item => {
    setSelectedTrade(item._id);

    navigation.navigate('OffersMessageScreen', {item});
  };

  const renderPublicOfferItem = ({item}: any) => {
    if (item.loading) {
      return <LoadingPublicOfferCell />;
    }
    return (
      <PublicOfferItem
        key={item._id}
        publicOffer={item}
        handleDelete={handleDeletePublicOffer}
      />
    );
  };

  const renderOfferItem = ({item}: any) => {
    if (item.isTrade) {
      return (
        <OfferCellContainer
          key={item._id}
          onPress={() => tradeOfferCellOnPress(item)}>
          <RenderUserDetails item={item} isTrade={true} />
          <TradeOfferCell
            offerItem={item}
            isInTrade={false}
            onPress={() => tradeOfferCellOnPress(item)}
          />
        </OfferCellContainer>
      );
    } else {
      const isReceiver = userData?._id === item.receiver._id;
      const showNotifBadge =
        (isReceiver && item?.receiverNewMessage) ||
        (!isReceiver && item?.senderNewMessage);
      return (
        <OfferCellContainer
          isMessageItem={true}
          key={item._id}
          onPress={() => goToMessageScreen(item)}>
          <RenderUserDetails item={item} isTrade={false} />
          {showNotifBadge && <CellBadge top={5} left={5} />}
          {!item?.isSupportMessage && (
            <OwnerDetailsView>
              <OfferForSellOnlyCell itemData={item.product} />
            </OwnerDetailsView>
          )}
        </OfferCellContainer>
      );
    }
  };

  const SecondRoute = () => (
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
        data={[...publicOffers, ...loadingItems]}
        renderItem={renderPublicOfferItem}
        keyExtractor={item => item?._id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onInboxRefresh} />
        }
      />
    </TabContainer>
  );

  const FirstRoute = () => (
    <TabContainer>
      {tradeLoading ? (
        <>
          {Array.from({length: 6}, (_, idx) => (
            <LoadingPublicOfferCell key={idx} />
          ))}
        </>
      ) : (
        <OffersListView
          data={combinedInbox}
          renderItem={renderOfferItem}
          keyExtractor={item => item._id.toString()}
          extraData={selectedTrade}
          ListEmptyComponent={
            <EmptyListView
              title={'No Offers'}
              subtitle={'Active offers will show up here'}
              buttonText={'Start Trading'}
              handleButtonPress={() => navigation.navigate('Home')}
            />
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onInboxRefresh} />
          }
        />
      )}
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
