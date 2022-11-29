/***
INSQUAD - WALLET MODAL
***/

import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {
  CenterBlock,
  Container,
  ModalContainer,
  FlatList,
  SubContainer,
  Touchable,
  BottomButtonContainer,
  BottomContainer,
  Image,
  VerticalSeparator,
  HorizontalSeparator,
  ButtonTouchable,
  BlurStyle,
} from './styles';
// import { BlurView } from '@react-native-community/blur';
import {WalletItem} from '../../../components/walletItem';
import {TextL} from '../../../components/text';
import {FontFamily} from '../../../enums';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {WALLET_ACTIVE} from '../../../constants/constants';
import {MarginL} from '../../../components/styles';
import {useDispatch, useSelector} from 'react-redux';
import {WalletProps} from '../../../redux/modules/wallet/reducer';
import {WALLET_DATA} from '../../../constants/actions';

export const WalletScreen: FC<{}> = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {colors} = theme;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const wallet: WalletProps = useSelector(state => state.wallet); // Accessing wallet data from the redux state

  /*
   * Modal close method
   */
  const onCrossPress = () => {
    navigation.goBack();
  };

  /*
   * Modal item press method
   */
  const onItemPress = (item: any) => {
    const walletData = [...wallet.walletData];
    walletData.map(wItem => {
      wItem.selected = false;
      if (wItem.id === item.id) {
        wItem.selected = true;
      }
    });

    // Updating the redux state for the selected wallet item and dismissing the Wallet modal
    dispatch({
      type: WALLET_DATA.UPDATE,
      payload: walletData,
    });
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return <WalletItem item={item} onPress={onItemPress} />;
  };

  return (
    <Container>
      {/* <BlurView
        style={BlurStyle}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="black"
      /> */}
      <SubContainer>
        <ModalContainer>
          <TextL title={'Choose a Wallet'} family={FontFamily.Medium} />
          <CenterBlock />
          <Touchable>
            <Icon name="edit-3" size={20} color={colors.cancel} />
          </Touchable>
          <Touchable onPress={onCrossPress}>
            <Icon name="x" size={20} color={colors.cancel} />
          </Touchable>
        </ModalContainer>
        <HorizontalSeparator />
        <FlatList
          data={wallet.walletData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <HorizontalSeparator />
        <BottomContainer>
          <ButtonTouchable>
            <BottomButtonContainer>
              <Image source={WALLET_ACTIVE} />
              <TextL title={'Add Wallet'} family={FontFamily.Medium} />
            </BottomButtonContainer>
          </ButtonTouchable>
          <VerticalSeparator />
          <ButtonTouchable>
            <BottomButtonContainer>
              <FontistoIcon name="locked" size={14} color={colors.primary} />
              <MarginL ml={9} />
              <TextL title={'Lock Martian'} family={FontFamily.Medium} />
            </BottomButtonContainer>
          </ButtonTouchable>
        </BottomContainer>
      </SubContainer>
    </Container>
  );
};

export default WalletScreen;
