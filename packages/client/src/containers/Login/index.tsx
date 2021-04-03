import React from 'react';
import styled from 'styled-components/native';
import { LoginProvider, LoginProps } from 'context/Login';

const Button = styled.Button`
`;

const Wrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;
`;


const LoginScreen: React.FC<LoginProps> = ({ login }) => (
  <Wrapper>
    <Button title="Login" onPress={login} />
  </Wrapper>
);

const LoginContainer: React.FC = ({ children }) => {
  return (
    <LoginProvider
      domain="https://keycloak.mortenolsen.pro/auth/realms/master"
      clientId="test"
      Login={LoginScreen} 
    >
      {children}
    </LoginProvider>
  );
};

export default LoginContainer;

