const express = require('express');
// const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { callbackify } = require('util');
const PORT = process.env.PORT || 5000;
const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join', ({ name, room }) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        // if (error)
        //     return callback(error);

        // these are messages by asmin
        // this will notify user that he has joined the room
        socket.emit('message', { user: 'admin', "text": `Welcome ${user.name} to the room ${user.room}` });
        // this will notify all the users in the room that a new user has joined
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name},has joined` });
        socket.join(user.room);
        // callback();
        console.log(name, room);
    });
    // message from user
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        // broadcast to all members of the room
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
        }
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is started on ${PORT}`));
