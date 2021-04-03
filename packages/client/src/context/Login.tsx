import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import {
  makeRedirectUri,
  exchangeCodeAsync,
  TokenResponse,
  fetchDiscoveryAsync,
  refreshAsync,
  revokeAsync,
  AuthRequest,
} from 'expo-auth-session';
import { Platform } from 'react-native';

interface LoginContextValue {
  getToken: () => Promise<string>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginProps {
  login: (url: string) => void;
  loading: boolean;
  error?: any;
}

interface Session {
  domain: string;
  token: TokenResponse;
}

interface Props {
  children: ReactNode;
  Login: React.FC<LoginProps>
}

WebBrowser.maybeCompleteAuthSession();

const LoginContext = createContext<LoginContextValue>({
  getToken: async () => '',
  refresh: async () => {},
  logout: async () => {},
});

const useProxy = Platform.select({ web: false, default: true });

const LoginProvider: React.FC<Props> = ({ children, Login }) => {
  const storageKey = `session`;
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | undefined>();
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
      const session = {
        ...parsed,
        token: new TokenResponse(parsed.token)
      };
      setSession(session);
    };

    run();
  }, []);

  const login = useCallback((url: string) => {
    setError(undefined);
    setLoading(true);
    const run = async () => {
      const configRequest = await fetch(`${url}/auth/config`);
      const { domain, clientId } = await configRequest.json();
      const discovery = await fetchDiscoveryAsync(domain);
      const request = new AuthRequest({
        clientId,
        responseType: 'code',
        redirectUri,
        usePKCE: false,
      });
      const response = await request.promptAsync(discovery, {
        useProxy,
      });
      if (response.type === 'error') {
        throw new Error(response.error?.toString() || 'Login failed');
      }
      if (response.type === 'success') {
        const { code: newCode } = response.params;
        
        const token = await exchangeCodeAsync({
          code: newCode,
          redirectUri,
          clientId,
        }, discovery);
        
        setLoading(false);
        setSession({
          domain,
          token
        });
        await AsyncStorage.setItem(storageKey, JSON.stringify({
          domain,
          token
        }));
      }
    };

    run().catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, []);

  const logout = useCallback(async () => {
    if (!session) return;
    await AsyncStorage.removeItem(storageKey);
    const discovery = await fetchDiscoveryAsync(session.domain);
    revokeAsync({
      token: session.token.refreshToken!,
    }, discovery);
    setSession(undefined);
  }, [session]);

  const refresh = useCallback(async () => {
    if (!session) return;
    const configRequest = await fetch(`${session.domain}/auth/config`);
    const { domain, clientId } = await configRequest.json();
    const discovery = await fetchDiscoveryAsync(domain);
    session?.token.refreshAsync({
      clientId,
    }, discovery);
  }, [session]);
  const getToken = useCallback(async () => session!.token.accessToken, [session]);


  if (!session) {
    return (
      <Login
        login={login}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <LoginContext.Provider
      value={{
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
