const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/', (req, res) => {
    res.send("Hola Muundo");
});

let curr_id = 1;
let user_id = 1;

io.on("connection", socket => {
    console.log("Client with IP ", socket.handshake.address, " has connected");

    socket.on('setName', name => {
        socket.name = name;
    });

    socket.on('joinRoom', room => {
        if (!socket.name){
            socket.emit('no-name');
            return;
        }
        let welcome_message = {
            id: 1,
            text: `Welcome to chat room ${room} ${socket.name}`,
            nickname: 'Chatbot administrator'
        }
        socket.uid = user_id;
        socket.emit('set-uid', user_id++);
        socket.emit('message', welcome_message);
        console.log("User wants to join room ", room);
        socket.leaveAll();
        socket.join(room);
        socket.room = room;
        io.sockets.in(room).emit('notification', `${socket.name} has joined the room`);
    });

    socket.on('typing', () => {
        io.sockets.in(socket.room).emit('typing', `${socket.name} is typing`);
    });

    socket.on('send-message', (data) => {
        curr_id+=1;
        if(socket.room == null){
            socket.emit('no-name');
        }
        io.sockets.in(socket.room).emit('message', {
            ...data, 
            id: curr_id, 
            uid: socket.uid,
            nickname: socket.name
        })
    });

    socket.on('disconnect', () => {
        console.log("Client ", socket.handshake.address, " has disconnected");
    });
});

server.listen(3001);