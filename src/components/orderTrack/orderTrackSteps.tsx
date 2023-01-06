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
} from 'localsvgimages';
import {
  getSingleOrderStepsList,
  getMultipleOrderStepsList,
} from '../../utility/utility';

const OrderTrackSteps: FC<any> = React.memo(props => {
  const theme = useTheme();
  const {currStep} = props;
  const stepsList = true
    ? getSingleOrderStepsList()
    : getMultipleOrderStepsList();
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
