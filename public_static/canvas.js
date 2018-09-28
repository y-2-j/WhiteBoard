$(()=>{
    const canvas=$('#canvas');
    const username = localStorage.getItem('username');
    const link = localStorage.getItem('link');
    const linkSpan = $("#link");
    linkSpan.text(link);
});
const socket =io();
socket.on('stroke', (data)=>{
    line(data.x, data.y, data.px, data.py);
});
socket.on('changeSize', (data)=>{
    strokeWeight(data);
});
socket.on('changeColor',(data)=>{
    stroke(data.r, data.g, data.b);
});
socket.on('clearScreen', ()=>{
    fill(255);
    ellipse(450,260,1400,1000);
});
function setup(){
    const myCanvas = createCanvas(900,520);
    myCanvas.parent('canvas');
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
        socket.emit('changeSize', 2);
    });
    size2btn = createButton('++');
    size2btn.position(10, 50);
    size2btn.mousePressed(()=>{
        strokeWeight(4);
        socket.emit('changeSize', 4);
    });
    size3btn = createButton('+++');
    size3btn.position(10, 80);
    size3btn.mousePressed(()=>{
        strokeWeight(10);
        socket.emit('changeSize', 10);
    });
    size4btn = createButton('++++');
    size4btn.position(10, 110);
    size4btn.mousePressed(()=>{
        strokeWeight(15);
        socket.emit('changeSize', 15);
    });
    eraser = createButton('Eraser');
    eraser.position(10, 140);
    eraser.mousePressed(()=>{
        stroke(255);
        socket.emit('changeColor', {r: 255, g:255, b:255});
    });
    black = createButton('Black Ink');
    black.position(10, 170);
    black.mousePressed(()=>{
        stroke(0);
        socket.emit('changeColor', {r: 0, g:0, b:0});
    });  
    red = createButton('Red Ink');
    red.position(10, 200);
    red.mousePressed(()=>{
        stroke(255,0,0);
        socket.emit('changeColor', {r: 255, g:0, b:0});
    });
    green = createButton('Green Ink');
    green.position(10, 230);
    green.mousePressed(()=>{
        stroke(0,255,0);
        socket.emit('changeColor', {r: 0, g:255, b:0});
    });
    blue = createButton('Blue Ink');
    blue.position(10, 260);
    blue.mousePressed(()=>{
        stroke(0,0,255);
        socket.emit('changeColor', {r:0 , g:0 , b:255 });
    });
    clearScreen = createButton('Erase all');
    clearScreen.position(880, 10);
    clearScreen.mousePressed(()=>{
        fill(255);
        ellipse(450,260,1400,1000);
        socket.emit('clearScreen');
    });
};
function draw(){
    if(mouseIsPressed){
        line(mouseX, mouseY, pmouseX, pmouseY);
        socket.emit('stroke', {x: mouseX, y:mouseY, px: pmouseX, py: pmouseY});
    }
}