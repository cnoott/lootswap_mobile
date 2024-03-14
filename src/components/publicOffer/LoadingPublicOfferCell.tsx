import React, {FC, useEffect, useState} from 'react';
import {Animated, View, StyleSheet, Text} from 'react-native';
import {
  RowView,
  OfferCellContainer,
  AboveItemLabel,
  EmptyView,
  SwapButtonContainer,
  SwapLine,
} from '../../screens/offers/styles';
import {styles} from './styles';
import {HomePublicOfferCard, PublicOfferItemContainer} from './styles';
import {SvgXml} from 'react-native-svg';
import {SWAP_ICON} from 'localsvgimages';

interface LoadingPublicOfferCellProps {
  isFromHome?: boolean;
}

const LoadingPublicOfferCell: FC<LoadingPublicOfferCellProps> = props => {
  const [opacity] = useState(new Animated.Value(0.5)); // Initial opacity for blinking effect
  const {isFromHome = false} = props;
  const renderSwapView = () => {
    return (
      <EmptyView>
        <SwapLine size={95} />
        <SwapButtonContainer>
          <SvgXml xml={SWAP_ICON} />
        </SwapButtonContainer>
      </EmptyView>
    );
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  const UserDetailsPlaceholder = () => (
    <RowView style={styles.userDetailsPlaceholder}>
      <Animated.View style={[styles.profileImagePlaceholder, {opacity}]} />
      <Animated.View style={[styles.userNamePlaceholder, {opacity}]} />
    </RowView>
  );

  const OfferDetailsPlaceholder = () => (
    <View style={styles.offerDetailsPlaceholder}>
      <Animated.View style={[styles.offerPlaceholder, {opacity}]} />
      <Animated.View style={[styles.offerPlaceholder, {opacity}]} />
    </View>
  );

  const HomeScreenOfferPlaceholder = () => (
    <>
      <PublicOfferItemContainer>
        <AboveItemLabel> Item you are trading </AboveItemLabel>
        <View style={styles.homeImagePlaceholderWrapper}>
          <Animated.View style={[styles.homeImagePlaceholder, {opacity}]} />
        </View>
      </PublicOfferItemContainer>
      {renderSwapView()}
      <PublicOfferItemContainer>
        <AboveItemLabel> Item your are getting </AboveItemLabel>
        <View style={styles.homeImagePlaceholderWrapper}>
          <Animated.View style={[styles.homeImagePlaceholder, {opacity}]} />
        </View>
      </PublicOfferItemContainer>
    </>
  );

  if (isFromHome) {
    return (
      <HomePublicOfferCard topMargin={5} isFromHome={isFromHome}>
        <HomeScreenOfferPlaceholder />
      </HomePublicOfferCard>
    );
  }
  return (
    <>
      <OfferCellContainer>
        <UserDetailsPlaceholder />
        <OfferDetailsPlaceholder />
      </OfferCellContainer>
    </>
  );
};

export default LoadingPublicOfferCell;
