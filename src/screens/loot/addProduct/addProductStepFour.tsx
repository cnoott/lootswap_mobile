/***
LootSwap - ADD_PRODUCT STEP 4
***/

import React, {FC, useState, useEffect} from 'react';
import LSInput from '../../../components/commonComponents/LSInput';
import {
  Container,
  HorizontalSpace,
  TradeOptionsText,
  TradeButton,
  TradeButtonText,
  RecTagContainer,
  FreeTag,
  EmptyView,
  TouchableRowTradeOptions,
  PaypalDisclaimerView,
  DisclaimerText,
  DisclaimerTextUnderlined,
} from './styles';
import {useSelector} from 'react-redux';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import {SvgXml} from 'react-native-svg';
import {WARNING_ICON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepFour: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const navigation: NavigationProp<any, any> = useNavigation();
  const {stepFour} = addProductData;
  const [tradeDes, setTradeDes] = useState(stepFour?.tradeDescription || '');
  const {updateProductData} = props;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, skippedPaypalOnboarding} = auth;

  useEffect(() => {
    if (!userData?.paypal_onboarded && skippedPaypalOnboarding) {
      onChangeTrade(2);
    }
  }, []);

  const onChangeTrade = (index = 1) => {
    const newData = {
      isTradeAndSell: false,
      isTradeOnly: false,
      isSellOnly: false,
    };
    switch (index) {
      case 1:
        newData.isTradeAndSell = true;
        newData.isTradeOnly = false;
        newData.isSellOnly = false;
        break;
      case 2:
        newData.isTradeAndSell = false;
        newData.isTradeOnly = true;
        newData.isSellOnly = false;
        break;
      case 3:
        newData.isTradeAndSell = false;
        newData.isTradeOnly = false;
        newData.isSellOnly = true;
        break;
      default:
        break;
    }
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeOptions: {
          ...newData,
        },
      },
    });
  };
  const onBlurCall = () => {
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeDescription: tradeDes,
      },
    });
  };
  const renderTradeButton = (
    label: string,
    isSelected: boolean,
    onPress: Function,
  ) => {
    const disableSellOptions =
      skippedPaypalOnboarding &&
      !userData?.paypal_onboarded &&
      label !== 'Trade Only';

    return (
      <TouchableRowTradeOptions onPress={onPress} disabled={disableSellOptions}>
        <TradeButton selected={isSelected} disabled={disableSellOptions}>
          <TradeButtonText selected={isSelected} disabled={disableSellOptions}>
            {label}
          </TradeButtonText>
        </TradeButton>
        {label === 'Trade and Sell' && (
          <RecTagContainer>
            <FreeTag>Recommended</FreeTag>
          </RecTagContainer>
        )}
      </TouchableRowTradeOptions>
    );
  };
  const renderTradeView = () => {
    return (
      <EmptyView>
        <TradeOptionsText>
          Do you want to trade or sell your item?
        </TradeOptionsText>
        {renderTradeButton(
          'Trade and Sell',
          stepFour?.tradeOptions?.isTradeAndSell,
          () => onChangeTrade(1),
        )}
        {renderTradeButton(
          'Trade Only',
          stepFour?.tradeOptions?.isTradeOnly,
          () => onChangeTrade(2),
        )}
        {renderTradeButton(
          'Sell Only',
          stepFour?.tradeOptions?.isSellOnly,
          () => onChangeTrade(3),
        )}
      </EmptyView>
    );
  };

  const onDisclaimerPress = () => {
    navigation.navigate('LinkPaypalScreen', {
      goToListLoot: false,
    });
  };

  return (
    <Container>
      <HorizontalSpace>
        {renderTradeView()}
        {skippedPaypalOnboarding && !userData?.paypal_onboarded && (
          <PaypalDisclaimerView onPress={onDisclaimerPress}>
            <SvgXml xml={WARNING_ICON} />
            <DisclaimerText>
              In order to sell your item, you need to link your PayPal.{' '}
              <DisclaimerTextUnderlined>
                Tap here to link
              </DisclaimerTextUnderlined>
            </DisclaimerText>
          </PaypalDisclaimerView>
        )}
        {!addProductData?.stepOne?.stockxUrlKey && (
          <TradeOptionsText>
            Are there any particular items you wish to trade this item for?
          </TradeOptionsText>
        )}
      </HorizontalSpace>

      {!addProductData?.stepOne?.stockxUrlKey && (
        <LSInput
          onChangeText={setTradeDes}
          value={tradeDes}
          placeholder={'Description'}
          multiline={true}
          height={200}
          horizontalSpace={20}
          onBlurCall={onBlurCall}
        />
      )}
    </Container>
  );
};

export default AddProductStepFour;
