//create a react context
import React, { useEffect } from 'react';
import { createContext, useState, useContext } from 'react';

import { ReactDOM } from 'react-dom';

// const LoginPageContext = React.createContext(); do it like this if you import React without the {}
export const LoginPageContext = createContext();
export const useLoginModal = () => useContext(LoginPageContext);

export const SignupFormContext = createContext();
export const useSignupModal = () => useContext(SignupFormContext);


export default function ModalProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const loginFormContextValue = {showLogin, openLogin, closeLogin}

  return (
    <>
      <LoginPageContext.Provider value={loginFormContextValue}>
        {children}
      </LoginPageContext.Provider>
    </>
  );
}
