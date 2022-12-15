import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(() => ({
  flex: 1,
}))`
  ${space}
  ${layout}
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
  mt: verticalScale(10),
}))`
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
  my: scale(3),
}))`
  font-size: ${moderateScale(22)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const ProductDetails = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const PriceLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Black;
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
  py: verticalScale(4),
  px: scale(8),
  borderRadius: scale(8),
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
  font-size: ${moderateScale(10)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const GuarenteedView = styled.View.attrs(() => ({
  mt: verticalScale(20),
}))`
  flex-direction: row ${space};
`;

export const GuarenteedDesView = styled.View.attrs(() => ({
  ml: scale(6),
}))`
  justify-content: center;
  ${space};
`;

export const ProtectionTopLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Black;
  ${color}
  ${space}
  ${layout}
`;

export const ProtectionBottomLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(1),
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const HorizontalBar = styled.View.attrs(props => ({
  mt: verticalScale(15),
  height: verticalScale(1),
  width: '100%',
  bg: props.theme.colors.text,
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
