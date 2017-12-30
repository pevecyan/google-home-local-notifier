const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/health', (req,res)=>{
    res.end('OK');
})

router.get('/devices', (req,res)=>{
    request.get('http://192.168.0.199:1081/devices',{},(err,response, body)=>{
        if(!err && response.statusCode == 200){
            res.end(body);
        }else{
            res.end('[]');
        }
    })
})

router.get('/devices/:device/:command', (req,res)=>{
    let {device, command} = req.params;
    request.get('http://192.168.0.199:1081/devices/'+device+'/'+command,{},(err,response, body)=>{
        if(!err && response.statusCode == 200){
            res.end(body);
        }else{
            res.end('');
        }
    })
})

module.exports = router;