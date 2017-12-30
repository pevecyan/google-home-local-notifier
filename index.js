const express = require('express');
const googleHome = require('google-home-notifier');
const exec = require('child_process').exec;

const config = require('./config');
const vacuum = require('./vacuum');
const sonoff = require('./sonoff');

const app = express();

const googleHomeIp = "192.168.0.103";
googleHome.ip(googleHomeIp, 'us');

exec('./assh', (err,out,outerr)=>{
    console.log(err);
    console.log(out);
    console.log(outerr);
})

app.use('/vacuum', vacuum);
app.use('/sonoff', sonoff);

app.get('/health',(req,res)=>{
    res.send('OK');
    googleHome.notify('Hello',(res)=>{
        console.log(res);
    })
})

app.get('/notify/:text', (req,res)=>{
    let {text} = req.params;
    googleHome.notify(text, (response)=>{
        console.log(response);
        res.send('ok');
    })
})

app.get('/play/:url', (req,res)=>{
    let {url} = req.params;
    googleHome.play(url, (response)=>{
        console.log(response);
        res.send('ok');
    })
})


app.listen(config.port,()=>{
    console.log('Google home Notifier started on port '+config.port);
})

