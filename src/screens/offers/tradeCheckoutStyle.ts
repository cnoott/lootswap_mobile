import styled from 'styled-components/native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))``;

export const HorizontalBar = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.divider,
  alignSelf: 'stretch',
  height: 1,
}))``;

export const ScrollSubContainer = styled.ScrollView.attrs(() => ({
  flex: 1,
  showsVerticalScrollIndicator: false,
  p: scale(15),
}))`
  ${space}
  ${layout}
`;

export const FullFlexView = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const EmptyView = styled.View``;

export const DeliveryAddContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.commonSearchBack,
  alignSelf: 'stretch',
  p: scale(20),
  borderRadius: scale(10),
  flex: 1,
}))`
  flex-direction: row 
  justify-content: space-between;
  ${space} ${layout} ${border};
`;

export const DeliveryAddressLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const DeliveryAddSubContainer = styled.View.attrs(() => ({
  flex: 1,
}))``;

export const DeliveryAddressText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  width: '90%',
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter;
  text-align: left;
  line-height: ${moderateScale(22)}px;
  ${color}
  ${space}
    ${layout}
`;

export const EditLabelContainer = styled.TouchableOpacity.attrs(() => ({}))`
  flex-direction: row;
  ${space} ${layout};
`;

export const EditLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  ml: scale(5),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const HeadingLabel: any = styled.Text.attrs((props: any) => ({
  color: props?.isBlack ? props.theme.colors.black : props.theme.colors.primary,
  my: scale(10),
}))`
  font-size: ${moderateScale(22)}px;
  line-height: ${moderateScale(27)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const BottomRowView = styled.View.attrs((props: any) => ({
  mt: scale(props?.topMargin || 20),
}))`
  flex-direction: row;
  align-items: center;
  ${space}
`;

export const ItemNameText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(2),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
    ${layout}
`;

export const ItemCategoryText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(2),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;

export const StretchedRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  margin-top: ${props => `${props?.topMargin ? props?.topMargin : 0}`}px;
  ${space}
`;

export const ItemSubLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mb: scale(2),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter-Bold;
  font-weight: 400;
  ${color}
  ${space}
    ${layout}
`;

export const ItemSubValue = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(2),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  ${color}
  ${space}
  ${layout}
`;

export const VerticalMargin = styled.View.attrs(props => ({
  mt: verticalScale(props?.margin || 10),
}))`
  ${space}
`;

export const AppliedPromoContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.commonSearchBack,
  alignSelf: 'stretch',
  p: scale(20),
  borderRadius: scale(10),
  flex: 1,
  borderColor: props.theme.colors.divider,
  borderWidth: scale(1),
}))`
    flex-direction: row 
    justify-content: space-between;
    ${space} ${layout} ${border};
`;

export const PromoText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const AppliedLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const PromoContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.primary,
  alignSelf: 'stretch',
  p: scale(20),
  borderRadius: scale(10),
  flex: 1,
  mt: verticalScale(10),
}))`
  ${space} ${layout} ${border};
`;

export const PromoDes = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${moderateScale(24)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
    ${layout}
`;

export const PromoAppliedLabel = styled.Text.attrs(() => ({
  color: '#4ADE80',
  mt: verticalScale(10),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
      ${layout}
`;

export const SummaryText = styled.Text.attrs(props => ({
  color: props.theme.colors.greyLabel,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  font-weight: 400;
  ${color}
  ${space}
    ${layout}
`;

export const OfferCellOnlyContainer = styled.View.attrs(() => ({
  px: scale(15),
  mb: verticalScale(10),
}))`
  flex-direction: row;
  ${space}
`;

export const OfferCellOnlyRightView = styled.View`
  flex: 1;
  margin-left: ${scale(10)}px;
  justify-content: space-evenly;
`;
