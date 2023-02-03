import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {SHIPPING_INS_HEADER_IMG} from 'localsvgimages';
import LSButton from '../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  HeaderImageContainer,
  StepView,
  StepContainer,
  VerticalMargin,
  StepNumberLabel,
  StepLineView,
  StepDot,
  DashLine,
  StepTitle,
  StepDetailsView,
  StepDes,
} from './shippingInstructionModalStyle';

interface OrderUserDetailViewProps {
  onButtonPress: Function;
}

const ShippingInstructionModalComponent = (props: OrderUserDetailViewProps) => {
  const {onButtonPress} = props;
  const renderStepView = (
    stepNum: string,
    stepTitle: string,
    stepDes: string,
    isLast: boolean = false,
  ) => {
    return (
      <StepContainer>
        <StepNumberLabel>{stepNum}</StepNumberLabel>
        <StepLineView>
          <StepDot />
          <DashLine />
        </StepLineView>
        <StepDetailsView>
          <StepTitle>{stepTitle}</StepTitle>
          <StepDes isLastStep={isLast}>{stepDes}</StepDes>
        </StepDetailsView>
      </StepContainer>
    );
  };
  return (
    <>
      <HeaderImageContainer>
        <SvgXml xml={SHIPPING_INS_HEADER_IMG} />
      </HeaderImageContainer>
      <VerticalMargin />
      <StepView>
        {renderStepView(
          '01',
          'UPS location',
          'Make sure you drop the package off at whichever shipping carrier you chose within 3 business days from when the Purchase happended',
        )}
        {renderStepView(
          '02',
          'Shipping',
          'If you’re shipping multiple items, please use a single box',
        )}
        {renderStepView('03', 'Box type', 'Use a Sturdy box ')}
        {renderStepView(
          '04',
          'Shipping label',
          'Make sure you are using the shipping label that will be provided after payment',
          true,
        )}
      </StepView>
      <VerticalMargin />
      <LSButton
        title={'I understand'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={15}
        fitToWidth={'90%'}
        onPress={() => onButtonPress()}
      />
    </>
  );
};

export default ShippingInstructionModalComponent;
