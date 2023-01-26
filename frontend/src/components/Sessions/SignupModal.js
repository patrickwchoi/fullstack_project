
import { useState, useEffect } from 'react';
import {login, signUp} from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
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

const SignupModal = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const redirectToIndex = ()=>{
    history.push('/posts')
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (password === confirmPassword){
        setErrors([]);
        return dispatch(signUp({email, username, password}))
            .catch(async (res) =>{
                let data; 
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }) 
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  }

  return (
    <>
      <div onClick={openModal}>singup modal</div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={style}
      >
        <div className='login-modal session'>
          <div id='modal_img'>
            <img src="https://assets.tumblr.com/pop/src/assets/images/login-wall/art_v2-3f0f7a0b.gif"/>
          </div>
          <div className='modal-bottomhalf'>
          <form onSubmit={handleSubmit}>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label>
            Email
            <br/>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br/>
          <label>
            Username
            <br/>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br/>
          <label>
            Password
            <br/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br/>
          <label>
            Confirm Password
            <br/>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br/>
          <button type="submit">Sign Up</button>
        </form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SignupModal;