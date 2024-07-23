import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Dots from 'react-native-dots-pagination';

export const Container = styled.View.attrs((props: any) => ({
  flex: 1,
  bg: props?.theme?.colors?.black,
}))`
  ${space}
  ${layout}
  ${color}
`;
export const CarouselContainer = styled.View.attrs((props: any) => ({
  flex: 1,
  mt: scale(40),
  
}))`
  ${space}
  ${layout}
  ${color}
`;

export const ItemCenterContainer = styled.TouchableWithoutFeedback.attrs(
  () => ({
    flex: 1,
  }),
)`
  align-items: center;
  justify-content: center;
  width: 100%;
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs(props => ({
  height: props?.height,
  width: props?.width,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const DotsContainer = styled.View.attrs(props => ({
}))`
  ${space}
  ${layout}
`;

export const DotsComponent = styled(Dots).attrs(props => ({
  passiveColor: 'grey',
  activeColor: props?.theme?.colors?.white,
  activeBorder: props?.isActiveBorder,
  activeBorderColor: props?.theme?.colors?.primary,
  activeBorderWidth: scale(3),
  activeDotWidth: scale(props?.isActiveBorder ? 13 : 8),
  activeDotHeight: scale(props?.isActiveBorder ? 13 : 8),
  marginHorizontal: scale(4),
}))`
  ${space}
  ${layout}
`;

export const ProductInfoContainer = styled.View.attrs((props: any) => ({
  px: scale(10),
  my: scale(5),
}))`
  ${space}
  ${layout}
  ${color}
`;

export const RowView = styled.View.attrs(props => ({
  justifyContent: 'space-between',
  my: scale(2.5),
}))`
  flex-direction: row ${space} ${layout} ${color};
`;

export const BrandText = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${() => moderateScale(20)}px;
  font-family: 'Urbanist-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const TimeText = styled.Text.attrs(props => ({
  color: props.theme.colors.grey,
}))`
  font-size: ${() => moderateScale(15)}px;
  font-family: 'Urbanist-Medium';
  ${color}
  ${space}
  ${layout}
`;

export const PriceText = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${() => moderateScale(22)}px;
  font-family: 'Urbanist-Medium';
  ${color}
  ${space}
  ${layout}
`;

export const NameText = styled.Text.attrs(props => ({
  color: props.theme.colors.grey,
}))`
  font-size: ${() => moderateScale(16)}px;
  font-family: 'Urbanist-Medium';
  opacity: 1 !important;
  ${color}
  ${space}
  ${layout}
`;

export const LabelText = styled.Text.attrs(props => ({
  color: '#FFFFFF80',
}))`
  font-size: ${() => moderateScale(16)}px;
  font-family: 'Urbanist-Medium';
  ${color}
  ${space}
  ${layout}
`;

export const ReadDescText = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${() => moderateScale(16)}px;
  font-family: 'Urbanist-Bold';
  text-decoration: underline;
  text-decoration-color: white;
  ${color}
  ${space}
  ${layout}
`;
export const TagsContainer = styled.View.attrs(() => ({
  zIndex: 99999,
}))`
  flex-direction: row ${space};
  align-items: center;
  position: absolute;
  top: ${scale(40)}px;
  right: 10px;
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
  font-family: Urbanist-SemiBold;
  ${color}
  ${space}
  ${layout}
`;

export const FadeImageContainer = styled.View.attrs(props => ({
  position: 'relative',
  overflow: 'hidden',
}))`
`;


export const ProfileContainer = styled.View.attrs(() => ({
  zIndex: 99999,
}))`
  flex-direction: row ${space};
  position: absolute;
  top: ${scale(75)}px;
  left: 10px;
  
`;

export const ProductOwnerLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
  ml: scale(6),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-ExtraBold;
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: {width: -1px, height: 1px};
  text-shadow-radius: 10px;
  ${color}
  ${space}
  ${layout}
`;

export const NewSellerTagView = styled.View.attrs(() => ({
  py: verticalScale(3),
  px: scale(10),
  borderRadius: scale(5),
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'rgba(0, 0, 0, 0.3)',
}))`
  ${color}
  ${space}
  ${layout}
`;
export const NewSellerLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-SemiBold;
  ${color}
  ${space}
  ${layout}
`;
export const EmptyRowView = styled.View`
  flex-direction: column;
  align-items: center;
`;
export const StarLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
  my: scale(1),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Medium;
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: {width: -1px, height: 1px};
  text-shadow-radius: 10px;
  ${color}
  ${space}
  ${layout}
`;

