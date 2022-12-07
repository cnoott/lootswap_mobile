import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {color, layout, space, border} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const windowHeight = Dimensions.get('window').height;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  bg: 'rgba(0,0,0,0.4)',
  justifyContent: 'flex-end',
}))`
  align-items: flex-start ${space} ${layout} ${color};
`;

export const SubContainer = styled.View.attrs(props => ({
  height: windowHeight / 2 + 180,
  width: '100%',
  bg: props.theme.colors.white,
  borderTopLeftRadius: moderateScale(20),
  borderTopRightRadius: moderateScale(20),
  px: moderateScale(20),
}))`
  ${color}
  ${layout}
  ${space}
`;

export const HorizontalBar = styled.View.attrs(props => ({
  height: verticalScale(5),
  width: scale(100),
  bg: props.theme.colors.divider,
  my: verticalScale(10),
  borderRadius: scale(5),
}))`
  align-self: center ${color} ${layout} ${space} ${border};
`;

export const HeadingText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: verticalScale(15),
}))`
  font-size: ${() => moderateScale(24)}px;
  font-family: 'Inter-Bold';
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const Divider = styled.View.attrs(props => ({
  height: verticalScale(1),
  width: '100%',
  bg: props.theme.colors.divider,
}))`
  ${color} ${layout} ${space} ${border};
`;

export const ListTitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: verticalScale(15),
  mb: verticalScale(10),
}))`
  font-size: ${() => moderateScale(18)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
    ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({
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
  px: scale(15),
  py: scale(5),
  borderColor: props.theme.colors.primary,
  borderWidth: scale(2),
  borderRadius: scale(20),
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
  font-family: Inter-Bold;
  font-weight: 600 ${color} ${space} ${layout};
`;

export const EmptyView = styled.View``;

export const ButtonsContainer = styled.View.attrs(props => ({
  width: '100%',
  mt: verticalScale(20),
  justifyContent: 'space-around',
}))`
  flex-direction: row ${color} ${layout} ${space} ${border};
`;
