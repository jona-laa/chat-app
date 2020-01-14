import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:3030');

socket.on('user-connected', data => {
  console.log(data);
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
