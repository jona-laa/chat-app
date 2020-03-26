import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import { connectedSFX, messageSFX } from '../../sounds/chatSFX';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { ChatForm } from './ChatForm/ChatForm';
import './ChatPage.css';

const socket = socketIOClient('http://localhost:4200/');

export const Chat = () => {
  const loggedIn = useSelector(state => state.login);

  useEffect(() => {
    createMessage(`Welcome, ${loggedIn}!`);
    socket.connect();
    socket.emit('connecting-user', loggedIn);
  });

  socket.on('user-connected', (username: string): void => {
    createMessage(`${username} connected.`);
    connectedSFX.play();
  });

  socket.on('user-disconnected', (username: string): void => {
    createMessage(`${username} disconnected.`);
  });

  socket.on('chat-message', (data: ChatMessage): void => {
    createMessage(`${data.name}: ${data.message}`, 'remote-client');
    messageSFX.play();
  });

  const preventReload = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const emptyMessageInput = (e: HTMLInputElement): void => {
    e.value = '';
  };

  const autoScrollWindow = (): void => {
    const chatBoard = document.querySelector('#chat-board');
    if (chatBoard instanceof HTMLDivElement) {
      chatBoard.scrollTop = chatBoard.scrollHeight - chatBoard.offsetHeight;

      if (chatBoard.scrollTop - chatBoard.scrollTop <= chatBoard.offsetHeight) {
        chatBoard.scrollTop = chatBoard.scrollHeight;
      }
    }
  };

  const createMessage = (message: string, className?: string): void => {
    const msgSpanEl = document.createElement('span');
    msgSpanEl.className = `chat-message ${className}`;
    msgSpanEl.innerText = message;
    appendChatMessage(msgSpanEl);
  };

  const appendChatMessage = (message: HTMLSpanElement): void => {
    if (document.querySelector('#chat-board')) {
      document.querySelector('#chat-board').append(message);
      autoScrollWindow();
    }
  };

  const sendMessage = (): void => {
    const input = document.querySelector('#chat-input');
    if (input instanceof HTMLInputElement) {
      if (input.value !== '') {
        createMessage(`Me: ${input.value}`, 'local-client');
        socket.emit('send-message', input.value);
        emptyMessageInput(input);
      }
    } else {
      throw new Error('element #chat-input not in document');
    }
  };

  const props = {
    preventReload,
    sendMessage
  };

  return (
    <div className="chat-container">
      <div id="chat-board"></div>
      <ChatForm {...props} />
      <LogoutButton socket={socket} />
    </div>
  );
};
