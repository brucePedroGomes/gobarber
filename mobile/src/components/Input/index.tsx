import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={20} color="#656360" />
    <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#656360"
      {...rest}
    />
  </Container>
);

export default Input;
