import {moderateScale, verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import Swiper, {SwiperProps} from 'react-native-swiper';
import * as Progress from 'react-native-progress';
import {layout, space, color} from 'styled-system';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;

export const TopViewContainer = styled.View.attrs({})`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 15px;
  ${space}
  ${layout}
`;

export const ProductTypeText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const StepText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist;
  ${color}
  ${space}
  ${layout}
`;

export const CurrentStepText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist;
  ${color}
  ${space}
  ${layout}
`;

export const ButtonContainer = styled.View.attrs(() => ({
  mb: verticalScale(5),
}))`
  flex-direction: row;
  justify-content: space-around;
  ${space}
  ${layout}
`;

export const PayPalSubContainer = styled.View.attrs(() => ({}))`
  align-items: center;
  ${space}
  ${layout}
`;

export const TopMargin = styled.View.attrs(() => ({
  mt: verticalScale(20),
}))`
  ${space}
`;

export const TopMinMargin = styled.View.attrs(() => ({
  mt: verticalScale(10),
}))`
  ${space}
`;

export const TopMaxMargin = styled.View.attrs(() => ({
  mt: verticalScale(60),
}))`
  ${space}
`;

export const ProgressBar = styled(Progress.Bar).attrs(props => ({
  width: width,
  borderWidth: 0,
  borderRadius: 0,
  color: props.theme.colors.primary,
  unfilledColor: props.theme.colors.grey,
  my: verticalScale(5),
  height: 3,
}))`
  ${space}
  ${layout}
`;

export const SwiperComponent: SwiperProps = styled(Swiper).attrs(() => ({
  flex: 1,
  scrollEnabled: false,
  loop: false,
  showsButtons: false,
  showsPagination: false,
}))`
  ${space}
  ${layout}
`;

export const Innercontainer = {
  flex: 1,
};
