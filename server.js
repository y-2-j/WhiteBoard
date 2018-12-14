const express = require('express');
const path = require('path');
const http=require('http');
const socketio=require('socket.io');

const CONFIG = require("./config");

// To generate Random room numbers
const randomIdGen = require('random-id-generator');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public_static") ));

app.get("/createRoom", (req, res)=>{
    const roomId = randomIdGen(10);
    console.log("Created a room "+ roomId);
    res.send(roomId);
});

io.on('connection', (socket)=>{
    console.log("New client " + socket.id + " connected!");

    socket.on('joinRoom', (data)=>{
        socket.join(data.room);
        io.to(data.room).emit('newUser', {username: data.username});
    })

    socket.on('clearScreen', (data)=>{
        //console.log("Received clear screen req from " + socket.id);
        //socket.broadcast.emit('clearScreen');
        io.to(data.room).emit('clearScreen');
    });

    socket.on('changeColor', (data)=>{
        //console.log("Received change color req from " + socket.id);
        // socket.broadcast.emit('changeColor', data.color);
        io.to(data.room).emit('changeColor', data);
    });

    socket.on('changeSize', (data)=>{
        //console.log("Received change size req from " + socket.id);
        // socket.broadcast.emit('changeSize', data.size);
        io.to(data.room).emit('changeSize', data);
    });

    socket.on('stroke', (data)=>{
        // console.log("Received stroke req from " + socket.id);
        // socket.broadcast.emit('stroke', data.stroke);
        io.to(data.room).emit('stroke', data);
    })
    socket.on('disconnect', (data)=>{
        console.log("Client " + socket.id + " disconnected");
        io.to(data.room).emit('userLeft');
    })
});

server.listen(CONFIG.SERVER.PORT, () => {
    console.log(`Server started at http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}`);
});