import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3030');

socket.on('user-connected', data => {
  console.log(data);
})

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
