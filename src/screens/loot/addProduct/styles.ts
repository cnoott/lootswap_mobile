import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const productImageWidth = width / 2 - 60;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const StepOneContainer = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
  m: moderateScale(20),
}))`
  ${space}
  ${layout}
`;

export const HorizontalSpace = styled.View.attrs(() => ({
  mx: moderateScale(20),
}))`
  ${space}
  ${layout}
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

export const ButtonContainer = styled.View.attrs(() => ({
  mt: verticalScale(50),
}))`
  ${space}
  ${layout}
`;

export const AddProductsList = styled.FlatList.attrs(() => ({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  ml: scale(10),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const ImageContainer = styled.View.attrs(props => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(20),
  bg: props.theme.colors.grey,
  m: scale(5),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const Touchable = styled.TouchableOpacity``;

export const TouchableRow = styled.TouchableOpacity`
  margin-top: ${verticalScale(10)}px
  flex-direction: row;
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

export const PlusContainer = styled.View.attrs(props => ({
  height: scale(48),
  width: scale(48),
  borderRadius: scale(24),
  bg: props.theme.colors.white,
  mb: scale(10),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const PlusSign = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
`;

export const AddImageLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
`;

export const TradeOptionsText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  my: scale(10),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  ${color}
  ${space}
`;

export const ShippingOptionsText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(10),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  ${color}
  ${space}
`;

export const TradeButton = styled.View.attrs(props => ({
  px: scale(15),
  py: scale(8),
  borderRadius: scale(20),
  bg: props?.selected ? props.theme.colors.black : props.theme.colors.white,
  my: scale(5),
  borderWidth: 1,
  borderColor: props.theme.colors.black,
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

export const EmptyView = styled.View``;

export const ShippingDes = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  ${color}
  ${space}
`;

export const FreeTagContainer = styled.View.attrs(() => ({
  height: verticalScale(22),
  width: scale(40),
  borderRadius: scale(8),
  bg: '#b6eccb',
  ml: scale(10),
}))`
  align-items: center;
  justify-content: center;
  align-self: flex-start ${layout} ${color} ${space};
`;

export const FreeTag = styled.Text.attrs(() => ({
  color: '#4AAF57',
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
`;

export const FreeShippingDes = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(30),
  mt: 1,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  font-weight: 300 ${color} ${space};
`;

export const DropdownStyle = {
  height: verticalScale(56),
  borderColor: 'gray',
  borderRadius: moderateScale(16),
  paddingHorizontal: moderateScale(20),
  backgroundColor: '#FAFAFA',
};

export const PlaceholderStyle = {
  fontSize: moderateScale(16),
};

export const SelectedTextStyle = {
  fontSize: 16,
};

export const InputSearchStyle = {
  height: 40,
  fontSize: 16,
};

export const IconStyle = {
  width: moderateScale(20),
  height: moderateScale(20),
};

export const Innercontainer = {
  flex: 1,
  margin: moderateScale(15),
  marginHorizontal: moderateScale(25),
};
