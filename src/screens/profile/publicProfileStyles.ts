import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.ScrollView.attrs(() => ({
  mx: moderateScale(15),
  showsVerticalScrollIndicator: false,
  pb: verticalScale(30),
}))`
  ${space}
  ${layout}
`;

export const ProfileContainerView = styled.View.attrs({
  width: scale(100),
  height: scale(100),
})`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${space}
`;

export const ProfileUploadView = styled.TouchableOpacity``;

export const Image = styled.Image.attrs({
  width: scale(100),
  height: scale(100),
  borderRadius: scale(50),
})`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
${layout}
`;

export const UserNameText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: scale(10),
}))`
  font-size: ${moderateScale(24)}px;
  font-family: Urbanist-Bold;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const MemberTimeText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mb: 10,
  mt: scale(2),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist;
  align-self: center;
  ${color}
  ${space}
    ${layout}
`;

export const FullWidthDivider = styled.View.attrs(props => ({
  height: verticalScale(1),
  bg: props.theme.colors.grey,
}))`
  align-self: stretch;
  ${space}
  ${layout}
  ${color}
`;

export const RatingsContainer = styled.TouchableOpacity.attrs(() => ({
  px: scale(10),
  py: scale(6),
  bg: '#FFF1ED',
  borderRadius: scale(15),
  mb: scale(10),
}))`
  align-self: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const RatingText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const ItemContainer = styled.TouchableOpacity.attrs(() => ({}))`
  ${color}
  ${space}
  ${layout}
`;

export const ActivityContainer = styled.View.attrs(props => ({
  height: verticalScale(85),
  bg: props.theme.colors.searchInnerBG,
  borderWidth: scale(1),
  borderColor: props.theme.colors.lightBorder,
  borderRadius: scale(20),
  mb: scale(10),
  mx: scale(10),
  flex: 1,
}))`
  align-self: stretch;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const ActivityCount = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(5),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const ActivityName = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  ${color}
  ${space}
  ${layout}
`;

export const ActivityItem = styled.View.attrs(() => ({}))`
  flex-direction: column;
  align-items: center;
`;

export const FullHeightDivider = styled.View.attrs(props => ({
  width: verticalScale(2),
  height: 60,
  bg: props.theme.colors.grey,
  mt: scale(5),
  mx: scale(10),
}))`
  align-self: stretch;
  ${space}
  ${layout}
    ${color}
`;

export const TitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(10),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const BottomView = styled.TouchableOpacity`
  height: 40px;
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EmptyScrollView = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))``;

export const ItemsListView = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
  my: scale(10),
}))`
  ${color}
  ${space}
  ${layout}
`;
