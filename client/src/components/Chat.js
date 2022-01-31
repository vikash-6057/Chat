import React from 'react';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import Input from './Input/Input';
import InfoBar from './InfoBar/InfoBar';
import Messages from './Messages/Messages';
let socket;
function Chat() {
    let location = useLocation();
    const ENDPOINT = 'http://localhost:5000';
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        console.log(socket);
        socket.emit('join', { name, room });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);
    // function to send messsage

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            console.log(message);
            socket.emit('sendMessage', message, () => setMessage(''));
        }
        else {
            alert('Please enter a message');
        }
    }
    const handleSendMessage = (event) => {
        event.preventDefault();
        setMessage(event.target.value);
        // socket.emit('sendMessage', message);
        console.log(message);
    }
    // console.log(message, messages);
    return (
        <div>
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input handleSendMessage={handleSendMessage} sendMessage={sendMessage} message={message} name={name}/>
        </div>

    )
}
export default Chat;