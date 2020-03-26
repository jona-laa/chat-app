import React from 'react'
import './ChatInput.css'

export const ChatInput = () => {
    return (
        <span>
            <input
                type="text"
                className="text-input"
                id="chat-input"
                placeholder="write a message"
                autoFocus
            />
        </span>
    )
}
