/***
  LootSwap - EMPTY LIST SCREEN
 ***/

import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {
  EmptyListContainer,
  NoOffersMessage,
} from './LSEmptyListComponentStyles';
import {LoadingProps} from '../../redux/modules/loading/reducer';

export const LSEmptyListComponent: FC<any> = ({svgImg, emptyMsg = ''}: any) => {
  const loading: LoadingProps = useSelector(state => state.loading);
  if (loading?.isLoading) {
    return null;
  }
  return (
    <EmptyListContainer>
      {!!svgImg && <SvgXml xml={svgImg} />}
      <NoOffersMessage>{emptyMsg}</NoOffersMessage>
    </EmptyListContainer>
  );
};

export default LSEmptyListComponent;
