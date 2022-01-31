import React from 'react';
import "./Input.css"
function Input({handleSendMessage, sendMessage,message,name}) {

    return (
        <div className='chat-box'>
            <h1>Chat</h1>
            <input
                value={message}
                onChange={handleSendMessage}
            />
            <div className='name-msg'>

            <h5>{name}</h5>
            <h5>{message}</h5>
            <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    )
};
export default Input;
