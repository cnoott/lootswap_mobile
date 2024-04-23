import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {color, layout, space, border} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {XMarkIcon} from 'react-native-heroicons/solid';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  bg: props.theme.colors.white,
  pb: verticalScale(20),
  width: '100%',
}))`
  align-items: flex-start ${space} ${layout} ${color};
`;

export const SubContainer = styled(KeyboardAwareScrollView).attrs(() => ({
  px: moderateScale(20),
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
  width: '100%',
}))`
  ${color}
  ${layout}
  ${space}
`;

export const EmptyView = styled.View``;

export const ListTitleText = styled.Text.attrs((props: any) => ({
  color: props.theme.colors.text,
  mt: verticalScale(props?.isFirst ? 0 : 20),
  mb: verticalScale(10),
}))`
  font-size: ${() => moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${color}
  ${space}
  ${layout}
`;

export const HorizontalFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {flexGrow: 1},
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  ${color}
  ${space}
${layout}
`;

export const FilterButton = styled.TouchableOpacity.attrs(props => ({
  mx: scale(5),
  my: scale(2),
  px: scale(props?.horizontalPadding || 20),
  py: scale(8),
  borderColor: props?.isSelected
    ? props.theme.colors.primary
    : props.theme.colors.divider,
  borderWidth: scale(2),
  borderRadius: scale(10),
  bg: props?.isSelected ? props.theme.colors.primary : 'transparent',
}))`
  align-items: center;
  justify-content: center;
  ${layout}
  ${color}
  ${border}
  ${space}
`;

export const FilterButtonText = styled.Text.attrs(props => ({
  color: props?.isSelected ? props.theme.colors.white : props.theme.colors.text,
}))`
  font-size: ${() => moderateScale(14)}px;
  font-family: Urbanist;
  ${color} ${space} ${layout};
`;

export const ButtonsContainer = styled.View.attrs(() => ({
  width: '100%',
  mt: verticalScale(10),
  justifyContent: 'space-around',
}))`
  flex-direction: row;
  ${color} ${layout} ${space} ${border};
`;

export const BottomMarginView = styled.View`
  height: 15px;
`;

export const Divider = styled.View.attrs(props => ({
  height: verticalScale(1),
  width: '100%',
  bg: props.theme.colors.divider,
}))`
  ${color} ${layout} ${space} ${border};
`;

export const AnimatedCheckBox = styled(BouncyCheckbox).attrs(props => ({
  size: scale(18),
  fillColor: props?.theme?.colors.primary,
  unfillColor: props?.theme?.colors.white,
  iconStyle: {
    borderRadius: 8,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: props?.selected
      ? props?.theme?.colors.primary
      : props?.theme?.colors.black,
  },
  textStyle: {
    textDecorationLine: 'none',
    color: props?.theme?.colors.text,
    fontWeight: '600',
  },
  mb: verticalScale(10),
}))`
  ${border}
  ${color}
  ${space}
`;

export const BrandList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  showsHorizontalScrollIndicator: false,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const SelectedBrandButton = styled.TouchableOpacity.attrs(props => ({
  mx: scale(5),
  px: scale(15),
  py: scale(10),
  borderRadius: scale(10),
  bg: props.theme.colors.primary,
  mb: scale(10),
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${layout}
  ${color}
  ${border}
  ${space}
`;

export const CloseIcon: any = styled(XMarkIcon).attrs(props => ({
  color: props.theme.colors.white,
  size: moderateScale(14),
  ml: moderateScale(8),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const PriceRangeContainer = styled.View.attrs(() => ({
  width: '100%',
}))`
  flex-direction: row ${color} ${layout} ${space} ${border};
`;

export const PriceSubMinMaxLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: verticalScale(10),
}))`
  font-size: ${() => moderateScale(14)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${color}
  ${space}
  ${layout}
`;

export const MinPriceContainer = styled.View.attrs(() => ({
  flex: 1,
}))`
  flex-direction: column ${color} ${layout} ${space} ${border};
`;

export const HorizontalMarginView = styled.View`
  width: 15px;
`;
