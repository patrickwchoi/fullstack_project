import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom";
import './LoginFormPage.css'
import { useLoginModal } from "../../context/Modal";

const LoginFormPage = () => {
    const { showLogin, closeLogin } = useLoginModal();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to='/' /> 

    const handleDemoLogin = (e) => { 
        setCredential('walter_white');
        setPassword('password');
        handleSubmit();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // const user = {
        //     credential,
        //     password
        // }
        // dispatch(login(user))
        setErrors([]);
        return dispatch(login({credential, password}))
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
        <form onSubmit={handleSubmit} className ='modal'>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Log In</button>
            <button onClick={closeLogin} className='close-button'>Close</button> {/* replace with closing modal when you click outside modal */}
            <button onClick={handleDemoLogin} >Demo Login</button> 
        </form>
    ) : null;
}



export default LoginFormPage