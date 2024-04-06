import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

export const MessageBoxContainer = styled.View.attrs(props => ({
  maxWidth: '100%',
  minWidth: '15%',
  minHeight: scale(42),
  maxHeight: scale(420),
  borderRadius: scale(10),
  borderBottomLeftRadius: scale(props?.self ? 0 : 10),
  borderTopLeftRadius: scale(props?.self ? 12 : 12),
  borderBottomRightRadius: scale(props?.self ? 0 : 10),
  borderTopRightRadius: scale(12),
  bg: props?.self
    ? props?.theme?.colors?.primary
    : props?.theme?.colors?.commonSearchBack,
  my: verticalScale(5),
  justifyContent: 'center',
  alignSelf: props?.self ? 'flex-end' : 'flex-start',
  mx: scale(10),
  p: scale(10),
  pl: scale(15),
  pr: scale(15),
  flexShrink: 1,
}))`
  ${layout}
  ${color}
  ${space}
`;

export const MessageText = styled.Text.attrs(props => ({
  color: props?.self ? props.theme.colors.white : props.theme.colors.text_light,
  flex: 1,
  flexWrap: 'wrap',
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-ExtraBold;
  font-weight: 400;
  text-align: left ${color} ${space} ${layout};
`;

export const TimeText = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Urbanist;
  position: absolute;
  right: 10px;
  bottom: 20px;
  ${color}
  ${space}
  ${layout}
`;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    marginRight: 10,
  },
  textPlaceholder: {
    width: 35,
    height: scale(8),
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginBottom: 5,
  },
  timePlaceholder: {
    height: scale(8),
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
});

export const ModalStyles = {
  margin: 0,
  justifyContent: 'flex-end',
};

export const ModalHeaderText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const ModalContainerView = styled.View.attrs(() => ({
  pt: scale(10),
  pb: scale(20),
}))`
  ${space}
`;

export const TopMargin = styled.View.attrs(props => ({
  mt: verticalScale(10),
}))`
  ${space}
`;
