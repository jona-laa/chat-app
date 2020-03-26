import React from 'react'
import './SendButton.css'

export const SendButton = ({ sendMessage }) => {
    return (
        <button
            type="submit"
            className="button"
            id="chat-send-button"
            onClick={sendMessage}
        >
            Send
        </button>
    )
}
