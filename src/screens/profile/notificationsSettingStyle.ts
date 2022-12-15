import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';
import {layout, space} from 'styled-system';
import {moderateScale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const SubContainer = styled.ScrollView.attrs(() => ({
  flex: 1,
  mx: moderateScale(20),
}))`
  ${space}
`;

export const ItemContainer = styled.View.attrs(() => ({
  mt: verticalScale(30),
}))`
  flex-direction: row;
  justify-content: space-between;
  ${space}
`;

export const ItemLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${space}
  ${layout}
`;

export const EmptyTopView = styled.View``;

export const TopSpaceView = styled.View`
  margin-top: ${verticalScale(30)}px;
`;

export const EmptyBottomView = styled.View`
  margin-bottom: ${verticalScale(20)}px;
`;

export const Innercontainer: ViewStyle = {
  flex: 1,
};
