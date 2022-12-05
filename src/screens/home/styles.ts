import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.View.attrs(() => ({
  margin: moderateScale(15),
}))`
  ${space}
  ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  numColumns: 2,
  showVerticalScrollIndicator: false,
}))`
  margin-bottom: ${verticalScale(80)}px;
  ${color}
  ${space}
  ${layout}
`;

export const ItemContainer = styled.View.attrs(() => ({
  margin: moderateScale(5),
  pb: verticalScale(10),
  width: '47%',
}))`
  ${space}
  ${layout}
  ${color}
`;

export const Image = styled.Image.attrs({
  height: scale(150),
})`
  ${color}
  ${space}
${layout}
`;

export const FreeShipingContainer = styled.View.attrs(props => ({
  p: moderateScale(5),
  bg: props.theme.colors.white,
}))`
  position: absolute;
  top: 10px;
  left: 10px;
  ${space}
  ${layout}
  ${color}
`;

export const ShippingText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const CellBottomView = styled.View.attrs(() => ({
  mt: verticalScale(5),
  px: scale(5),
}))`
  ${space}
  ${layout}
  ${color}
`;

export const BottomHeaderView = styled.View.attrs(() => ({
  justifyContent: 'space-between',
}))`
  flex-direction: row ${space} ${layout} ${color};
`;

export const HeaderTextMain = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
  maxWidth: '50%',
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const HeaderTextSub = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  my: scale(1),
  maxWidth: '46%',
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const HeaderDes = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  my: scale(2),
  maxWidth: '95%',
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const BarView = styled.View.attrs(props => ({
  height: verticalScale(12),
  width: scale(1),
  mx: scale(5),
  bg: props.theme.colors.text,
}))`
  ${space}
  ${layout}
  ${color}
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;
