import React from 'react';
import logo from '../logo.png';

const Header =  () => {
    return (
        <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logotype' />
                    <span className='App-name'>SuchChat</span>
                    <span className='App-tagline'>- "Much communicate. Very talk. Wow."</span>
        </header>
    )
};

export default Header;