import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="logoImg" />
      <form>
        <h1>Sign In</h1>

        <input placeholder="E-mail" />
        <input placeholder="password" type="password" />

        <button type="submit">Login</button>

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
