import React, {FC} from 'react';
import {
  Container,
  StepContainer,
  StepLabelText,
  StepDivider,
  DashLine,
  StepOuterContainer,
} from './styles';
import {SvgXml} from 'react-native-svg';
import {useTheme} from 'styled-components';
import {
  ORDER_TRACK_STEP_SELECTED,
  ORDER_TRACK_STEP_UNSELECTED,
  ORDER_TRACK_PURCHASED,
  ORDER_TRACK_SHIPPED_SELECTED,
  ORDER_TRACK_IN_TRANSIT_UNSELECTED,
  ORDER_TRACK_DELIVERED_UNSELECTED,
} from 'localsvgimages';

const stepsList = [
  {
    index: 1,
    label: 'Purchased',
    selectedIcon: ORDER_TRACK_PURCHASED,
    unSelectedIcon: ORDER_TRACK_PURCHASED,
  },
  {
    index: 2,
    label: 'Shipped',
    selectedIcon: ORDER_TRACK_SHIPPED_SELECTED,
    unSelectedIcon: ORDER_TRACK_SHIPPED_SELECTED,
  },
  {
    index: 3,
    label: 'In Transit',
    selectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
  },
  {
    index: 4,
    label: 'Delivered',
    selectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
    unSelectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
  },
  {
    index: 5,
    label: 'Delivered',
    selectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
    unSelectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
  },
];

const OrderTrackSteps: FC<any> = React.memo(props => {
  const theme = useTheme();
  const {currStep} = props;
  const renderStep = (stepData: any, isStepCompleted: boolean) => {
    return (
      <StepContainer key={stepData?.index}>
        <SvgXml
          xml={
            isStepCompleted ? stepData?.selectedIcon : stepData?.unSelectedIcon
          }
        />
        <StepLabelText>{stepData?.label}</StepLabelText>
        <SvgXml
          xml={
            isStepCompleted
              ? ORDER_TRACK_STEP_SELECTED
              : ORDER_TRACK_STEP_UNSELECTED
          }
        />
      </StepContainer>
    );
  };
  const renderProgressLine = (isStepCompleted: boolean) => {
    return (
      <StepDivider>
        <DashLine
          dashColor={
            isStepCompleted
              ? theme?.colors?.primary
              : theme?.colors?.greySubDetails
          }
        />
      </StepDivider>
    );
  };
  return (
    <Container>
      {stepsList?.map(stepData => {
        const isStepCompleted = stepData?.index <= currStep;
        return (
          <StepOuterContainer key={stepData?.index}>
            {renderStep(stepData, isStepCompleted)}
            {stepData?.index < stepsList?.length &&
              renderProgressLine(isStepCompleted)}
          </StepOuterContainer>
        );
      })}
    </Container>
  );
});

export default OrderTrackSteps;
