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
  filterSearch?: boolean;
  height?: number;
  horizontalSpace?: number;
  topSpace?: number;
  onBlurCall?: Function;
  keyboardType?: string;
  inputRadius?: number;
  defaultValue?: any;
}

const LSInput: FC<LSInputProps> = React.memo(props => {
  const {
    error,
    leftIcon,
    rightIcon,
    horizontalSpace,
    topSpace,
    onRightIconPress = () => {},
    homeSearch = false,
    filterSearch = false,
    onBlurCall = () => {},
    keyboardType = 'default',
    inputRadius = 8.5,
  } = props;
  return (
    <>
      <InputContainer
        isHomeSearch={homeSearch || filterSearch}
        horizontalSpace={horizontalSpace}
        topSpace={topSpace}
        inputRadius={inputRadius}>
        {leftIcon && <SvgXml xml={leftIcon} />}
        <TextInput
          {...props}
          isHomeSearch={homeSearch}
          onBlur={onBlurCall}
          keyboardType={keyboardType}
          placeholderTextColor={'red'}
        />
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
