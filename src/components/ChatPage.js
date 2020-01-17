import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:4200');

const Chat = () => {
    useEffect(() => {
        const username = prompt('What is your name?');
        createMessage(`Welcome, ${username}!`);
        socket.emit('connecting-user', username);
    })

    socket.on('user-connected', username => {
        createMessage(`${username} connected.`);
    })

    socket.on('user-disconnected', username => {
        createMessage(`${username} disconnected.`);
    })

    socket.on('chat-message', data => {
        createMessage(`${data.name}: ${data.message}`, 'remote-client');
    })

    const preventReload = e => {
        e.preventDefault();
    }

    const emptyMessageInput = () => {
        document.querySelector('#chat-input').value = '';
    }

    const autoScrollWindow = () => {
        const chatBoard = document.querySelector('#chat-board');
        chatBoard.maxScrollTop = chatBoard.scrollHeight - chatBoard.offsetHeight;

        if (chatBoard.maxScrollTop - chatBoard.scrollTop <= chatBoard.offsetHeight) {
            chatBoard.scrollTop = chatBoard.scrollHeight;
        }
    };

    const createMessage = (message, className) => {
        const messageEl = document.createElement('span');
        messageEl.className = `chat-message ${className}`;
        messageEl.innerText = message;
        appendChatMessage(messageEl);
    }

    const appendChatMessage = (message) => {
        document.querySelector('#chat-board').append(message);
        autoScrollWindow();
    }

    const sendMessage = (msg) => {
        const message = document.querySelector('#chat-input').value;
        createMessage(`Me: ${message}`, 'local-client');
        socket.emit('send-message', message);
        emptyMessageInput();
    }

    return (
        <div className="chat-container">
            <div id="chat-board">
            </div>
            <form id="chat-form" onSubmit={preventReload}>
                <button type="submit" id="chat-send-button" onClick={sendMessage}>Send</button>
                <span><input type="text" id="chat-input" placeholder="write a message" autoFocus /></span>
            </form>
        </div>
    )
}

export default Chat;