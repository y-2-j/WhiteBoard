let username, socket, room, newUserDiv;
$(()=>{
    const canvas=$('#canvas');
    username = localStorage.getItem('username');
    room = localStorage.getItem('room');
    console.log("Room : "+ room + " Username : " +username);
    if(username === null){
        window.location = "/";
    }
    const linkSpan = $("#link");
    linkSpan.text(room);

    newUserDiv = $("#newUserDiv");

    // Joining Room
    socket.emit('joinRoom', {room, username})
});
if(username !== null)
    socket =io();
socket.on('stroke', (data)=>{
    line(data.x, data.y, data.px, data.py);
});
socket.on('changeSize', (data)=>{
    strokeWeight(data.size);
});
socket.on('changeColor',(data)=>{
    stroke(data.r, data.g, data.b);
});
socket.on('clearScreen', ()=>{
    fill(255);
    rect(0,0,2000,2000);
});

socket.on('newUser', (data)=>{
    newUserDiv.show();
    newUserDiv.text(data.username + " joined!");
    setTimeout(()=>{newUserDiv.hide()}, 2000);
});

socket.on('userLeft', (data)=>{
    newUserDiv.show();
    newUserDiv.text(data.username + " left!");
    setTimeout(()=>{newUserDiv.hide()}, 2000);        
});

function setup(){
    const myCanvas = createCanvas(1200,600);
    myCanvas.parent('canvas');
    myCanvas.position(60,140);
    console.log(myCanvas);
    background(255);
    stroke(0);
    // drawingContext.shadowOffsetX = 0;
    // drawingContext.shadowOffsety = 0;
    // drawingContext.shadowBlur = 10;
    // drawingContext.shadowColor = "black";
    frameRate(30);
    size1btn = createButton('+');
    size1btn.position(myCanvas.x+10, myCanvas.y+20);
    size1btn.mousePressed(()=>{
        strokeWeight(2);
        socket.emit('changeSize', {size: 2, room});
    });
    size2btn = createButton('++');
    size2btn.position(myCanvas.x+10, myCanvas.y+50);
    size2btn.mousePressed(()=>{
        strokeWeight(4);
        socket.emit('changeSize', {size: 4, room});
    });
    size3btn = createButton('+++');
    size3btn.position(myCanvas.x+10, myCanvas.y+80);
    size3btn.mousePressed(()=>{
        strokeWeight(10);
        socket.emit('changeSize', {size: 10, room});
    });
    size4btn = createButton('++++');
    size4btn.position(myCanvas.x+10, myCanvas.y+110);
    size4btn.mousePressed(()=>{
        strokeWeight(15);
        socket.emit('changeSize', {size: 15, room});
    });
    eraser = createButton('Eraser');
    eraser.position(myCanvas.x+10, myCanvas.y+140);
    eraser.mousePressed(()=>{
        stroke(255);
        socket.emit('changeColor', {r: 255, g:255, b:255, room});
    });
    black = createButton('Black Ink');
    black.position(myCanvas.x+10, myCanvas.y+170);
    black.mousePressed(()=>{
        stroke(0);
        socket.emit('changeColor', {r: 0, g:0, b:0, room});
    });  
    red = createButton('Red Ink');
    red.position(myCanvas.x+10, myCanvas.y+200);
    red.mousePressed(()=>{
        stroke(255,0,0);
        socket.emit('changeColor', {r: 255, g:0, b:0, room});
    });
    green = createButton('Green Ink');
    green.position(myCanvas.x+10, myCanvas.y+230);
    green.mousePressed(()=>{
        stroke(0,255,0);
        socket.emit('changeColor', {r: 0, g:255, b:0, room});
    });
    blue = createButton('Blue Ink');
    blue.position(myCanvas.x+10, myCanvas.y+260);
    blue.mousePressed(()=>{
        stroke(0,0,255);
        socket.emit('changeColor', {r:0 , g:0 , b:255, room});
    });
    clearScreen = createButton('Erase all');
    clearScreen.position(myCanvas.x+1080, myCanvas.y+10);
    clearScreen.mousePressed(()=>{
        fill(255);
        rect(0,0,2000,2000);
        socket.emit('clearScreen', {room});
    });
};
function draw(){
    if(mouseIsPressed){
        line(mouseX, mouseY, pmouseX, pmouseY);
        socket.emit('stroke', {x: mouseX, y:mouseY, px: pmouseX, py: pmouseY, room});
    }
}