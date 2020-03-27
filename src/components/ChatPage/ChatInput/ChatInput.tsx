import React, { useEffect } from 'react';
import './ChatInput.css';

export const ChatInput = () => {
  const inputElement = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  return (
    <span>
      <input
        className="text-input"
        id="chat-input"
        placeholder="write a message"
        ref={inputElement}
        type="text"
      />
    </span>
  );
};
