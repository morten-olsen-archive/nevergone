import { HttpOptions } from '@apollo/client';

interface Options {
  getToken: () => Promise<string>; 
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const customFetch = ({
  getToken,
  refresh,
  logout,
}: Options): HttpOptions['fetch'] => async (uri: string, options: any) => {

  try {
    const response = await fetch(uri, options);
    return response;
  } catch (err) {
    if (err.response?.statusCode !== 401) {
      throw err;
    }
    try {
      await refresh();
      const token = getToken();
      options.headers.authorization = `Bearer ${token}`;
      return fetch(uri, options);
    } catch (err) {
      await logout();
      throw err;
    }
  }
};

export default customFetch;
