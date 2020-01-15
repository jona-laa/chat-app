import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Chat from './components/ChatPage'
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3030');

socket.on('user-connected', data => {
  console.log(data);
})

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <section className="App-main">
          <Chat />
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
