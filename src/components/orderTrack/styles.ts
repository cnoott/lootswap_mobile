import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import DashedLine from 'react-native-dashed-line';

export const Container = styled.View.attrs(() => ({
  my: verticalScale(5),
  flex: 1,
}))`
  flex-direction: row;
  justify-content: center;
  ${color} ${space} ${layout};
`;

export const StatusDetailsContainer = styled.View.attrs(() => ({
  my: verticalScale(5),
  width: '100%',
}))`
  flex-direction: row;
  ${space} ${layout};
`;

export const Image = styled.Image.attrs({
  height: scale(150),
})`
  ${color}
  ${space}
  ${layout}
`;

export const StepOuterContainer = styled.View.attrs(() => ({
  flex: 1,
}))`
  flex-direction: row;
  overflow: hidden;
  ${layout}
  ${color}
`;

export const StepContainer = styled.View`
  align-items: center;
  ${space} ${layout} ${color};
`;

export const StepDivider = styled.View.attrs(() => ({
  width: scale(35),
  mb: 2,
  mx: scale(2),
}))`
  align-self: flex-end;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const StepDividerFirst = styled.View.attrs(() => ({
  width: scale(10),
  mb: 2,
  mx: scale(2),
}))`
  align-self: flex-end;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const StatusDetailsDivider = styled.View.attrs(() => ({
  height: scale(30),
  ml: scale(14),
  width: scale(30),
  transform: [{rotate: '270deg'}],
}))`
  ${space} ${layout} ${border} ${color};
`;

export const DashLine = styled(DashedLine).attrs(() => ({
  dashLength: 5,
  dashGap: 5,
}))`
  ${space} ${layout} ${border} ${color}
`;

export const DashLineNew = styled(DashedLine).attrs(() => ({
  dashLength: 5,
  dashGap: 5,
}))`
  ${space} ${layout} ${border} ${color}
`;

export const StepLabelText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySubDetails,
  my: verticalScale(5),
}))`
  font-size: ${() => moderateScale(11)}px;
  font-family: 'Inter';
  ${color}
  ${space}
  ${layout}
`;

export const CellBottomView = styled.View.attrs(() => ({
  mt: verticalScale(5),
  px: scale(5),
}))`
  ${space}
  ${layout}
  ${color}
`;

export const BottomHeaderView = styled.View.attrs(() => ({
  justifyContent: 'space-between',
}))`
  flex-direction: row ${space} ${layout} ${color};
`;

export const HeaderTextMain = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
  maxWidth: '100%',
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const HeaderDes = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  my: scale(2),
  maxWidth: '95%',
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OrderStatusDetailsText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: verticalScale(10),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;

export const OrderStatusTitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  maxWidth: '70%',
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const OrderStatusDesText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySubDetails,
  maxWidth: '95%',
  numberOfLines: 1,
  mt: verticalScale(5),
}))`
  fontsize: ${() => moderateScale(12)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const OrderStatusTimeText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySubDetails,
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(10)}px;
  font-family: 'Inter';
  position: absolute;
  top: 0px;
  right: 0px;
  ${color}
  ${space}
  ${layout}
`;

export const OrderStatusView = styled.View.attrs(() => ({
  ml: scale(10),
  width: '100%',
}))`
  flex-direction: column ${space} ${layout};
`;
