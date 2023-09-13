import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import styled from 'styled-components/native';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.white,
}))`
  padding-top: ${props => props?.paddingTop}px;
  ${color}
  ${space}
  ${layout}
`;

export const SearchContainer = styled.View.attrs(props => ({
  paddingHorizontal: moderateScale(10),
  bg: props.theme.colors.white,
}))`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const SearchInputContainer = styled.View.attrs(() => ({
}))`
  flex: 1;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const EmptySearchContainer = styled.View.attrs(props => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const EmptySearchText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
`;

export const RecentSearchesContainer = styled.View.attrs(props => ({
  px: scale(12),
  py: scale(15),
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const RecentSearchesTitle = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  ${color}
`;

export const RecentSearchesTextContainer = styled.View.attrs(props => ({
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const RecentSearchesText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  py: scale(8),
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-SemiBold;
  ${color}
  ${space}
`;

export const GoBackTouchable = styled.TouchableOpacity`
  width: 40px;
  margin-right: ${scale(5)}px;
`;

export const ClearRecentSearchesText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  py: scale(9),
}))`
  text-decoration: underline;
  text-decoration-color: '#6267FE';
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-SemiBold;
  ${color}
  ${space}
`;
