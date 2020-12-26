import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AvatarInput } from './styles';

import api from '../../services/api';

import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updatedUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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
          type: 'success',
          title: 'Successful registration',
          description: 'Welcome to Gobarber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
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

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();

      data.append('avatar', e.target.files?.[0] ?? '');

      const response = await api.patch('users/avatar', data);

      updatedUser(response.data);
      addToast({ type: 'success', title: 'updated avatar' });

      return;
    },
    [addToast, updatedUser],
  );

  return (
    <>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>
        <Content>
          <Form
            ref={formRef}
            initialData={{ name: user.name, email: user.email }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />
                <input
                  type="file"
                  name="file"
                  id="avatar"
                  onChange={handleAvatarChange}
                />
              </label>
            </AvatarInput>
            <h1>My profile</h1>
            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              placeholder="current password"
              type="password"
            />

            <Input
              name="new_password"
              icon={FiLock}
              placeholder="new password"
              type="password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="password"
              type="password"
            />

            <Button type="submit">Confirm changes</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
