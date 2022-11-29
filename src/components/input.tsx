import { InputContainer, ErrorText, TextInput } from './styles';
import React, { FC } from 'react';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  error?: string;
}

export const InInput: FC<InputProps> = React.memo((props) => {
  const { error } = props;
  return (
    <InputContainer>
      <TextInput {...props} placeholder={'ENTER YOUR PASSWORD'} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
});
