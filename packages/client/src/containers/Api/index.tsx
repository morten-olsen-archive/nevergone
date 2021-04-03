import React, { useContext, useMemo } from 'react';
import LoginContext from 'context/Login';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import createCustomFetch from './fetch';

const Apollo: React.FC = ({ children }) => {
  const { getToken, logout, refresh } = useContext(LoginContext);

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: 'http://192.168.10.104:4000/graphql',
      fetch: createCustomFetch({
        getToken,
        logout,
        refresh,
      }),
    });

    const authLink = setContext(async (_, { headers }) => {
      // get the authentication token from local storage if it exists
      const accessToken = await getToken();
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${accessToken}`,
        }
      }
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink) as any,
      cache: new InMemoryCache()
    });

    return client;
  }, []);

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default Apollo;
