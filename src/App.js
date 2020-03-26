import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Chat } from './components/ChatPage/ChatPage.tsx';
import  { Login } from './components/LoginPage/LoginPage';
import { useSelector } from 'react-redux';

const App = () => {
  const loggedIn = useSelector(state => state.login);
  return (
    <div className="App">
      <Header />
      <section className="App-main">
        {loggedIn !== null ? <Chat /> : <Login />}
      </section>
    </div>
  );
};

export default App;
