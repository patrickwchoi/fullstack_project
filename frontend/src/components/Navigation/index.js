import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import {useLoginModal, useSignupModal } from '../../context/Modal';
import { BsFillHouseDoorFill, FaMoon, FaHouseUser  } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";


import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const {showLogin, openLogin, closeLogin} = useLoginModal();
  const {showSignup, openSignup, closeSignup} = useSignupModal();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navbar'>
        {/* <ProfileButton user={sessionUser} /> */}
        <a href='/posts'> <FaHouseUser/> </a>
        <a href='/users/{sessionUser.id}'> <BsFillPersonFill/> </a>  {/*how to implement?? */}
        <a href='/posts/new'> <MdEditNote/></a> 
      </div>

    );
  } else {
    sessionLinks = (
      <div className='navbar'>
        
        <NavLink exact to="/">Home</NavLink>
        <>
          <button onClick={openLogin} id='login-button'>Open Login form</button>
          <button onClick={openSignup} id='signup-button'>Open Signup form</button>
        </>

      </div>
    );
  }

  return (
    <ul>
      <li>
        {/* <NavLink exact to="/">Home</NavLink>  Moved this to nav bar*/} 
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;