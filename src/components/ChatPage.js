import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3030');

const Chat = () => {
    useEffect(() => {
        appendChatMessage('You connected.');
        socket.emit('user-connected', 'Another user connected');
    })
    
    socket.on('connected', data => {
        appendChatMessage(data);
    })
    
    socket.on('chat-message', data => {
        appendChatMessage(data);
    })
    
    
    const preventReload = e => {
        e.preventDefault();
    }
    
    const emptyMessageInput = () => {
        document.querySelector('#chat-input').value = '';
    }
    
    const appendChatMessage = (message) => {
        const messageEl = document.createElement('span');
        messageEl.className = 'chat-message';
        messageEl.innerText = message;
        document.querySelector('#chat-board').append(messageEl);
    }
    
    const sendMessage = (msg) => {
        const message = document.querySelector('#chat-input').value;
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