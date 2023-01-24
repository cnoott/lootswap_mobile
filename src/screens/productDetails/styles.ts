import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs((props: any) => ({
  flex: 1,
  bg: props?.theme?.colors?.white,
}))`
  ${space}
  ${layout}
  ${color}
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  flex: 1,
  showsVerticalScrollIndicator: false,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.View.attrs(props => ({
  padding: moderateScale(15),
  flex: 1,
  backgroundColor: props.theme.colors.white,
  mt: verticalScale(1),
}))`
  ${space}
  ${layout}
`;

export const DetailsContainer = styled.View.attrs(() => ({}))`
  flex-direction: row;
  ${space}
`;

export const DetailsLeftView = styled.View.attrs(() => ({
  flex: 1,
}))`
  flex-direction: column;
  ${space}
  ${layout}
`;

export const DetailsRightView = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: ${verticalScale(10)}px;
  ${space}
  ${layout}
`;

export const TopSpace = styled.View.attrs(() => ({
  mt: verticalScale(10),
}))`
  ${space}
`;

export const GoBackContainer = styled.TouchableOpacity.attrs(() => ({
  mt: verticalScale(5),
}))`
  flex-direction: row ${space};
  align-items: center;
`;

export const GoBackText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  ml: scale(5),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  font-weight: 500;
  ${color}
  ${space}
  ${layout}
`;

export const ProductLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
}))`
  font-size: ${moderateScale(22)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const ProductName = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const ProductDetails = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const BoldText = styled.Text`
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const PriceLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: scale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Black;
  ${color}
  ${space}
  ${layout}
`;

export const ShippingLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  my: scale(1),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const TagsContainer = styled.View.attrs(() => ({
  my: verticalScale(3),
}))`
  flex-direction: row ${space};
  align-items: center;
`;

export const TagView = styled.View.attrs(props => ({
  py: verticalScale(8),
  px: scale(10),
  borderRadius: scale(16),
  alignItems: 'center',
  justifyContent: 'center',
  bg: props?.backColor,
  mr: scale(5),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const TagLabel = styled.Text.attrs(props => ({
  color: props?.tagColor,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const GuarenteedView = styled.View.attrs((props: any) => ({
  mt: verticalScale(20),
  borderWidth: 0.5,
  borderRadius: scale(20),
  borderColor: props.theme.colors.protectionBorder,
  p: scale(10),
  overflow: 'hidden',
}))`
  flex-direction: row ${space} ${border} ${color};
`;

export const GuarenteedDesView = styled.View.attrs(() => ({
  ml: scale(16),
  flex: 1,
}))`
  justify-content: center;
  ${space};
`;

export const ProtectionTopLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Black;
  ${color}
  ${space}
  ${layout}
`;

export const ProtectionBottomLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  my: scale(1),
  width: '95%',
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const HorizontalBar = styled.View.attrs(props => ({
  mt: verticalScale(15),
  height: verticalScale(0.3),
  width: '100%',
  bg: props.theme.colors.lightGrey,
}))`
  ${space}
  ${color}
`;

export const DescriptionLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Black;
  ${color}
  ${space}
  ${layout}
`;

export const RatingsContainer = styled.View.attrs(() => ({
  mt: verticalScale(10),
}))`
  flex-direction: row ${space};
  align-items: center;
`;

export const ProductOwnerLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const BottomSpace = styled.View.attrs(() => ({
  mb: verticalScale(20),
}))`
  ${space}
`;

export const EmptyView = styled.View``;

export const SVGTextContainer = styled.View.attrs(() => ({}))`
  ${space}
`;

export const SVGImageStyle = {
  marginBottom: -2,
};
