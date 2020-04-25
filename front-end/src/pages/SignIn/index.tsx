import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="logoImg" />
      <form>
        <h1>Sign In</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          placeholder="password"
          type="password"
        />

        <Button type="submit">Login</Button>

        <a href="forgot">Forgot password ?</a>
      </form>
      <a href="login">
        <FiLogIn />
        Sign up
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
