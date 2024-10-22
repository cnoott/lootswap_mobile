import React, {FC} from 'react';
import {
  Container,
  StepContainer,
  StepLabelText,
  StepDivider,
  DashLine,
  StepOuterContainer,
  EmptyView,
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
  const {currStep, isTradeOrder = false} = props;
  const stepsList = !isTradeOrder
    ? getSingleOrderStepsList()
    : getMultipleOrderStepsList();
  const renderStep = (stepData: any, isStepCompleted: boolean) => {
    return (
      <StepContainer key={stepData?.index}>
        <EmptyView>
          <SvgXml
            xml={
              isStepCompleted
                ? stepData?.selectedIcon
                : stepData?.unSelectedIcon
            }
          />
          <StepLabelText isMulti={isTradeOrder} isLast={stepData?.index === 5}>
            {stepData?.label}
          </StepLabelText>
        </EmptyView>
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
        const isStepCompleted = isTradeOrder
          ? stepData?.index <= currStep
          : stepData?.index <= currStep + 1;
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
