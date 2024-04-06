import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {EmptyListContainer, NoOffersLabel, NoOffersMessage} from './EmptyListViewStyles';
import {EMPTY_TRADE_OFFERS_ICON} from 'localsvgimages';
import {Size, Type} from 'custom_enums';
import LSButton from './LSButton';

interface EmptyListViewProps {
  title: string;
  subtitle: string;
  buttonText: string;
  handleButtonPress: Function;
}

export const EmptyListView: FC<EmptyListViewProps> = props => {
  const {title, subtitle, buttonText, handleButtonPress} = props;

  return (
    <EmptyListContainer>
      <SvgXml xml={EMPTY_TRADE_OFFERS_ICON} />
      <NoOffersLabel>{title}</NoOffersLabel>
      <NoOffersMessage>{subtitle}</NoOffersMessage>
      <LSButton
        title={buttonText}
        size={Size.Small}
        type={Type.Primary}
        radius={20}
        onPress={handleButtonPress}
      />
    </EmptyListContainer>
  );
};

export default EmptyListView;
