import React from 'react';
import './App.css';
import Header from './components/Header';
import Chat from './components/ChatPage';
import Login from './components/LoginPage';
import { useSelector } from 'react-redux';

function App() {
  const loggedIn = useSelector(state => state.login);

  return (
    <div className="App">
      <Header />
      <section className="App-main">
        {loggedIn !== null ? <Chat /> : <Login />}
        {/* {loggedIn ? <Login /> : <Chat />} */}
      </section>
    </div>
  );
}

export default App;
