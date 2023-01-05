import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom";
import './LoginFormPage.css'
import { useLoginModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const LoginFormPage = () => {
  const { showLogin, closeLogin } = useLoginModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([])
  const history = useHistory();
  
  if (sessionUser) return <Redirect to='/' /> 
  
  const handleDemoLogin = (e) => { 
    // setCredential('walter_white');
    // setPassword('password');
    // handleSubmit(e);
    return dispatch(login({credential: 'walter_white', password: 'password'}))
    .then( ()=> {
      closeLogin();
      redirectToIndex();
    })
  }
  const redirectToIndex = ()=>{
    history.push('/posts')
  }


  const handleSubmit = (e) => {
    e.preventDefault();
  
    setErrors([]);
    return dispatch(login({credential, password}))
      .then( ()=> {
        closeLogin();
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

  return showLogin ? ( //only returns form if showLogin is true
      <form onSubmit={handleSubmit}>
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
          <button onClick={closeLogin} className='close-button'>Close</button> {/* replace with closing modal when you click outside modal */}
          <button onClick={handleDemoLogin} >Demo Login</button> 
      </form>
    
  ) : null;
}



export default LoginFormPage