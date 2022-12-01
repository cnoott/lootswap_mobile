import styled from 'styled-components/native';
import {color, border, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import {Size, Type} from '../enums';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  bg: props.theme.colors.bg,
}))`
  justify-content: center;
  align-items: center;
  ${color}
`;

export const HeaderContainer = styled.View.attrs({
  height: scale(94),
  pt: moderateScale(34),
})`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
`;

export const Touchable = styled.TouchableOpacity.attrs(props => ({
  bg: props.theme.colors.bg,
  ml: verticalScale(10),
}))`
  padding: 5px;
  ${color}
  ${space}
  ${layout}
`;

export const HeaderText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  fontSize: moderateScale(14),
  mr: moderateScale(2),
}))`
  font-weight: 500;
  ${color}
  ${space}
`;

export const LogoImage = styled.Image.attrs({
  width: scale(160),
  height: scale(27),
  mr: moderateScale(10),
})`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const Block = styled.View.attrs({
  flex: 1,
})`
  ${color}
  ${space}
${layout}
`;

export const BlockAlignRight = styled.View.attrs({
  flex: 1,
})`
  align-items: flex-end;
  ${color}
  ${space}
${layout}
`;

export const BellImage = styled.Image.attrs({
  width: scale(22),
  height: scale(20),
  // mr: moderateScale(10),
})`
  ${color}
  ${space}
${layout}
`;

export const BellTouchable = styled.TouchableOpacity.attrs({})`
  position: absolute;
  right: 12px;
  top: 65px;
  ${color}
  ${layout}
  ${space}
`;

export const ButtonContainer = styled.TouchableOpacity.attrs(props => ({
  width: props.width,
  height: props.height,
  borderWidth: props.size === Size.Medium ? 2 : 0,
  bg:
    props.type === Type.Primary
      ? props.theme.colors.primary
      : props.theme.colors.secondary,
  borderRadius: props.theme.borderRadius,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${layout}
  ${color}
  ${border}
`;

export const ButtonInnerContainerOne = styled.View.attrs(() => ({
  flex: 1,
  left: 7,
  right: 7,
  bottom: 7,
  top: 7,
  position: 'absolute',
  borderRadius: scale(2),
}))`
  border-width: 2px;
  border-color: ${props =>
    `${
      props.type === Type.Primary
        ? props.theme.colors.secondary
        : props.theme.colors.primary
    }`};
  ${layout}
  ${color}
  ${border}
`;

export const ButtonInnerContainerTwo = styled.View.attrs(props => ({
  flex: 1,
  bg:
    props.type === Type.Primary
      ? props.theme.colors.primary
      : props.theme.colors.secondary,
  left: 0,
  right: 0,
  bottom: 13,
  top: 13,
  position: 'absolute',
}))`
  ${layout}
  ${color}
${border}
`;

export const ButtonInnerContainerThree = styled.View.attrs(props => ({
  flex: 1,
  bg:
    props.type === Type.Primary
      ? props.theme.colors.primary
      : props.theme.colors.secondary,
  left: 13,
  right: 13,
  bottom: 0,
  top: 0,
  position: 'absolute',
}))`
  ${layout}
  ${color}
  ${space}
${border}
`;

export const BText = styled.Text.attrs(props => ({
  color:
    props.type === Type.Primary
      ? props.theme.colors.secondary
      : props.theme.colors.primary,
}))`
  font-size: ${props => `${props.fontSize}px`};
  ${color}
`;

export const Text = styled.Text.attrs(props => ({
  color: props.color,
}))`
  font-size: ${props => `${props.fontSize}px`};
  ${color}
`;

export const InputContainer = styled.View.attrs(() => ({
  width: moderateScale(windowWidth - 70),
  marginTop: moderateScale(76),
}))`
  align-self: center;
  ${color}
`;

export const ErrorText = styled.Text.attrs(props => ({
  color: props.theme.colors.danger,
  mt: scale(2),
  mb: scale(10),
}))`
  font-size: ${scale(12)}px;
  ${color}
  ${space}
`;

export const TextInput = styled.TextInput.attrs(props => ({
  color: props.theme.colors.black,
  placeholderTextColor: props.theme.colors.placeholder,
  bg: props.theme.colors.white,
  height: scale(47),
  // borderBottomColor: props.theme.colors.secondary,
  borderRadius: scale(8.5),
  textAlign: 'center',
  shadowColor: props.theme.colors.primary,
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: {
    height: 1,
    width: 1,
  },
  fontSize: 15,
  mb: scale(8),
}))`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const ItemContainer = styled.View.attrs(props => ({
  height: moderateScale(58),
  marginTop: moderateScale(14),
  borderRadius: moderateScale(8),
  marginHorizontal: moderateScale(5),
  padding: moderateScale(13),
  bg: props.theme.colors.white,
  borderBottomColor: props.theme.colors.secondary,
  shadowColor: props.theme.colors.primary,
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: {
    height: 1,
    width: 1,
  },
}))`
  justify-content: center;

  ${color}
  ${space}
${layout}
${border}
`;

export const RowContainer = styled.View.attrs(() => ({}))`
  margin-top: ${props =>
    props.marginTop ? moderateScale(props.marginTop) : 0}px;
  flex-direction: row;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs({
  width: scale(33),
  height: scale(33),
})`
  ${color}
  ${space}
  ${layout}
`;

export const MarginT = styled.View.attrs(() => ({}))`
  margin-top: ${props => (props.mt ? moderateScale(props.mt) : 0)}px;
`;

export const MarginL = styled.View.attrs(() => ({}))`
  margin-left: ${props => (props.ml ? moderateScale(props.ml) : 0)}px;
`;

export const MarginR = styled.View.attrs(() => ({}))`
  margin-right: ${props => (props.mr ? moderateScale(props.mr) : 0)}px;

  ${color}
  ${space}
    ${layout}
`;

export const Circle = styled.View.attrs(props => ({
  width: moderateScale(20.5),
  height: moderateScale(20.5),
  borderRadius: moderateScale(10.25),
  borderColor: props.theme.colors.primary,
  borderWidth: moderateScale(1),
}))`
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
`;

export const InnterCircle = styled.View.attrs(props => ({
  width: moderateScale(14),
  height: moderateScale(14),
  borderRadius: moderateScale(7),
  bg: props.theme.colors.primary,
}))`
  align-items: center;
  justify-content: center;
  ${color}
  ${space}
  ${layout}
`;

export const ModalItemContainer = styled.TouchableOpacity.attrs(props => ({
  height: moderateScale(47),
  padding: moderateScale(17),
  bg: props.theme.colors.white,
}))`
  flex-direction: row;
  align-items: center;
  ${color}
  ${space}
  ${layout}
  ${border}
`;
