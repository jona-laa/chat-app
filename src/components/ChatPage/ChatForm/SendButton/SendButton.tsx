import React from 'react';
import './SendButton.css';

export const SendButton: React.FC<Partial<ChatFormProps>> = ({
  sendMessage
}): JSX.Element => {
  const buttonElement = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      type="submit"
      className="button"
      id="chat-send-button"
      onClick={sendMessage}
      ref={buttonElement}
    >
      Send
    </button>
  );
};
