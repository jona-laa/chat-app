import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Chat from './components/ChatPage'

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
