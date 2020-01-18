import React from 'react';
import logo from '../logo.png';
// import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/actions/login';

// const socket = socketIOClient('http://localhost:4200');

const Header = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.login);

    const disconnect = () => {
        // socket.disconnect();
        dispatch(setLogin(null));
    };

    return (
        <header className='App-header'>
            <img src={logo} className='App-logo' alt='logotype' />
            <div>
                <span className='App-name'>SuchChat<span className="trademark">&reg;</span></span>
                <span className='App-tagline'>- "Much communicate. Very talk. Wow."</span>
            </div>
            {loggedIn !== null ? <button id="disconnect-button" className="button" onClick={disconnect}>Disconnect</button> : null}
        </header>
    )
};

export default Header;