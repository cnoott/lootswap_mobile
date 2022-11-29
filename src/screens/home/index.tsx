/***
INSQUAD - FIRST TAB SCREEN
***/

import React, { FC } from 'react';
import { InHeader } from '../../components/header';
import { BLACKLOGO } from '../../constants/constants';
import {
  Container,
  Image,
  SubHeaderContainer,
  SubContainer,
  Block,
  ButtonContainer,
  FlatList,
  MarginR,
  MarginT,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { moderateScale } from 'react-native-size-matters';
import { INButton } from '../../components/button';
import { HomeItem } from '../../components/homeItem';
import { TextLX, TextS, TextXXXL } from '../../components/text';
import { Size, Type } from '../../enums';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { WalletProps } from '../../redux/modules/wallet/reducer';
import { getTitle } from '../../utility/utility';

export const HomeScreen: FC<{}> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const wallet: WalletProps = useSelector((state) => state.wallet); // Accessing wallet data from the redux state

  /*
   * Method to open Wallet Modal
   */
  const onPress = () => {
    navigation.navigate('WalletScreen'); // Opening the Wallet modal
  };

  const renderItem = ({ item }) => {
    return <HomeItem item={item} />;
  };

  return (
    <Container>
      <InHeader title={getTitle(wallet.chainData)} />
      <SubContainer>
        <SubHeaderContainer>
          <Image source={BLACKLOGO} />
          <Block>
            <SubHeaderContainer onPress={onPress}>
              <TextXXXL type={Type.Primary}>{getTitle(wallet.walletData)}</TextXXXL>
              <Icon name="chevron-down" size={20} color={colors.primary} />
            </SubHeaderContainer>
            <MarginT mt={15} />
            <SubHeaderContainer>
              <TextS type={Type.Placeholder}>0xe09f...9926</TextS>
              <MarginR />
              <MaterialIcon
                name="file-multiple-outline"
                size={moderateScale(11)}
                color={colors.placeholder}
              />
            </SubHeaderContainer>
          </Block>
        </SubHeaderContainer>
        <MarginT mt={14} />
        <TextLX type={Type.Primary}>
          $23,450
          <TextLX type={Type.Placeholder}>.23</TextLX>
        </TextLX>
        <ButtonContainer>
          <INButton size={Size.Medium} title={'BUY'} type={Type.Primary} />
          <INButton size={Size.Medium} title={'SEND'} type={Type.Secondary} />
        </ButtonContainer>
        <FlatList
          data={wallet.currenciesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SubContainer>
    </Container>
  );
};

export default HomeScreen;
