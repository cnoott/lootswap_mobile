import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const HeaderImageContainer = styled.View.attrs(() => ({}))`
  align-self: center;
  ${space}
`;

export const StepView = styled.View.attrs(() => ({}))`
  ${space};
`;

export const StepContainer = styled.View.attrs(() => ({
  ml: scale(10),
  alignItems: 'flex-start',
}))`
  flex-direction: row;
  ${space}
`;

export const VerticalMargin = styled.View.attrs(() => ({
  my: scale(10),
}))`
  ${space}
`;

export const StepNumberLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greyLabel,
  width: scale(25),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const StepLineView = styled.View.attrs(() => ({
  mx: scale(8),
}))`
  flex-direction: column;
  align-items: center;
  ${space}
`;

export const StepDot = styled.View.attrs(props => ({
  height: scale(5),
  width: scale(5),
  borderRadius: scale(2.5),
  bg: props.theme.colors.text,
  mt: verticalScale(6),
  mb: verticalScale(3),
}))`
  flex-direction: row;
  ${space}
  ${color}
`;

export const DashLine = styled.View.attrs(props => ({
  width: 2,
  flex: 1,
  borderWidth: 0.7,
  borderStyle: 'dashed',
  borderRadius: 1,
  borderColor: props.theme.colors.text,
}))`
  ${space} ${layout} ${border} ${color}
`;

export const StepDetailsView = styled.View.attrs(() => ({
  mr: scale(30),
}))`
  flex-direction: column;
  ${space}
`;

export const StepTitle: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
    ${layout}
`;

export const StepDes: any = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  maxWidth: '99%',
  pb: verticalScale(props?.isLastStep ? 0 : 20),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter;
  ${color}
  ${space}
      ${layout}
`;
