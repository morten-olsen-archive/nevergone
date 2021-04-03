import { useContext } from 'react';
import LoginContext from 'context/Login';

const useLogin = () => {
  const context = useContext(LoginContext);
  return context;
};

export default useLogin;
