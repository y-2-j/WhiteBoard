const express = require('express');
const path = require('path');
const http=require('http');
const socketio=require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public_static") ));

io.on('connection', (socket)=>{
    console.log("New client " + socket.id + " connected!");
    
    socket.on('login', (data)=>{

    });

    socket.on('clearScreen', ()=>{
        console.log("Received clear screen req from " + socket.id);
        socket.broadcast.emit('clearScreen');
    });

    socket.on('changePen', (data)=>{
        console.log("Received change pen req from " + socket.id);
        socket.broadcast.emit('changePen', data);
    });

    socket.on('changeColor', (data)=>{
        console.log("Received change color req from " + socket.id);
        socket.broadcast.emit('changeColor', data);
    });

    socket.on('changeSize', (data)=>{
        console.log("Received change size req from " + socket.id);
        socket.broadcast.emit('changeSize', data);
    });

    socket.on('stroke', (data)=>{
        console.log("Received stroke req from " + socket.id);
        socket.broadcast.emit('stroke', data);
    })
    socket.on('disconnect', ()=>{
        console.log("Client " + socket.id + " disconnected");
    })
});

server.listen(2700, ()=>{
    console.log("Server successfully started at http://localhost:2700");    
});