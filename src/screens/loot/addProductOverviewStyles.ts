import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

const productImageWidth = 100;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.ScrollView.attrs(() => ({
  marginVertical: moderateScale(5),
  marginHorizontal: moderateScale(15),
  showsVerticalScrollIndicator: false,
}))`
  ${space}
  ${layout}
`;

export const ProductNameContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.commonSearchBack,
  minHeight: verticalScale(90),
  alignSelf: 'stretch',
  borderRadius: scale(20),
  py: scale(15),
  px: scale(20),
}))`
  justify-content: center;
  ${space}
  ${layout}
`;

export const ProductNameLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(22)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
`;

export const ProductBrandLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  mt: verticalScale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
`;

export const SubHeaderText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  ${color}
  ${space}
`;

export const SubInfoText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mt: scale(2),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${color}
  ${space}
`;

export const DetailsText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  my: verticalScale(5),
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  ${color}
  ${space}
`;

export const DesText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter;
  font-weight: 300;
  ${color}
  ${space}
`;

export const SubDetailsContainer = styled.View.attrs(() => ({
  mt: verticalScale(3),
  mb: verticalScale(5),
}))`
  ${space}
  ${layout}
`;

export const EditButtonContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.primaryTrans,
  height: verticalScale(32),
  borderRadius: scale(20),
  px: scale(12),
  borderWidth: scale(1.5),
  borderColor: props.theme.colors.primary,
}))`
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;

export const TopSpace = styled.View.attrs(() => ({
  mt: verticalScale(10),
}))`
  ${space}
  ${layout}
`;

export const EditLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  ml: scale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${color}
  ${space}
`;

export const SectionHeaderContainer = styled.View.attrs(() => ({
  my: scale(10),
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${space}
  ${layout}
`;

export const FullTouchable = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Divider = styled.View.attrs(props => ({
  height: verticalScale(1),
  bg: props.theme.colors.grey,
  alignSelf: 'stretch',
  mt: verticalScale(15),
}))`
  ${space}
  ${layout}
    ${color}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
  horizontal: true,
}))`
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs(() => ({
  width: scale(productImageWidth),
  height: scale(productImageWidth),
  borderRadius: scale(20),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
    ${layout}
`;

export const ImageContainer = styled.View.attrs(props => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(20),
  bg: props.theme.colors.grey,
  mr: scale(5),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const TradeButton = styled.View.attrs(props => ({
  px: scale(15),
  py: scale(8),
  borderRadius: scale(20),
  bg: props?.selected ? props.theme.colors.black : props.theme.colors.white,
  my: scale(5),
  borderWidth: 1,
  borderColor: props.theme.colors.black,
  mr: scale(10),
}))`
  align-items: center;
  justify-content: center;
  align-self: flex-start ${layout} ${color} ${space};
`;

export const TradeButtonText = styled.Text.attrs(props => ({
  color: props?.selected ? props.theme.colors.white : props.theme.colors.black,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  font-weight: 500;
  ${color}
  ${space}
`;

export const RowView = styled.View`
  flex-direction: row;
`;

export const RowSpaceView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
