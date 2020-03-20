import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/actions/login';
import { connectedSFX, messageSFX } from '../../sounds/chatSFX';
import './Chat.css';

const socket = socketIOClient('http://localhost:4200/');

const Chat = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.login);

  useEffect(() => {
    createMessage(`Welcome, ${loggedIn}!`);
    socket.connect();
    socket.emit('connecting-user', loggedIn);
  });

  socket.on('user-connected', (username: string) => {
    createMessage(`${username} connected.`);
    connectedSFX.play();
  });

  socket.on('user-disconnected', (username: string) => {
    createMessage(`${username} disconnected.`);
  });

  socket.on('chat-message', (data: ChatMessage) => {
    createMessage(`${data.name}: ${data.message}`, 'remote-client');
    messageSFX.play();
  });

  const disconnect = () => {
    socket.removeAllListeners();
    socket.close();
    dispatch(setLogin(null));
  };

  const preventReload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const emptyMessageInput = () => {
    let elem = document.querySelector('#chat-input');
    if (elem instanceof HTMLInputElement) {
      elem.value = '';
    } else {
      throw new Error('element #test not in document');
    }
  };

  const autoScrollWindow = () => {
    const chatBoard = document.querySelector('#chat-board');
    if (chatBoard instanceof HTMLDivElement) {
      chatBoard.scrollTop = chatBoard.scrollHeight - chatBoard.offsetHeight;

      if (chatBoard.scrollTop - chatBoard.scrollTop <= chatBoard.offsetHeight) {
        chatBoard.scrollTop = chatBoard.scrollHeight;
      }
    }
  };

  const createMessage = (message: any, className?: string) => {
    const messageEl = document.createElement('span');
    messageEl.className = `chat-message ${className}`;
    messageEl.innerText = message;
    appendChatMessage(messageEl);
  };

  const appendChatMessage = (message: any) => {
    if (document.querySelector('#chat-board')) {
      document.querySelector('#chat-board').append(message);
      autoScrollWindow();
    }
  };

  const sendMessage = () => {
    const message = document.querySelector('#chat-input');
    if (message instanceof HTMLInputElement) {
      if (message.value !== '') {
        createMessage(`Me: ${message.value}`, 'local-client');
        socket.emit('send-message', message.value);
        emptyMessageInput();
      }
    } else {
      throw new Error('element #test not in document');
    }
  };

  return (
    <div className="chat-container">
      <div id="chat-board"></div>
      <form id="chat-form" onSubmit={preventReload}>
        <button
          type="submit"
          className="button"
          id="chat-send-button"
          onClick={sendMessage}
        >
          Send
        </button>
        <span>
          <input
            type="text"
            className="text-input"
            id="chat-input"
            placeholder="write a message"
            autoFocus
          />
        </span>
      </form>
      <button id="disconnect-button" className="button" onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
};

export default Chat;
