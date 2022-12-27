import React, {FC} from 'react';
import {useTheme} from 'styled-components';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ButtonContainer, BText} from './LSButtonStyles';
import {Size, Type} from '../../enums';
import {TouchableOpacityProps, Dimensions} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  size?: string;
  type?: string;
  radius?: number;
}

const windowWidth = Dimensions.get('window').width;

const LSButton: FC<ButtonProps> = React.memo(props => {
  const theme = useTheme();
  const {children, title, size, type, radius = 10} = props;
  let width = scale(60);
  let height = verticalScale(26);
  let fontSize = scale(12);
  let borderSize = scale(20);
  let buttonColor = theme?.colors.primary;
  let textColor = theme?.colors.white;

  const getSize = () => {
    switch (size) {
      case Size.Extra_Small:
        width = scale(80);
        height = verticalScale(32);
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
        width = '80%';
        height = moderateScale(48);
        fontSize = 16;
        borderSize = scale(radius);
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
        break;
      case Type.Secondary:
        buttonColor = theme?.colors.secondaryButton;
        textColor = theme?.colors.white;
        break;
      case Type.Grey:
        buttonColor = theme?.colors.screenBg;
        textColor = theme?.colors.black;
        break;
      case Type.Error:
        buttonColor = theme?.colors.errorColor;
        textColor = theme?.colors.white;
        break;
      case Type.Success:
        buttonColor = theme?.colors.successColor;
        textColor = theme?.colors.white;
        break;
      default:
        break;
    }
    return {buttonColor, textColor};
  };

  return (
    <ButtonContainer
      {...props}
      {...getSize()}
      {...getColors()}
      type={type}
      size={size}>
      <BText {...props} {...getSize()} {...getColors()} type={type} disabled>
        {children || title}
      </BText>
    </ButtonContainer>
  );
});

export default LSButton;
