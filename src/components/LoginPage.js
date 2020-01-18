import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/actions/login';


const Login = () => {
    const dispatch = useDispatch();

    const updateLogin = (resStatus, resMsg) => {
        const usernameInput = document.querySelector('#login-form-input').value;
        if (resStatus === 200) {
            dispatch(setLogin(usernameInput));
        } else {
            document.querySelector('#login-form-input').value = '';
            document.querySelector('#login-form-input').placeholder = resMsg.msg;
        }
    }

    const fetchUser = async () => {
        const usernameInput = document.querySelector('#login-form-input').value;
        
        await fetch(`http://localhost:4200/users/${usernameInput}`)
            .then(res => res)
            .then(async res => updateLogin(res.status, await res.json()));
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

export default Login;