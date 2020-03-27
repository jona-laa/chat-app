import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import { connectedSFX, messageSFX } from '../../sounds/chatSFX';
import { LogoutButton } from '../Header/LogoutButton/LogoutButton';
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

  const sendMessage = (): void => {
    const input: HTMLInputElement = document.querySelector('#chat-input');
    if (input.value !== '') {
      createMessage(`Me: ${input.value}`, 'local-client');
      socket.emit('send-message', input.value);
      emptyMessageInput(input);
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

  const emptyMessageInput = (e: HTMLInputElement): void => {
    e.value = '';
  };

  const autoScrollWindow = (): void => {
    const chatBoard: HTMLDivElement = document.querySelector('#chat-board');
    chatBoard.scrollTop = chatBoard.scrollHeight - chatBoard.offsetHeight;
    if (chatBoard.scrollTop - chatBoard.scrollTop <= chatBoard.offsetHeight) {
      chatBoard.scrollTop = chatBoard.scrollHeight;
    }
  };

  const ChatFormProps: ChatFormProps = {
    preventReload,
    sendMessage
  };

  return (
    <div className="chat-container">
      <div id="chat-board"></div>
      <ChatForm {...ChatFormProps} />
      <LogoutButton socket={socket} />
    </div>
  );
};
