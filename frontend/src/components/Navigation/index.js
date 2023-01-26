import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import {useLoginModal, useSignupModal } from '../../context/Modal';
import { BsFillHouseDoorFill, FaMoon, FaHouseUser, FaRegCompass } from "react-icons/fa";
import { BsFillPersonFill, BsFillLightningChargeFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import './Navigation.css';
import PostCreate from '../Posts/PostCreate'

import LoginModal from '../Sessions/LoginModal';
import SignupModal from '../Sessions/SignupModal';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const {showLogin, openLogin, closeLogin} = useLoginModal();
  const {showSignup, openSignup, closeSignup} = useSignupModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  const redirectToIndex = () => {
    history.push(`/posts`)
  }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navbar'>
        {/* <div id="navbar-loggedin"> */}
          <div id="navbar-left">
            <Link to='/posts'>
              <img id="logo"  src="https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/tumblr_logo.png"></img>
            </Link>
          </div>
          <div id="navbar-right">
            <a href='/posts'> <FaHouseUser className='nav-icon'/> </a>
            <FaRegCompass className='nav-icon' />
            <IoIosMail  className='nav-icon' />
            <BsFillLightningChargeFill  className='nav-icon' />
            <a href={`/users/${sessionUser.id}`}> <BsFillPersonFill  className='nav-icon'/> </a>
            {/* <a href='/posts/new'> <MdEditNote/></a>  */}
            <PostCreate id='navbar-post-create'/>
            <button onClick={logout}>Logout</button>
          </div>
      </div>

    );
  } else {
    sessionLinks = (
      <div className='navbar'>
        <div>  <img id="logo"  src="https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/tumblr_logo.png"></img></div>
        <div id="login-signup">
          <LoginModal/>
          <SignupModal/>
          {/* <button onClick={openLogin} id='login-button'>Open Login form</button>
          <button onClick={openSignup} id='signup-button'>Open Signup form</button> */}
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