import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/actions/login';
import './LoginPage.css';

export const Login = () => {
    const dispatch = useDispatch();
    
    const updateLogin = (resStatus, resMsg) => {
        const usernameInput = document.querySelector('#login-form-input');
        if (resStatus === 200) {
            dispatch(setLogin(usernameInput.value));
        } else {
            usernameInput.value = '';
            usernameInput.placeholder = resMsg.msg;
        }
    }

    const fetchUser = async () => {
        const usernameInput = document.querySelector('#login-form-input');

        await fetch(`http://localhost:4200/users/${usernameInput.value}`)
            .then(res => res)
            .then(async res => updateLogin(res.status, await res.json()))
            .catch(err => console.log(err));
    }

    const preventReload = e => {
        e.preventDefault();
    }

    return (
        <div className="login-container">
            <form id="login-form" onSubmit={preventReload}>
                <input type="text" id="login-form-input" className="text-input" placeholder="Username"></input>
                <button type="submit" className="button" id="login-form-submit" onClick={fetchUser}>Connect</button>
            </form>
        </div>
    )
}
