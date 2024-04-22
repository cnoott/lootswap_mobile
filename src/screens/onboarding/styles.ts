import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import Swiper, {SwiperProps} from 'react-native-swiper';

const width = Dimensions.get('window').width;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  position: relative;
  ${space}
  ${layout}
`;

export const InnerContainer = styled.View.attrs(props => ({
  flex: 1,
  p: scale(8),
}))`
  ${space}
  ${layout}
`;

export const ListContainer = styled.View.attrs(props => ({
  mt: scale(15),
  paddingBottom: props?.bottomPadding ? verticalScale(40) : 0,
}))`
  ${space}
  ${layout}
`;

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 200,
  },
}))`
  ${space}
  ${layout}
`;

export const ButtonContainer = styled.View.attrs(props => ({
  mb: moderateScale(32),
}))`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  ${space}
  ${layout}
`;

export const Spacer = styled.View.attrs(props => ({
  mb: scale(props?.space),
}))`
  ${space}
  ${layout}
`;

export const CheckboxContainer = styled.View.attrs(props => ({
  ml: scale(8),
}))`
  ${space}
  ${layout}
`;

export const SelectionsContainer = styled.View.attrs(props => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  marginTop: scale(6),
  paddingVertical: scale(4),
}))`
  ${space}
  ${layout}
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

export const CloseTouchable = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {top: 10, left: 10, right: 10, bottom: 10},
}))`
  position: absolute;
  top: 15px;
  right: 15px ${layout} ${space};
`;

export const LabelText = styled.Text.attrs(() => ({
  ml: scale(6),
}))`
  font-size: ${scale(18)}px;
  font-family: 'Urbanist-Bold';
  ${color}
  ${space}
`;
