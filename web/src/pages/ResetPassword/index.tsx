import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiLock } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/Toast';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

interface ResetFormFormData {
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetFormFormData) => {
      try {
        formRef.current?.setErrors({});

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error('token is missing');
        }

        const schema = Yup.object().shape({
          password: Yup.string().required('password is required'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'error when resetting password',
          description: 'an error occurred when resetting password',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logoImg" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset Password</h1>

            <Input
              name="password"
              icon={FiLock}
              placeholder="new password"
              type="password"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="password confirmation"
              type="password"
            />

            <Button type="submit">Login</Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Sign in
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
