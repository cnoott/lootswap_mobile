import {ButtonContainer, BText} from './LSButtonStyles';
import React, {FC} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Size} from '../../enums';
import {TouchableOpacityProps, Dimensions} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  size?: string;
  type?: string;
}

const windowWidth = Dimensions.get('window').width;

const LSButton: FC<ButtonProps> = React.memo(props => {
  const {children, title, size, type} = props;
  let width = scale(60);
  let height = verticalScale(26);
  let fontSize = scale(12);
  let borderSize = scale(20);

  const getSize = () => {
    switch (size) {
      case Size.Small:
        width = scale(110);
        height = verticalScale(32);
        fontSize = scale(14);
        borderSize = scale(10);
        break;
      case Size.Medium:
        width = moderateScale(windowWidth / 2 - 36);
        height = moderateScale(48);
        fontSize = 15;
        borderSize = scale(20);
        break;
      case Size.Large:
        width = moderateScale(windowWidth - 120);
        height = moderateScale(48);
        fontSize = 16;
        borderSize = scale(30);
        break;
      default:
        break;
    }

    return {width, height, fontSize, borderSize};
  };

  return (
    <ButtonContainer {...props} {...getSize()} type={type} size={size}>
      <BText {...props} {...getSize()} type={type}>
        {children || title}
      </BText>
    </ButtonContainer>
  );
});

export default LSButton;
