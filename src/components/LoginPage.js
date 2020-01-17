import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/actions/login';


const Login = () => {
    const dispatch = useDispatch();

    const updateLogin = (resStatus) => {
        console.log(resStatus);
        const usernameInput = document.querySelector('#login-form-input').value;
        if (resStatus === 200) {
            console.log('yikes');
        } else {
            dispatch(setLogin(usernameInput));
        }
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