//create a react context
import React, { useEffect } from 'react';
import { createContext, useState, useContext } from 'react';

import { ReactDOM } from 'react-dom';

// const LoginPageContext = React.createContext(); do it like this if you import React without the {}
export const LoginPageContext = createContext();
export const useLoginModal = () => useContext(LoginPageContext);
//why tf did i name it loginpage instead of loginform
export const SignupFormContext = createContext();
export const useSignupModal = () => useContext(SignupFormContext);


export default function ModalProvider({ children }) {
  
  const [showLogin, setShowLogin] = useState(false);
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const loginFormContextValue = {showLogin, openLogin, closeLogin}
  
  const [showSignup, setShowSignup] = useState(false);
  const openSignup = () => setShowSignup(true);
  const closeSignup = () => setShowSignup(false);
  const SignupFormContextValue = {showSignup, openSignup, closeSignup}
  
  
  // const modal = document.getElementById('modal');
  // // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(e) {
  //   // e.preventDefault();    
  //   if (e.target == modal) {
  //     closeLogin(); //this is pretty ugly
  //     closeSignup();
  //   }
  // }

  return (
    <>
      <LoginPageContext.Provider value={loginFormContextValue}>
        <SignupFormContext.Provider value={SignupFormContextValue}>
          {children}
        </SignupFormContext.Provider>
      </LoginPageContext.Provider>
    </>
  );
}
