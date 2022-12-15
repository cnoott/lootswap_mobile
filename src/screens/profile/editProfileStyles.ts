import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';
import {layout, space} from 'styled-system';
import {verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  justify-content: space-between;
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
