import React from 'react';
// import { BrowserRouter } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Chat from './components/ChatPage';
import Login from './components/LoginPage';
import { useSelector } from 'react-redux';


function App() {
  const loggedIn = useSelector(state => state.login);
  console.log(loggedIn);

  return (
      <div className="App">
        <Header />
        <section className="App-main">
          <Login />
        </section>
      </div>
  );
}

export default App;
