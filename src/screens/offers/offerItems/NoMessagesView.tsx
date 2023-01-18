/***
  LootSwap - EMPTY MESSAGES VIEW
 ***/

import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {EmptyListContainer, NoOffersMessage} from '../styles';
import {LoadingProps} from '../../../redux/modules/loading/reducer';

export const NoMessagesView: FC<any> = () => {
  const loading: LoadingProps = useSelector(state => state.loading);
  if (loading?.isLoading) {
    return null;
  }
  return (
    <EmptyListContainer>
      <NoOffersMessage>No Messages</NoOffersMessage>
    </EmptyListContainer>
  );
};

export default NoMessagesView;
