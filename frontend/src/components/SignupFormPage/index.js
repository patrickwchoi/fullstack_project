import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { useSignupModal } from "../../context/Modal";


const SignupFormPage = () => {
    const { showSignup, closeSignup } = useSignupModal();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([])


    if(sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (password === confirmPassword){
            setErrors([]);
            return dispatch(sessionActions.signUp({email, username, password}))
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
    
    return showSignup? (
        <form onSubmit={handleSubmit} className='modal'>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label>
            Email
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
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br/>
          <button type="submit">Sign Up</button>
          <button onClick={closeSignup} className='close-button'>Close</button>
        </form>
    ): null;
}


export default SignupFormPage