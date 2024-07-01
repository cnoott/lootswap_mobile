/***
LootSwap - ADD_PRODUCT STEP 5
***/

import React, {FC, useState} from 'react';
import LSInput from '../../../components/commonComponents/LSInput';
import {Switch} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  Container,
  StepFiveContainer,
  HorizontalSpace,
  TradeOptionsText,
  MarketRangeText,
  Divider,
  ShippingDes,
  TouchableRow,
  ShippingOptionsText,
  FreeTagContainer,
  FreeTag,
  FreeShippingDes,
  RangeBarContainer,
  GreenBar,
  MedianDotContainer,
  MedianContainer,
  MedianDot,
  MedianTextContainer,
  MedianText,
  RedBar,
  OrangeGradientBar,
  KeyboardAvoidingView,
  SmartPricingContainer,
} from './styles';
import {
  DOLLOR_TEXT,
  USD_TEXT,
  RADIO_BUTTON_SELECTED,
  RADIO_BUTTON_UNSELECTED,
} from 'localsvgimages';
import {useSelector} from 'react-redux';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {ScrollView} from 'react-native';
import {useTheme} from 'styled-components';
import {Alert} from 'custom_top_alert';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepFive: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const {stepFive, stepTwo, stepOne} = addProductData;
  const [price, setPrice] = useState(stepFive?.productPrice ?? '');
  const [floorPrice, setFloorPrice] = useState(stepFive?.floorPrice ?? '');
  const [dotPosition, setDotPosition] = useState('50');
  const [dotText, setDotText] = useState('$200');
  const [shippingCost, setShippingCost] = useState(stepFive?.shippingCost ?? 0);
  const [showFloorPrice, setShowFloorPrice] = useState(false);
  const theme = useTheme();

  const toggleFloorPrice = () => {
    if (showFloorPrice) {
      setFloorPrice('');
    }

    setShowFloorPrice(!showFloorPrice);
  };
  const handleSetPrice = (priceInput: any) => {
    setPrice(priceInput);
    const converted = priceInput;
    const lastSalePrice = addProductData?.stepFive?.median;

    if (!lastSalePrice) {
      return;
    }

    let dotPositionCalc = ((converted - 0.9 * lastSalePrice) / (0.2 * lastSalePrice)) * 100;

    const positionWithBounds = Math.max(0, Math.min(100, dotPositionCalc));
    setDotPosition(positionWithBounds);

    // Updated maxSalePrice based on 10%
    const maxSalePrice = lastSalePrice + lastSalePrice * 0.1;
    if (priceInput >= maxSalePrice) {
      setDotText(`High $${maxSalePrice.toFixed(2)}`);
    } else {
      setDotText('$' + priceInput);
    }
  };
  const handleSetFloorPrice = (priceInput: number) => {
    setFloorPrice(priceInput);
  };
  const {updateProductData} = props;
  const onBlurCall = () => {
    if (floorPrice >= price) {
      Alert.showError('Your Floor Price Cannot Be Greater Than Your Product Price');
    }
    updateProductData({
      ...addProductData,
      stepFive: {
        ...addProductData?.stepFive,
        productPrice: price,
        floorPrice: floorPrice,
        shippingCost: shippingCost,
      },
    });
  };
  const onButtonPress = (newData: any) => {
    updateProductData({
      ...addProductData,
      stepFive: {
        ...addProductData?.stepFive,
        ...newData,
      },
    });
  };
  const renderShippingView = () => {
    return (
      <HorizontalSpace>
        <Divider />
        <TradeOptionsText>Shipping</TradeOptionsText>
        <ShippingDes>
          This option only applies if someone buys your item, not for trades.
          You will have your choice of these carriers UPS, USPS, and FedEx.
        </ShippingDes>
        <TouchableRow
          onPress={() =>
            onButtonPress({
              isFreeShipping: true,
              isShippingPrice: false,
              shippingCost: 0,
            })
          }>
          <SvgXml
            xml={
              stepFive?.isFreeShipping
                ? RADIO_BUTTON_SELECTED
                : RADIO_BUTTON_UNSELECTED
            }
          />
          <ShippingOptionsText>Provide Free Shipping</ShippingOptionsText>
          <FreeTagContainer>
            <FreeTag>Recommended</FreeTag>
          </FreeTagContainer>
        </TouchableRow>

        <TouchableRow
          onPress={() =>
            onButtonPress({isShippingPrice: true, isFreeShipping: false})
          }>
          <SvgXml
            xml={
              stepFive?.isShippingPrice
                ? RADIO_BUTTON_SELECTED
                : RADIO_BUTTON_UNSELECTED
            }
          />
          <ShippingOptionsText>Set Shipping Price</ShippingOptionsText>
        </TouchableRow>
        <FreeShippingDes>
          Pay shipping costs based on buyers location
        </FreeShippingDes>
      </HorizontalSpace>
    );
  };

  const renderMarketRange = () => {
    if (!stepFive?.startRange || !stepFive?.endRange) {
      return <></>;
    }
    return (
      <HorizontalSpace>
        <Divider />
        <TradeOptionsText>
          Estimated Market Range:{' '}
          <MarketRangeText>{`${stepFive?.startRange} - ${stepFive?.endRange}`}</MarketRangeText>
        </TradeOptionsText>
        <MedianContainer dotPosition={dotPosition}>
          <MedianTextContainer>
            <MedianText>{String(dotText)}</MedianText>
          </MedianTextContainer>
        </MedianContainer>
        <RangeBarContainer>
          <GreenBar />
          <OrangeGradientBar />
          <RedBar />
          <MedianDotContainer dotPosition={dotPosition}>
            <MedianDot />
          </MedianDotContainer>
        </RangeBarContainer>
      </HorizontalSpace>
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView keyboardVerticalOffset={100}>
        <ScrollView>
          <HorizontalSpace>
            <TradeOptionsText>Price</TradeOptionsText>
          </HorizontalSpace>
          <LSInput
            onChangeText={handleSetPrice}
            placeholder={'0.00'}
            value={String(price)}
            horizontalSpace={20}
            topSpace={1}
            rightIcon={USD_TEXT}
            leftIcon={DOLLOR_TEXT}
            keyboardType={'numeric'}
            onBlurCall={onBlurCall}
          />
        {stepFive?.median !== 0 && renderMarketRange()}
        <Divider />
          <HorizontalSpace>
            <TradeOptionsText>Smart Pricing</TradeOptionsText>
            <ShippingDes>
              We'll automatically drop your listing by 10% at the
              best time every week until it reaches your floor
              price.
            </ShippingDes>
            <SmartPricingContainer>
              <TradeOptionsText>Turn on Smart Pricing</TradeOptionsText>
              <Switch
                trackColor={{
                  false: theme.colors.grey,
                  true: theme.colors.toggle_dark,
                }}
                thumbColor={
                  showFloorPrice ? theme.colors.white : theme.colors.white
                }
                ios_backgroundColor={theme.colors.grey}
                onValueChange={toggleFloorPrice}
                value={showFloorPrice}
              />
          </SmartPricingContainer>
          </HorizontalSpace>
          {showFloorPrice && (
            <>
              <HorizontalSpace>
                <TradeOptionsText>Floor Price</TradeOptionsText>
              </HorizontalSpace>
              <LSInput
                onChangeText={handleSetFloorPrice}
                placeholder={'0.00'}
                value={String(floorPrice)}
                horizontalSpace={20}
                topSpace={1}
                rightIcon={USD_TEXT}
                leftIcon={DOLLOR_TEXT}
                keyboardType={'numeric'}
                onBlurCall={onBlurCall}
              />
            </>
          )}

          {renderShippingView()}
          {!stepFive?.isFreeShipping && (
            <StepFiveContainer>
              <HorizontalSpace>
                <TradeOptionsText>Shipping Cost</TradeOptionsText>
              </HorizontalSpace>
              <LSInput
                onChangeText={setShippingCost}
                placeholder={'0.00'}
                horizontalSpace={20}
                topSpace={1}
                rightIcon={USD_TEXT}
                leftIcon={DOLLOR_TEXT}
                keyboardType={'numeric'}
                onBlurCall={onBlurCall}
                value={String(shippingCost)}
              />
            </StepFiveContainer>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddProductStepFive;
