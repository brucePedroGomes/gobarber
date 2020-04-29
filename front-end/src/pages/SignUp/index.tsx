import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErros from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import api from '../../services/api';

import { useToast } from '../../hooks/Toast';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('Email is required')
            .email('E-mail invalid'),
          password: Yup.string().min(6, 'minimum of 6 digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'sucess',
          title: 'Successful registration',
          description: 'Welcome to Gobarber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Registration error',
          description: 'Try again',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="logoImg" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Sign Up</h1>
              <h2>It’s quick and easy</h2>
              <Input name="name" icon={FiUser} placeholder="Name" />
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                placeholder="password"
                type="password"
              />

              <Button type="submit">Sign Up</Button>
            </Form>
            <Link to="/">
              <FiArrowLeft />
              Have an account? Log in
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
      )
    </>
  );
};

export default SignUp;
