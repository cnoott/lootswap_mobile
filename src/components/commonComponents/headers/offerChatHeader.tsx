/***
LOOTSWAP - OFFERS MESSAGE HEADER COMPONENT
***/
import React, {FC, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  OfferChatHeaderText,
  ProfileHeaderContainer,
  ProfileLeftTouchable,
  EmptyRowView,
  TouchableOpacity,
  SpaceRowView,
  ChatOfferContainer,
  OfferStatusContainer,
  OfferStatusTitleText,
  OfferStatusLeftView,
  OfferStatusRightView,
  OfferStatusText,
  ArrowContainer,
  EmptyColumnView,
  PendingOfferStatusContainer,
  OfferYouLabel,
  OfferPriceText,
} from './styles';
import {
  LEFT_BLACK_ARROW,
  ACCORDIAN_DOWN_ELLIPSE,
  OFFER_ACCEPTED_HEADER_ICON,
  OFFER_REJECTED_HEADER_ICON,
  ACCORDIAN_UP_ELLIPSE,
} from 'localsvgimages';
import {PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import LSButton from '../LSButton';
import {Size, Type} from '../../../enums';
import {LSProfileImageComponent} from '../profileImage';
import TradeOfferCell from '../../../screens/offers/offerItems/TradeOfferCell';
import OfferForSellOnlyCell from '../../../screens/offers/offerItems/OfferForSellOnlyCell';
import {Trade_Status} from 'custom_enums';
import Collapsible from 'react-native-collapsible';

interface HeaderProps {
  profilePicture: string;
  title: string;
  onAcceptPress: Function;
  onDeclinePress: Function;
  onTrippleDotPress: Function;
  offerItem: any;
  userData: any;
  profileUrl?: string;
  tradeStatus: string;
}

export const LSOfferChatHeader: FC<HeaderProps> = React.memo(
  ({
    title,
    onAcceptPress,
    onDeclinePress,
    onTrippleDotPress,
    profilePicture,
    offerItem,
    userData,
    tradeStatus,
  }) => {
    const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
    const [accOpen, setAccOpen] = useState(true);
    const isAccepted = tradeStatus === Trade_Status?.Accepted;
    const isCanceled = tradeStatus === Trade_Status?.Canceled;
    const isPending = !isAccepted && !isCanceled;
    const renderOptions = () => {
      if (tradeStatus === Trade_Status?.Accepted) {
        //The trade accepted header will be here
        return <></>;
      }

      if (tradeStatus === Trade_Status?.Canceled) {
        //the cancled header will be here
        return <></>;
      }

      if (userData?._id === offerItem?.reciever._id) {
        return (
          <>
            <LSButton
              title={'Accept'}
              size={Size.Extra_Small}
              type={Type.Success}
              radius={20}
              onPress={() => onAcceptPress()}
            />
            <SpaceRowView />
            <SpaceRowView />
            <LSButton
              title={'Decline'}
              size={Size.Extra_Small}
              type={Type.Error}
              radius={20}
              onPress={() => onDeclinePress()}
            />
            <SpaceRowView />
          </>
        );
      } else {
        return (
          <>
            <LSButton
              title={'Decline'}
              size={Size.Extra_Small}
              type={Type.Error}
              radius={20}
              onPress={() => onDeclinePress()}
            />
            <SpaceRowView />
          </>
        );
      }
    };

    const renderOfferCellView = () => {
      return (
        <TradeOfferCell offerItem={offerItem} topMargin={5} isInTrade={true} />
      );
    };

    const renderOfferForSellOnlyView = () => {
      return <OfferForSellOnlyCell itemData={offerItem?.recieverItem} />;
    };

    const RenderOfferStatusAccrordianView = () => {
      const name =
        offerItem?.reciever?._id === userData?._id
          ? offerItem?.reciever?.name
          : offerItem?.sender?.name;
      return (
        <OfferStatusContainer isAccepted={isAccepted}>
          <OfferStatusLeftView>
            <OfferStatusTitleText>
              {name} has {`${isAccepted ? 'accepted' : 'declined'}`} your offer!
            </OfferStatusTitleText>
            <EmptyRowView>
              <SvgXml
                xml={
                  isAccepted
                    ? OFFER_ACCEPTED_HEADER_ICON
                    : OFFER_REJECTED_HEADER_ICON
                }
              />
              <OfferStatusText isAccepted={isAccepted}>{`${
                isAccepted ? 'Trade Accepted' : 'Trade Declined'
              }`}</OfferStatusText>
            </EmptyRowView>
          </OfferStatusLeftView>
          <OfferStatusRightView>
            <LSButton
              title={'View Order'}
              size={Size.Extra_Small}
              type={Type.Custom}
              radius={20}
              onPress={() => {}}
              buttonCustomColor={'#FF981F'}
            />
          </OfferStatusRightView>
        </OfferStatusContainer>
      );
    };

    const RenderPendingOfferStatusAccrordianView = () => {
      return (
        <PendingOfferStatusContainer>
          <EmptyColumnView>
            <OfferYouLabel>Offered you</OfferYouLabel>
            <OfferPriceText>${offerItem?.senderMoneyOffer}</OfferPriceText>
          </EmptyColumnView>
          <EmptyRowView>
            {userData?._id === offerItem?.reciever._id && (
              <>
                <LSButton
                  title={'Accept'}
                  size={Size.Extra_Small}
                  type={Type.Success}
                  radius={20}
                  onPress={() => onAcceptPress()}
                />
                <SpaceRowView />
                <SpaceRowView />
              </>
            )}
            <LSButton
              title={'Decline'}
              size={Size.Extra_Small}
              type={Type.Error}
              radius={20}
              onPress={() => onDeclinePress()}
            />
          </EmptyRowView>
        </PendingOfferStatusContainer>
      );
    };

    const renderOfferStatusContainer = () => {
      return (
        <EmptyColumnView>
          {isPending ? (
            <RenderPendingOfferStatusAccrordianView />
          ) : (
            <RenderOfferStatusAccrordianView />
          )}
          <Collapsible collapsed={accOpen} renderChildrenCollapsed={true}>
            {isPending ? renderOfferForSellOnlyView() : renderOfferCellView()}
          </Collapsible>
          <ArrowContainer onPress={() => setAccOpen(!accOpen)}>
            <SvgXml
              xml={accOpen ? ACCORDIAN_DOWN_ELLIPSE : ACCORDIAN_UP_ELLIPSE}
            />
          </ArrowContainer>
        </EmptyColumnView>
      );
    };

    return (
      <ChatOfferContainer>
        <ProfileHeaderContainer>
          <EmptyRowView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgXml xml={LEFT_BLACK_ARROW} />
            </TouchableOpacity>
            <LSProfileImageComponent
              profileUrl={profilePicture}
              imageHeight={34}
              imageWidth={34}
              imageRadius={17}
            />
            <OfferChatHeaderText>{title}</OfferChatHeaderText>
          </EmptyRowView>
          <EmptyRowView>
            {false && renderOptions()}
            <ProfileLeftTouchable onPress={() => onTrippleDotPress()}>
              <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
            </ProfileLeftTouchable>
          </EmptyRowView>
        </ProfileHeaderContainer>
        {renderOfferStatusContainer()}
      </ChatOfferContainer>
    );
  },
);
