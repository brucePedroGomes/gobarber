import React, { useState } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const [keyboard, setKeyboard] = useState(true);

  Keyboard.addListener('keyboardDidShow', () => {
    setKeyboard(false);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboard(true);
  });

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Login</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Password" />
            <Button
              onPress={() => {
                console.log('ok');
              }}
            >
              Login
            </Button>

            <ForgotPassword onPress={() => console.log('Forgot')}>
              <ForgotPasswordText>Forgot Password ?</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {keyboard && (
        <CreateAccountButton
          onPress={() => {
            console.log('Create');
          }}
        >
          <Icon name="log-in" size={16} color="#ff9000" />
          <CreateAccountButtonText>
            {/* eslint-disable-next-line */}
            Don't have an account ? Sign Up
          </CreateAccountButtonText>
        </CreateAccountButton>
      )}
    </>
  );
};

export default SignIn;
