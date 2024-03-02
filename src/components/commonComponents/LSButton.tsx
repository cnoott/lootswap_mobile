import React, {FC} from 'react';
import {useTheme} from 'styled-components';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ButtonContainer, BText} from './LSButtonStyles';
import {Size, Type} from '../../enums';
import {SvgXml} from 'react-native-svg';
import {TouchableOpacityProps, Dimensions} from 'react-native';
import { borderLeft } from 'styled-system';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  size?: string;
  type?: string;
  radius?: number;
  fitToWidth?: string;
  buttonCustomColor?: any;
  customTextColor?: string;
  sizeFont?: number;
  customHeight?: number;
  customWidth?: number;
  icon?: any;
}

const windowWidth = Dimensions.get('window').width;

const LSButton: FC<ButtonProps> = React.memo(props => {
  const theme = useTheme();
  const {
    children,
    title,
    size,
    type,
    buttonCustomColor,
    customTextColor = 'white',
    radius = 10,
    fitToWidth = '80%',
    sizeFont = 16,
    customWidth = 110,
    customHeight = 48,
    icon,
  } = props;
  let width = scale(60);
  let height = verticalScale(26);
  let fontSize = scale(12);
  let borderSize = scale(20);
  let buttonColor = theme?.colors.primary;
  let borderColor = theme?.colors.primary;
  let border = scale(0);
  let textColor = theme?.colors.white;

  const getSize = () => {
    switch (size) {
      case Size.Extra_Small:
        // width = scale(70);
        height = verticalScale(28);
        fontSize = scale(12);
        borderSize = scale(radius);
        break;
      case Size.Small:
        width = scale(110);
        height = verticalScale(32);
        fontSize = scale(14);
        borderSize = scale(10);
        break;
      case Size.Medium:
        width = moderateScale(windowWidth / 2 - 66);
        height = moderateScale(48);
        fontSize = moderateScale(16);
        borderSize = scale(20);
        break;
      case Size.Large:
        width = moderateScale(windowWidth - 120);
        height = moderateScale(48);
        fontSize = 16;
        borderSize = scale(30);
        break;
      case Size.Full:
        width = moderateScale(windowWidth - 80);
        height = moderateScale(48);
        fontSize = 16;
        borderSize = scale(radius);
        break;
      case Size.Fit_To_Width:
        width = fitToWidth;
        height = moderateScale(48);
        fontSize = sizeFont;
        borderSize = scale(radius);
        break;
      case Size.Custom:
        width = customWidth;
        height = moderateScale(customHeight);
        fontSize = sizeFont;
        borderSize = scale(radius);
        break;

      case Size.View:
        width = scale(100);
        height = scale(32);
        fontSize = scale(12);
        borderSize = scale(20);
        break;

      case Size.ViewSmall:
        width = scale(80);
        height = scale(32);
        fontSize = scale(12);
        borderSize = scale(20);
        break;
      default:
        break;
    }

    return {width, height, fontSize, borderSize};
  };

  const getColors = () => {
    switch (type) {
      case Type.Primary:
        buttonColor = theme?.colors.primary;
        textColor = theme?.colors.white;
        border = 0;
        break;
      case Type.Secondary:
        buttonColor = theme?.colors.secondaryButton;
        textColor = theme?.colors.white;
        border = 0;
        break;
      case Type.Grey:
        buttonColor = theme?.colors.screenBg;
        textColor = theme?.colors.black;
        border = 0;
        break;
      case Type.Disabled:
        buttonColor = theme?.colors.screenBg;
        textColor = theme?.colors.textGrey;
        border = 0;
        break;
      case Type.Error:
        buttonColor = theme?.colors.errorColor;
        textColor = theme?.colors.white;
        border = 0;
        break;
      case Type.Success:
        buttonColor = theme?.colors.successColor;
        textColor = theme?.colors.white;
        border = 0;
        break;
      case Type.Custom:
        buttonColor = buttonCustomColor;
        textColor = customTextColor;
        break;
      case Type.View:
        buttonColor = theme?.colors?.white;
        textColor = theme?.colors?.primary;
        border = scale(1);
        borderColor = theme?.colors?.primary;
        break;
      default:
        break;
    }
    return {buttonColor, textColor, borderColor, border};
  };

  return (
    <ButtonContainer
      {...props}
      {...getSize()}
      {...getColors()}
      type={type}
      size={size}>
      {icon && <SvgXml xml={icon} style={{marginRight: 15}}/>}
      <BText {...props} {...getSize()} {...getColors()} type={type} disabled>
        {children || title}
      </BText>
    </ButtonContainer>
  );
});

export default LSButton;
