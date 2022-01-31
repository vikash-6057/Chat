import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import "./Message.css"
function Messages({ messages, name }) {
    return (
        <ScrollToBottom>
        <div className='message-box'>
            {
                messages.map((message, index) => <div key={index}>
                    <Message message={message} name={name} />
                </div>
                )
            }
            </div>
        </ScrollToBottom>

    );
};
export default Messages;