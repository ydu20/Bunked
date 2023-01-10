import {useRef, useEffect, useState } from 'react';
import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './Register';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';


function Login() {

    let [login, setLogin] = useState(true);

    let [loginEmail, setLoginEmail] = useState("");

    let [loginPassword, setLoginPassword] = useState("");

    let [emailError, setEmailError] = useState('');

    let [passwordError, setPasswordError] = useState('');

    let [serverError, setServerError] = useState('');

    const emailRef = useRef();
    const navigate = useNavigate();

    const validEmailRegex = RegExp(
        /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    );


    useEffect(() => {
        emailRef.current.focus();
    }, []);

    var handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        if (name === 'email') {
            setLoginEmail(value);
            if (validEmailRegex.test(value)) {
                setEmailError('');
            } else {
                setEmailError('Email is not valid!');
            }
        } else {
            setLoginPassword(value);
            if (value.length === 0) {
                setPasswordError("Password can't be empty!");
            } else {
                setPasswordError('');
            }
        };
    }

    var handleLogin = async (event) => {
        event.preventDefault();
        if (emailError.length === 0 && passwordError.length === 0
            && loginEmail.length !== 0 && loginPassword.length !== 0) {
            var params = {
                email: loginEmail,
                password: loginPassword,
            };
            axios.post('/login', params).then((res) => {
                console.log(res.data);
                Cookies.set('email', res.data.email, {expires: 3});
                navigate('/home');
            }).catch((error) => {
                setServerError(error.response.data);
            });
        }
    }


    return (
        <div className = "login-box-wrapper">
            <h1>
                {login ? "Log in" : "Sign up"}
            </h1>
            {login ? (
                <div>
                    <form className = "login-register-form" onSubmit = {handleLogin}>
                        <div className = "input-name">
                            Email
                        </div>
                        <input
                            className={"login-register-input form-control " 
                                + (emailError.length > 0 ? "is-invalid":"")}
                            id="login-email-input"
                            name = "email"
                            ref={emailRef}
                            type="text"
                            placeholder="Enter your email address"
                            onChange={handleChange}
                            value={loginEmail}
                        />

                        {emailError.length > 0 &&
                            <span className = 'input-error'>{emailError}</span>
                        }
                        <div className = "input-name" style = {{marginTop: '20px'}}>
                            Password
                        </div>
                        <input
                            className = {"login-register-input form-control "
                                + (passwordError.length > 0 ? "is-invalid":"")}
                            id = "login-password-input"
                            name = "password"
                            type = "password"
                            placeholder = "Enter your password"
                            onChange = {handleChange}
                            value = {loginPassword}
                        />

                        {passwordError.length > 0 &&
                            <span className = 'input-error'>{passwordError}</span>
                        }

                        {serverError.length > 0 && 
                            <div className = 'server-error-box'>
                                {serverError}
                            </div>
                        }

                        <button type="submit" className="submit-button btn btn-primary">Login</button>

                    </form>

                    <div className = "toggle-btn-wrapper">
                        <div className = "toggle-btn" onClick = {() => setLogin(!login)}>Register</div>
                    </div>
                    
                </div>
            ): (
                <Register login = {login} setLogin = {setLogin}/>
            )}
        </div>
    )
}

export default Login;