/***
LootSwap - ADD_PRODUCT STEP 5
***/

import React, {FC, useState} from 'react';
import LSInput from '../../../components/commonComponents/LSInput';
import {SvgXml} from 'react-native-svg';
import {
  Container,
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

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepFive: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const {stepFive} = addProductData;
  const [price, setPrice] = useState(stepFive?.productPrice || 0.0);
  const [dotPosition, setDotPosition] = useState('50');
  const [dotText, setDotText] = useState('$' + 200);
  const [shippingCost, setShippingCost] = useState(
    stepFive?.shippingCost || 0.0,
  );

  const handleSetPrice = (priceInput: any) => {
    setPrice(priceInput);
    const converted = priceInput;
    const lastSalePrice = addProductData?.stepFive?.median;

    // Updated calculation based on 10% range
    const dotPositionCalc = ((converted - 0.9 * lastSalePrice) / (0.2 * lastSalePrice)) * 100;

    const positionWithBounds = Math.max(0, Math.min(100, dotPositionCalc));
    setDotPosition(positionWithBounds);

    // Updated maxSalePrice based on 10%
    const maxSalePrice = lastSalePrice + lastSalePrice * 0.1;
    if (priceInput >= maxSalePrice) {
        setDotText(`High $${maxSalePrice.toFixed(2)}`);  // Added toFixed(2) for currency formatting
    } else {
        setDotText('$' + priceInput);
    }
  };
  const {updateProductData} = props;
  const onBlurCall = () => {
    updateProductData({
      ...addProductData,
      stepFive: {
        ...addProductData?.stepFive,
        productPrice: price,
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
            onButtonPress({isFreeShipping: true, isShippingPrice: false})
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
    return (
      <HorizontalSpace>
        <Divider />
        <TradeOptionsText>Estimated Market Range: <MarketRangeText>${stepFive?.startRange} - ${stepFive?.endRange}</MarketRangeText></TradeOptionsText>
        <MedianContainer dotPosition={dotPosition}>
          <MedianTextContainer>
            <MedianText>
              {dotText}
            </MedianText>
          </MedianTextContainer>
        </MedianContainer>
        <RangeBarContainer>
          <GreenBar />
          <OrangeGradientBar />
          <RedBar />
          <MedianDotContainer dotPosition={dotPosition}>
            <MedianDot/>
          </MedianDotContainer>
        </RangeBarContainer>
      </HorizontalSpace>
    );
  };

  return (
    <Container>
      <ScrollView>
        <HorizontalSpace>
          <TradeOptionsText>Price</TradeOptionsText>
        </HorizontalSpace>
        <LSInput
          onChangeText={handleSetPrice}
          placeholder={'0.00'}
          horizontalSpace={20}
          topSpace={1}
          rightIcon={USD_TEXT}
          leftIcon={DOLLOR_TEXT}
          keyboardType={'numeric'}
          onBlurCall={onBlurCall}
        />
        {stepFive?.median && renderMarketRange()}
        {renderShippingView()}
        {!stepFive?.isFreeShipping && (
          <>
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
            />
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default AddProductStepFive;
