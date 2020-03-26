import React from 'react'
import { SendButton } from '../SendButton/SendButton';
import { ChatInput } from '../ChatInput/ChatInput';

export const ChatForm = ({ preventReload, sendMessage }) => {
    return (
        <form id="chat-form" onSubmit={preventReload}>
            <SendButton sendMessage={sendMessage} />
            <ChatInput />
        </form>
    )
}
