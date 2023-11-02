import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const FlastList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1, padding: scale(15)},
}))`
  ${space}
  ${layout}
`;

export const NotifItemContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.white,
  p: scale(15),
  pr: scale(5),
  borderRadius: scale(20),
  shadowColor: '#171717',
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 10,
  mb: verticalScale(15),
  flex: 1,
}))`
  flex-direction: row;
  align-items: center;
  ${space}
  ${layout}
`;

export const IconContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.white,
  height: scale(64),
  width: scale(64),
  borderRadius: scale(31),
}))`
  align-items: center;
  justify-content: center;
  ${space}
  ${layout}
`;

export const NotifTitle: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: verticalScale(6),
  maxWidth: '85%',
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist;
  font-weight: 700;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const ActionText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySubDetails,
  mt: verticalScale(4),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  font-weight: 500;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyView = styled.View`
  margin-left: ${scale(6)}px;
  flex: 1;
`;

export const Touchable = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))``;
