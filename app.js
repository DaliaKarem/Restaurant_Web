const express = require('express');
const app=express();
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));
app.use('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,'start.html'));
})

app.use((req,res)=>{
    res.status(404);
    res.send('<h1>404 Not Found</h1>');
})
app.listen(8000,()=>{
    console.log('server is running on 8000');
})