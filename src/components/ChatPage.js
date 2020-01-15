import React from 'react';

const Chat = () => {
    return (
        <div className="chat-container">
            <div id="chat-messages">
       
            </div>

            <form id="chat-form">
                <button type="submit" id="chat-send-button">Send</button>
                <span><input type="text" id="chat-input" placeholder="write a message" /></span>
            </form>

        </div>
    )
}

export default Chat;