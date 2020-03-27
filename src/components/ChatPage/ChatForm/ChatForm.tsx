import React from 'react';
import { SendButton } from '../SendButton/SendButton';
import { ChatInput } from '../ChatInput/ChatInput';

export const ChatForm: React.FC<ChatFormProps> = ({
  preventReload,
  sendMessage
}): JSX.Element => {
  return (
    <form id="chat-form" onSubmit={preventReload}>
      <SendButton sendMessage={sendMessage} />
      <ChatInput />
    </form>
  );
};
