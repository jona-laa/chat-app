import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:4200');

const Chat = () => {
    useEffect(() => {
        const username = prompt('What is your name?');
        appendChatMessage(`Welcome, ${username}!`);
        socket.emit('connecting-user', username);
    })
    
    socket.on('user-connected', username => {
        appendChatMessage(`${username} connected.`);
    })

    socket.on('user-disconnected', username => {
        appendChatMessage(`${username} disconnected.`);
    })
    
    socket.on('chat-message', data => {
        appendChatMessage(`${data.name}: ${data.message}`, 'remote-client');
    })
    
    const preventReload = e => {
        e.preventDefault();
    }
    
    const emptyMessageInput = () => {
        document.querySelector('#chat-input').value = '';
    }
    
    const appendChatMessage = (message, className) => {
        const messageEl = document.createElement('span');
        messageEl.className = `chat-message ${className}`;
        messageEl.innerText = message;
        document.querySelector('#chat-board').append(messageEl);
    }
    
    const sendMessage = (msg) => {
        const message = document.querySelector('#chat-input').value;
        appendChatMessage(`Me: ${message}`, 'local-client');
        socket.emit('send-message', message);
        emptyMessageInput();
    }

    return (
        <div className="chat-container">
            <div id="chat-board">
            </div>
            <form id="chat-form" onSubmit={preventReload}>
                <button type="submit" id="chat-send-button" onClick={sendMessage}>Send</button>
                <span><input type="text" id="chat-input" placeholder="write a message" /></span>
            </form>
        </div>
    )
}

export default Chat;