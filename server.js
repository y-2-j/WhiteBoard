const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "public_static") ));

app.listen(2700, ()=>{
    console.log("Server successfully started at http://localhost/2700");    
});