import React, { useState } from 'react';
import styled from 'styled-components/native';
import { LoginProvider, LoginProps } from 'context/Login';
import { Body } from 'typography';

const Button = styled.Button`
`;

const Wrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const Input = styled.TextInput`
`;


const LoginScreen: React.FC<LoginProps> = ({ login, error }) => {
  const [url, setUrl] = useState('');
  return (
    <Wrapper>
      {error && <Body>{error.toString()}</Body>}
      <Input placeholder="Server url" value={url} onChangeText={setUrl} />
      <Button title="Login" onPress={() => login(url)} />
    </Wrapper>
  );
};

const LoginContainer: React.FC = ({ children }) => {
  return (
    <LoginProvider
      Login={LoginScreen} 
    >
      {children}
    </LoginProvider>
  );
};

export default LoginContainer;

