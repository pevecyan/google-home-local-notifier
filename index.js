const express = require('express');

const config = require('./config');

const app = express();

app.get('/health',(req,res)=>{
    res.send('OK');
})

app.get('notify/:text', (req,res)=>{

})


app.listen(config.port,()=>{
    console.log('Google home Notifier started on port '+config.port);
})