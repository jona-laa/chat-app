import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../redux/actions/login';


const Login = () => {
    const loggedIn = useSelector(state => state.login);
    const dispatch = useDispatch();

    const updateLogin = (resStatus) => {
        console.log(resStatus);
        resStatus === 200 ? dispatch(setLogin(!loggedIn)) : console.log('yikes');
    }

    const fetchUser = () => {
        const usernameInput = document.querySelector('#login-form-input').value;
        fetch(`http://localhost:4200/users/${usernameInput}`)
            .then(res => updateLogin(res.status));
    }



    const preventReload = e => {
        e.preventDefault();
    }

    return (
        <div className="login-container">
            <form id="login-form" onSubmit={preventReload}>
                <input type="text" id="login-form-input" placeholder="Username"></input>
                <button type="submit" id="login-form-submit" onClick={fetchUser}>Connect</button>
            </form>
        </div>
    )
}

export default Login;