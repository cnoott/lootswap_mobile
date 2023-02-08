/***
LootSwap - SELLER PAY SHIPPING LABEL SCREEN
***/

import React, {FC, useState, useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import LSInput from '../../components/commonComponents/LSInput';
import {Size, Type} from 'custom_enums';
import {
  Container,
  SubContainer,
  FullDivider,
  SubHeaderLabel,
  TipContainer,
  TipLabel,
  TipRowView,
  TipDotView,
  TipText,
  SizeRowView,
  SizeBox,
  SizeRightLabel,
  DividerText,
  WeightRowView,
  HorizontalSpace,
} from './shippingLabelScreenStyle';
import {VerticalMargin} from '../offers/tradeCheckoutStyle';
import {Alert} from 'custom_top_alert';
import DeliveryAddressComponent from '../../components/orders/deliveryAddressComponent';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMyDetailsRequest,
  saleGenerateCarrierRates,
} from '../../redux/modules';

export const ShippingLabelScreen: FC<any> = ({route}) => {
  const {productId, paypalOrderId} = route?.params || {};
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;

  const [sizeLength, setLength] = useState(null);
  const [sizeWidth, setWidth] = useState(null);
  const [sizeHeight, setHeight] = useState(null);
  const [lbWeight, setLBWeight] = useState(null);
  const [ozWeight, setOZWeight] = useState(null);

  useEffect(() => {
    dispatch(getMyDetailsRequest(userData?._id));
  }, [userData?._id, dispatch]);

  const onSubmitPress = () => {
    if (!sizeLength || !sizeWidth || !sizeHeight || !lbWeight || !ozWeight) {
      Alert.showError('Please fill all inputs');
      return;
    }

    const convertedPounds =
      parseFloat(ozWeight) * 0.0625 + parseFloat(lbWeight);
    const rounded = convertedPounds.toFixed(4);
    const dim = {
      length: sizeLength,
      width: sizeLength,
      height: sizeHeight,
      distance_unit: 'in',
      weight: rounded,
      mass_unit: 'lb',
    };
    const reqData = {
      userId: userData?._id,
      productId: productId,
      paypalOrderId: paypalOrderId,
      dim: {dim},
    };

    dispatch(
      saleGenerateCarrierRates(
        reqData,
        res => {
          console.log('response', res);
          navigation?.navigate('ChooseServiceScreen', {
            ratesDetails: res,
            paypalOrderId: paypalOrderId,
          });
        },
        error => {
          Alert.showError('Error choosing box size:', error);
          console.log(error);
        },
      ),
    );
  };
  const renderTip = (text: string) => {
    return (
      <TipRowView>
        <TipDotView />
        <TipText>{text}</TipText>
      </TipRowView>
    );
  };
  const renderTipView = () => {
    return (
      <TipContainer>
        <TipLabel>Tip</TipLabel>
        {renderTip(
          'If you have trouble measuring the box dimensions use a measure app within your smartphone.',
        )}
        {renderTip('Estimated weight for this item is 2 lbs')}
      </TipContainer>
    );
  };
  const renderSizeInput = (
    leftVal: string,
    rightVal: string,
    onChange: Function,
  ) => {
    return (
      <SizeBox>
        <LSInput
          onChangeText={onChange}
          value={leftVal}
          placeholder={'0'}
          horizontalLeftPadding={0.1}
          topSpace={1}
          rightCustomView={<SizeRightLabel>{rightVal}</SizeRightLabel>}
          keyboardType={'numeric'}
          homeSearch={true}
          maxLength={6}
        />
      </SizeBox>
    );
  };
  const renderSizeView = () => {
    return (
      <SizeRowView>
        <SubHeaderLabel>Size</SubHeaderLabel>
        {renderSizeInput(sizeLength?.toString(), 'L', setLength)}
        <DividerText>X</DividerText>
        {renderSizeInput(sizeWidth?.toString(), 'L', setWidth)}
        <DividerText>X</DividerText>
        {renderSizeInput(sizeHeight?.toString(), 'L', setHeight)}
      </SizeRowView>
    );
  };
  const renderWeightInput = (leftVal: string, onChange: Function) => {
    return (
      <SizeBox>
        <LSInput
          onChangeText={onChange}
          value={leftVal}
          placeholder={'0'}
          horizontalLeftPadding={0.1}
          horizontalRightPadding={0.1}
          topSpace={1}
          keyboardType={'numeric'}
          homeSearch={true}
          textAlign={'right'}
          maxLength={6}
        />
      </SizeBox>
    );
  };
  const renderWeightView = () => {
    return (
      <WeightRowView>
        <SubHeaderLabel>Weight</SubHeaderLabel>
        <HorizontalSpace />
        {renderWeightInput(lbWeight?.toString(), setLBWeight)}
        <HorizontalSpace />
        <DividerText>(lb)</DividerText>
        <HorizontalSpace />
        {renderWeightInput(ozWeight?.toString(), setOZWeight)}
        <HorizontalSpace />
        <DividerText>(oz)</DividerText>
      </WeightRowView>
    );
  };
  return (
    <Container>
      <InStackHeader
        title={'Shipping Label'}
        right={false}
        onlyTitleCenterAlign={true}
      />
      <FullDivider />
      <SubContainer>
        <DeliveryAddressComponent userDetails={userData} />
        <VerticalMargin />
        {renderTipView()}
        {renderSizeView()}
        <VerticalMargin />
        {renderWeightView()}
      </SubContainer>
      <LSButton
        title={'Next'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={15}
        fitToWidth={'90%'}
        onPress={() => onSubmitPress()}
      />
    </Container>
  );
};

export default ShippingLabelScreen;
