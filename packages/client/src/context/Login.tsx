import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync, TokenResponse } from 'expo-auth-session';
import { Platform } from 'react-native';

interface LoginContextValue {
  token: string;
  getToken: () => Promise<string>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginProps {
  login: () => void;
  loading: boolean;
}

interface Props {
  domain: string;
  clientId: string;
  children: ReactNode;
  Login: React.FC<LoginProps>
}

WebBrowser.maybeCompleteAuthSession();

const LoginContext = createContext<LoginContextValue>({
  token: undefined as any,
  getToken: async () => '',
  refresh: async () => {},
  logout: async () => {},
});

const useProxy = Platform.select({ web: false, default: true });

const LoginProvider: React.FC<Props> = ({ domain, clientId, children, Login }) => {
  const storageKey = `token_${domain}_${clientId}`;
  const [token, setToken] = useState<TokenResponse | undefined>(undefined);
  const discovery = useAutoDiscovery(domain);
  const redirectUri = useMemo(
    () => makeRedirectUri({
        // For usage in bare and standalone
      native: 'com.okta.<OKTA_DOMAIN>:/callback',
      useProxy,
    }),
    [],
  );

  useEffect(() => {
    const run = async () => {
      const current = await AsyncStorage.getItem(storageKey);
      if (!current) return;
      const parsed = JSON.parse(current);
      setToken(parsed);
    };

    run();
  }, [domain, clientId]);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: ['openid', 'profile'],
      // For usage in managed apps using the proxy
      redirectUri,
      usePKCE: false,
    },
    discovery
  );

  const logout = useCallback(async () => {}, []);
  const refresh = useCallback(async () => {}, []);
  const getToken = useCallback(async () => token!.accessToken, [token]);

  useEffect(() => {
    const run = async () => {
      if (response?.type === 'success' && response.params.code && discovery) {
        const { code: newCode } = response.params;
        
        const token = await exchangeCodeAsync({
          code: newCode,
          redirectUri,
          clientId,
        }, discovery);
        
        setToken(token);
        await AsyncStorage.setItem(storageKey, JSON.stringify(token));
      }
    };

    run();
  }, [response, discovery]);

  if (!token) {
    return (
      <Login
        login={() => promptAsync({ useProxy })}
        loading={!!request}
      />
    );
  }

  return (
    <LoginContext.Provider
      value={{
        token: token.accessToken,
        getToken,
        refresh,
        logout,
      }}
    >
      { children }
    </LoginContext.Provider>
  );
};

export {
  LoginProvider,
  LoginProps,
};

export default LoginContext;
