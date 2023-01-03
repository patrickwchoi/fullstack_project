import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import {useLoginModal, useSignupModal } from '../../context/Modal';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const {showLogin, openLogin, closeLogin} = useLoginModal();
  const {showSignup, openSignup, closeSignup} = useSignupModal();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      {/* replace with triggers to open modals */}
        {/* <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink> */}
        <button onClick={openLogin}>Open Login form</button>;
        <button onClick={openSignup}>Open Signup form</button>;

      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;