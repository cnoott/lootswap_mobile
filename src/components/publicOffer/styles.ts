import styled from 'styled-components/native';
import {Dimensions, Platform} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';

export const BottomRowView = styled.View.attrs((props: any) => ({
  mt: scale(props?.topMargin || 20),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  ${space}
`;
