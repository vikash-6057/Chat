import React, { useDebugValue, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    let navigate = useNavigate();
    const handleNameChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        console.log(name);
    }
    const handleRoomChange = (event) => {
        event.preventDefault();
        setRoom(event.target.value);
        console.log(room);
    }
    const handleClick = (event) => {
        event.preventDefault();
        if (!room || !name) {
            alert('Please enter a name and room');
            return;
        }
        else {
            navigate(`/chat?name=${name}&room=${room}`);
        }
    }
    return (
        <div className='outer'>
            <div className='inner'>
                <h1>Join</h1>
                <div> <input placeholder='Name' onChange={handleNameChange} value={name} /> </div>
                <div> <input placeholder='Room' onChange={handleRoomChange} value={room} /> </div>
                <button onClick={handleClick} type='submit'>Sign In</button>
            </div>
        </div>
    )
};
export default Join;