const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const rsa = require('./rsa');
const crypt = new rsa();

app.use('/', (req, res) => {
    res.send("Hola Muundo");
});

let curr_id = 1;
let user_id = 1;
let clients = {};

io.on("connection", socket => {
    console.log("Client with IP ", socket.handshake.address, " has connected");
    clients[socket.id] = {};

    socket.on('setName', name => {
        socket.name = name;
    });
    
    socket.on('setKey', key => {
        clients[socket.id] = key;
    });

    socket.on('joinRoom', room => {
        if (!socket.name){
            socket.emit('no-name');
            return;
        }
        let welcome_message = {
            id: 1,
            text: crypt.encrypt(`Welcome to chat room ${room} ${socket.name}`, clients[socket.id].n, clients[socket.id].e),
            nickname: 'Chatbot administrator'
        }
        socket.uid = user_id;
        socket.emit('set-uid', user_id++);
        socket.emit('set-key', crypt.publicKey);
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
        } else {
            const decrypted = crypt.decrypt(data.text);
            const room_clients = io.sockets.adapter.rooms[socket.room].sockets;

            for (let client in room_clients) {
                const client_socket = io.sockets.connected[client];
                console.log(clients[client]);
                client_socket.emit('message', {
                    text: crypt.encrypt(decrypted, clients[client].n, clients[client].e), 
                    id: curr_id, 
                    uid: socket.uid,
                    nickname: socket.name
                });
            }
        }
    });

    socket.on('disconnect', () => {
        delete clients[socket.id];
        console.log("Client ", socket.handshake.address, " has disconnected");
    });
});

server.listen(3001);