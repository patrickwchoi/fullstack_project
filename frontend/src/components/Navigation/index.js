import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
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
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navbar'>
        {/* <div id="navbar-loggedin"> */}
          <div id="navbar-left">
            <img id="logo" src="https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/tumblr_logo.png"></img>
          </div>
          <div id="navbar-right">
            <a href='/posts'> <FaHouseUser/> </a>
            <a href={`/users/${sessionUser.id}`}> <BsFillPersonFill/> </a>  {/*how to implement?? */}
            <a href='/posts/new'> <MdEditNote/></a> 
            <button onClick={logout}>Logout</button>
          </div>
      </div>

    );
  } else {
    sessionLinks = (
      <div className='navbar'>
        
        <div id="login-signup">
          <button onClick={openLogin} id='login-button'>Open Login form</button>
          <button onClick={openSignup} id='signup-button'>Open Signup form</button>
        </div>

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