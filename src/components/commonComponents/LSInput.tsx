import {InputContainer, ErrorText, TextInput, Touchable} from './LSInputStyles';
import React, {FC} from 'react';
import {TextInputProps} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface LSInputProps extends TextInputProps {
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: Function;
  homeSearch?: boolean;
  height?: number;
}

const LSInput: FC<LSInputProps> = React.memo(props => {
  const {
    error,
    leftIcon,
    rightIcon,
    onRightIconPress = () => {},
    homeSearch = false,
  } = props;
  return (
    <>
      <InputContainer isHomeSearch={homeSearch}>
        {leftIcon && <SvgXml xml={leftIcon} />}
        <TextInput {...props} isHomeSearch={homeSearch} />
        {rightIcon && (
          <Touchable onPress={onRightIconPress}>
            <SvgXml xml={rightIcon} />
          </Touchable>
        )}
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
});

export default LSInput;
