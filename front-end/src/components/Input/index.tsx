import React, { InputHTMLAttributes, ComponentType } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: ComponentType;
}

const Input: React.FC<InputProps> = (props) => (
  <Container>
    <input {...props} />
  </Container>
);

export default Input;
