import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {Dimensions} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const productImageWidth = 100;
//const productUploadImageWidth = width - 80;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const ImagesContainer = styled.ScrollView.attrs(props => ({
  marginVertical: moderateScale(0),
  paddingVertical: scale(10),
  marginHorizontal: moderateScale(15),
  showsVerticalScrollIndicator: false,
  scrollEnabled: props.enableScroll,
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

export const AddPhotosButtonContainer = styled.View.attrs(() => ({
  mb: verticalScale(5),
}))`
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  width: 100%;
  ${space}
  ${layout}
`;

export const ImagePickerContainer = styled.View.attrs(() => ({
  height: height * 0.8,
}))`
  align-items: center;
  justify-content: center;
  ${space}
  ${layout}
`;

export const PhotoGuideText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  pr: scale(13),
  pt: scale(2),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist;
  font-weight: 600;
  text-align: right;
  ${color}
  ${space}
  ${layout}
`;

export const ImagePickerModalStyle = {
  margin: 0,
  justifyContent: 'flex-end',
};

export const ModalHeaderText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: verticalScale(5),
  ml: scale(6),
}))`
  font-size: ${moderateScale(25)}px;
  font-family: Urbanist;
  font-weight: 800;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const CameraRollList = styled.FlatList.attrs(() => ({
  numColumns: 3,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${color}
  ${space}
  ${layout}
`;

export const AddProductsList = styled(DraggableGrid).attrs(() => ({
  numColumns: 3,
  height: '100%',
  width: '100%',
}))`
  ${color}
  ${space}
  ${layout}
`;

export const ImageContainer = styled.View.attrs(props => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(16),
  bg: props.theme.colors.grey,
  m: scale(5),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const ImageContainerUpload = styled.View.attrs(props => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(16),
  bg: props.theme.colors.grey,
  m: scale(1),
}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const CameraRollImageContainer = styled.TouchableOpacity.attrs(props => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(16),
  bg: props.theme.colors.grey,
  m: scale(1),
}))`
  align-items: center;
  align-self: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;


export const ImageContainerNew = styled.View.attrs((props: any) => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(16),
  bg: props.theme.colors.grey,
  m: scale(5),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const TakePhotoButtonContainer = styled.TouchableOpacity.attrs(props => ({
  height: scale(35),
  width: scale(120),
  borderRadius: scale(60),
  bg: 'rgba(98, 103, 254, 0.1)',
  mb: scale(10),
  ml: scale(11),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const TakePhotoButtonText = styled.Text.attrs(props => ({
  color: 'rgba(98, 103, 254, 1)',
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  font-weight: 700;
  ${color}
  ${space}
`;

export const CameraIconContainer = styled.View.attrs(() => ({
  mx: scale(3),
}))`
  ${layout} ${color} ${space} ${border};
`;

export const DeleteContainer = styled.TouchableOpacity.attrs(props => ({
  height: scale(20),
  width: scale(20),
  borderRadius: scale(10),
  bg: props.theme.colors.black,
  top: 6,
  right: 6,
  hitSlop: {top: 10, left: 10, right: 10, bottom: 10},
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 6px;
  right: 6px;
  ${layout} ${color} ${space} ${border};
`;

export const FullTouchable = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Touchable = styled.TouchableOpacity``;

export const TouchableRow = styled.TouchableOpacity`
  margin-top: ${verticalScale(10)}px
  flex-direction: row;
`;

export const TouchableRowTradeOptions = styled.TouchableOpacity`
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

export const ImageUpload = styled(FastImage).attrs(() => ({
  width: scale(productImageWidth),
  height: scale(productImageWidth),
  borderRadius: scale(6),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const PlusContainer = styled.View.attrs(props => ({
  height: scale(24),
  width: scale(24),
  borderRadius: scale(20),
  mb: 2,
  bg: props.theme.colors.white,
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const PlusSign = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
`;

export const AddImageLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
`;

export const AddImageSubText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(11, 0.1)}px;
  font-family: Urbanist-Medium;
  text-align: center;
  ${color}
  ${space}
`;

export const TradeOptionsText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  my: scale(10),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${color}
  ${space}
`;
export const MarketRangeText = styled.Text.attrs(props => ({
  color: props.theme.colors.successColor,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 800;
  ${color}
  ${space}
  ${layout}
`;

export const RangeBarContainer = styled.View.attrs(props => ({
}))`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

export const GreenBar = styled.View.attrs(props => ({
  borderRadius: 12,
  backgroundColor: props.theme.colors.successColor,
}))`
  flex: 1;
  height: 10;
  margin-right: 4;
  ${color}
  ${space}
  ${layout}
`;

export const OrangeGradientBar = styled(LinearGradient).attrs(props => ({
  colors: ['yellow', 'orange'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  borderRadius: 12,
  width: '40px',
}))`
  flex: 2;
  height: 10;
  margin-right: 4;
  ${color}
  ${space}
  ${layout}
`;

export const RedBar = styled.View.attrs(props => ({
  borderRadius: 12,
  backgroundColor: props.theme.colors.danger,
}))`
  flex: 1;
  height: 10;
  margin-right: 4;
  ${color}
  ${space}
  ${layout}
`;

export const MedianDotContainer = styled.View.attrs(props => ({
  transform: [{translateX: -7.5}], // translate by half of the width
}))`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 50%;
  background-color: black;
  border-radius: 7.5px;
  justify-content: center;
  align-items: center;
`;

export const MedianDot = styled.View.attrs(props => ({
  alignSelf: 'center',
}))`
  width: 6;
  height: 6;
  border-radius: 10;
  background-color: white;
`;

export const MedianContainer = styled.View.attrs(props => ({
}))`
  justify-content: center;
  align-items:center;
`;

export const MedianTextContainer = styled.View.attrs(props => ({
  borderRadius: 20,
}))`
  justify-content: center;
  align-items: center;
  margin-bottom: ${verticalScale(8)}px;
  width: ${moderateScale(94)}px;
  height: ${moderateScale(29)}px;
  background-color: black;
  ${layout} ${space} ${border}
`;

export const MedianText = styled.Text.attrs(props => ({
}))`
  text-align: center;
  color: white;
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${color}
  ${space}
`;


export const ShippingOptionsText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(10),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
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
  font-family: Urbanist-Bold;
  font-weight: 500;
  ${color}
  ${space}
`;

export const EmptyView = styled.View``;

export const ShippingDes = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  ${color}
  ${space}
`;

export const FreeTagContainer = styled.View.attrs(() => ({
  height: verticalScale(22),
  width: scale(76),
  borderRadius: scale(8),
  bg: '#b6eccb',
  ml: scale(10),
}))`
  align-items: center;
  justify-content: center;
  align-self: flex-start ${layout} ${color} ${space};
`;
export const RecTagContainer = styled.View.attrs(() => ({
  height: verticalScale(22),
  width: scale(76),
  borderRadius: scale(8),
  bg: '#b6eccb',
  ml: scale(10),
  mt: 2,
}))`
  align-items: center;
  justify-content: center;
  align-self: flex-start ${layout} ${color} ${space};
`;

export const FreeTag = styled.Text.attrs(() => ({
  color: '#4AAF57',
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
`;

export const FreeShippingDes = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(30),
  mt: 1,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  font-weight: 300 ${color} ${space};
`;

export const CellIndexContainer = styled.View.attrs(() => ({
  height: scale(20),
  borderRadius: scale(4),
  bg: 'rgba(0,0,0,0.7)',
  top: 6,
  left: 6,
  px: scale(6),
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 6px;
  left: 6px;
  ${layout} ${color} ${space} ${border};
`;

export const MainPhotoLabelContainer = styled.View.attrs(props => ({
  height: scale(18),
  borderRadius: scale(4),
  bg: props.theme.colors.white,
  bottom: 4,
  right: 6,
  px: scale(6),
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 4px;
  right: 6px;
  ${layout} ${color} ${space} ${border};
`;

export const MainPhotoLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(11)}px;
  font-family: Urbanist;
  font-weight: 600 ${color} ${space};
`;

export const IndexLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist-Bold;
  font-weight: 600 ${color} ${space};
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
