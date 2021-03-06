import React from 'react';
import logo from '../../logo.png';
import './Header.css';

export const Header: React.FC = (): JSX.Element => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logotype" />
      <div>
        <span className="App-name">
          SuchChat<span className="trademark">&reg;</span>
        </span>
        <span className="App-tagline">
          - "Much communicate. Very talk. Wow."
        </span>
      </div>
    </header>
  );
};
