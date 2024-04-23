import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {
  scale,
  moderateScale,
  verticalScale,
  border,
} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

export const ModalStyles = {
  margin: 0,
  justifyContent: 'flex-end',
};
export const ModalHeaderText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(15),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const ModalSubText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const ScrollView: any = styled.ScrollView.attrs(() => ({}))`
  padding-vertical: ${scale(8)}px;
  padding-bottom: ${scale(20)}px;
  marginbottom: ${scale(35)}px;
`;

export const Image = styled.Image.attrs((props: any) => ({
  width: scale(56),
  height: scale(56),
  borderRadius: scale(10),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const IconTouchable = styled.TouchableOpacity.attrs(() => ({}))`
  padding-left: ${scale(15)}px;
`;

export const IconText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: scale(5),
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Urbanist;
  text-align: center;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const ItemContainer = styled.TouchableOpacity.attrs(() => ({
  width: 'auto',
  p: 2,
  borderRadius: 150,
  backgroundColor: 'white',
  overflow: 'hidden',
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const ShareCardImage = styled.Image.attrs({
  height: 380,
  width: 300,
  borderRadius: 10,
  resizeMode: 'cover',
})`
  align-self: center;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const HeaderTextMain = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: 0.5,
  numberOfLines: 3,
}))`
  font-size: 20px;
  font-family: 'Urbanist-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const BottomHeaderView = styled.View.attrs(() => ({
  justifyContent: 'space-between',
}))`
  flex-direction: row ${space} ${layout} ${color};
`;

export const CellBottomView = styled.View.attrs(() => ({
  mt: verticalScale(5),
  px: scale(5),
  overflow: 'hidden',
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const FreeShipingContainer = styled.View.attrs(() => ({
  px: 10,
  py: 10,
  bg: 'rgba(0,0,0,0.5)',
  borderRadius: scale(5),
}))`
  position: absolute;
  bottom: 6px;
  left: 8px;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const HeaderDes = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(2),
  maxWidth: '95%',
  numberOfLines: 1,
}))`
  font-size: ${moderateScale(17)}px;
  font-family: 'Urbanist-Medium';
  font-weight: 500;
  ${color}
  ${space}
  ${layout}
`;

export const LogoImageContainer = styled.View.attrs({
  backgroundColor: 'white',
  mt: 15,
  borderTopWidth: 1,
  borderTopColor: '#D3D3D3',
  height: 100,
  overflow: 'hidden',
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${color}
  ${space}
  ${border}
  ${layout}
`;

export const LogoImage = styled.Image.attrs({
  width: 110,
  height: 20,
  ml: scale(2),
})`
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;
