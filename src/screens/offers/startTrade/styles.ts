import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SelectLootText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(5),
  ml: scale(10),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
`;

export const SelectedLootText = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  mt: verticalScale(3),
  ml: scale(16),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Bold;
  font-weight: 600;
  ${space}
  ${layout}
  ${color}
`;

export const TradeReviewText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(3),
  ml: scale(15),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;

export const TradeReviewTextTwo = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(10),
  ml: scale(15),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;

export const ButtonContainer = styled.View.attrs(() => ({
  mb: verticalScale(5),
}))`
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 10;
  width: 100%;
  ${space}
  ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${space}
  ${layout}
`;

export const ScrollSubContainer = styled.ScrollView.attrs(() => ({
  flex: 1,
  showsVerticalScrollIndicator: false,
}))`
  ${space}
  ${layout}
`;

export const AddMoneyContainer = styled.View.attrs(() => ({
  flex: 1,
  py: scale(5),
  px: scale(15),
}))`
  flex-direction: row;
  justify-content: flex-start;
  ${space}
  ${layout}
`;

export const EditMoneyContainer = styled.View.attrs(() => ({
  flex: 1,
  py: scale(5),
  px: scale(15),
}))`
  flex-direction: row;
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const MoneyOfferText = styled.Text.attrs(props => ({
  color: props.theme.colors.successColor,
  mt: verticalScale(10),
  ml: scale(15),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;
