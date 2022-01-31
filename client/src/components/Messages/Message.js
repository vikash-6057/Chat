import React from 'react';
import './Message.css'
function Message({ message, name }) {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (message.user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        
        isSentByCurrentUser ?(
            <div className="message-user">
            <div className="message-username">{trimmedName} </div>
            <div className="message-content">{message.text}</div>
        </div>
        ):(
            <div className="message-admin">
            {/* <div className="message-username">{message.user} </div> */}
            <div className="message-content">{message.text}</div>
        </div>
        )
        
    );

}
export default Message;