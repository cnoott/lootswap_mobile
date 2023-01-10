/***
  LootSwap - EMPTY OFFERS VIEW
 ***/

import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import LSButton from '../../../components/commonComponents/LSButton';
import {EmptyListContainer, NoOffersLabel, NoOffersMessage} from '../styles';
import {EMPTY_TRADE_OFFERS_ICON} from 'localsvgimages';
import {Size, Type} from 'custom_enums';
import {LoadingProps} from '../../../redux/modules/loading/reducer';

export const NoOffersView: FC<any> = ({navigation}) => {
  const loading: LoadingProps = useSelector(state => state.loading);
  if (loading?.isLoading) {
    return null;
  }
  return (
    <EmptyListContainer>
      <SvgXml xml={EMPTY_TRADE_OFFERS_ICON} />
      <NoOffersLabel>No Offers</NoOffersLabel>
      <NoOffersMessage>
        No offers for now! Active offers will show up here.
      </NoOffersMessage>
      <LSButton
        title={'Start Trading'}
        size={Size.Small}
        type={Type.Primary}
        radius={20}
        onPress={() => navigation.navigate('Home')}
      />
    </EmptyListContainer>
  );
};

export default NoOffersView;
