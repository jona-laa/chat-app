import React from 'react';


const Login = () => {

    const fetchUser = () => {
        const usernameInput = document.querySelector('#login-form-input').value;
        fetch(`http://localhost:4200/users/${usernameInput}`)
            .then(res => console.log(res.status));
    }

    const preventReload = e => {
        e.preventDefault();
    }

    return (
        <form id="login-form" onSubmit={preventReload}>
            <input type="text" id="login-form-input"></input>
            <button type="submit" id="login-form-submit" onClick={fetchUser}>Log in</button>
        </form>
    )
}

export default Login;