
import { useState, useEffect } from 'react';
import {login} from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import tumblr_login_gif from '../../assets/tumblr_login.gif'
import './Sessions.css'

const style={
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '1000',

  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(200px, 50%, 500px)',
    height: 'fit-content',
    border: 'none',  
    background: 'RGB(var(--purple))', 
    color: 'white',
    padding: '10px',

  },
}

const LoginModal = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([])
  const history = useHistory();

  
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  
  if (sessionUser) return <Redirect to='/' /> 

  const handleDemoLogin = (e) => { 
    e.preventDefault();
    return dispatch(login({credential: 'walter_white', password: 'password'}))
    .then( ()=> {
      redirectToIndex();
    }).catch(async res => {
      let data; 
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  }
  const redirectToIndex = ()=>{
    history.push('/posts')
  }


  const handleSubmit = (e) => {
    e.preventDefault();
  
    setErrors([]);
    return dispatch(login({credential, password}))
      .then( ()=> {
        // closeLogin();
        redirectToIndex();
      }) 
      .catch(async res => {
          let data; 
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
      });

  }
  Modal.setAppElement('#root');

  return (
    <>
      <div onClick={openModal} className="navbar-button" id="login-button">Login</div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={style}
      >
        <div className='login-modal session'>
          <div id='modal_img'>
            <img src={tumblr_login_gif}/>
          </div>
          <div className='modal-bottomhalf'>
            <form onSubmit={handleSubmit} >
              <ul>
                  {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              <label>
                Username or Email
                <input
                  // placeholder='Username or Email'
                  type="text" value={credential}
                  onChange={(e) => setCredential(e.target.value)} required
                />
              </label>
              <br/>
              <label>
                Password
                <br/>
                <input
                  type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required
                />
              </label>
              <br/>
              <button type="submit">Log In</button>
              {/* <button onClick={closeLogin} className='close-button'>Close</button>  */}
              {/* replace with closing modal when you click outside modal */}
              <button onClick={handleDemoLogin} >Demo Login</button> 
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LoginModal;