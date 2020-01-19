import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/actions/login';

const socket = socketIOClient('http://localhost:4200');

const Chat = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.login);

    useEffect(() => {
        createMessage(`Welcome, ${loggedIn}!`);
        socket.connect();
        socket.emit('connecting-user', loggedIn);
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

    const disconnect = () => {
        // socket.disconnect();
        dispatch(setLogin(null));
    };

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
        if (document.querySelector('#chat-board')){
            document.querySelector('#chat-board').append(message);
            autoScrollWindow();
        } 
    }

    const sendMessage = (msg) => {
        const message = document.querySelector('#chat-input').value;
        if (message !== '') {
            createMessage(`Me: ${message}`, 'local-client');
            socket.emit('send-message', message);
            emptyMessageInput();
        }
    }

    return (
        <div className="chat-container">
            <div id="chat-board">
            </div>
            <form id="chat-form" onSubmit={preventReload}>
                <button type="submit" className="button" id="chat-send-button" onClick={sendMessage}>Send</button>
                <span><input type="text" className="text-input" id="chat-input" placeholder="write a message" autoFocus /></span>
            </form>
            <button id="disconnect-button" className="button" onClick={disconnect}>Disconnect</button>
        </div>
    )
}

export default Chat;