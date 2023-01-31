import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const productRadius = 10;

export const ItemContainer = styled.TouchableOpacity.attrs(() => ({
  margin: moderateScale(5),
  pb: verticalScale(10),
  width: '47%',
  activeOpacity: 0.8,
  borderRadius: scale(productRadius),
  overflow: 'hidden',
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const Image = styled.Image.attrs({
  height: scale(230),
  borderRadius: scale(productRadius),
})`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const FreeShipingContainer = styled.View.attrs(props => ({
  px: moderateScale(10),
  py: moderateScale(6),
  bg: props.theme.colors.white,
  borderRadius: scale(5),
}))`
  position: absolute;
  bottom: 8px;
  left: 6px;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const ShippingText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  font-weight: 600;
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

export const BottomHeaderView = styled.View.attrs(props => ({
  justifyContent: 'space-between',
  flex: 1,
  my: scale(props?.isMiddle ? 2 : 0),
}))`
  flex-direction: row ${space} ${layout} ${color};
`;

export const HeaderTextMain = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const TimeText = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  mt: scale(3),
  numberOfLines: 1,
  maxWidth: '90%',
}))`
  font-size: ${() => moderateScale(10)}px;
  font-family: 'Inter';
  ${color}
  ${space}
  ${layout}
`;

export const HeaderDes = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(2),
  maxWidth: '95%',
  numberOfLines: 1,
}))`
  fontsize: ${() => moderateScale(14)}px;
  font-family: 'Inter-Bold';
  font-weight: 500;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const EmptyView = styled.View``;

export const TagsContainer = styled.View.attrs(() => ({}))`
  flex-direction: row ${space};
  align-items: center;
  position: absolute;
  left: 0px;
  top: 0px;
`;

export const TagView = styled.View.attrs(props => ({
  py: verticalScale(5),
  px: scale(8),
  borderTopLeftRadius: scale(productRadius),
  borderTopRightRadius: scale(0.1),
  borderBottomLeftRadius: scale(0.1),
  borderBottomRightRadius: scale(productRadius),
  alignItems: 'center',
  justifyContent: 'center',
  bg: props?.backColor,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const TagLabel = styled.Text.attrs(props => ({
  color: props?.tagColor,
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${color}
  ${space}
  ${layout}
`;

export const LikeTouchable = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {top: 10, left: 10, right: 10, bottom: 10},
}))`
  align-items: center;
  position: absolute;
  right: 5px;
  top: 5px;
`;
