const express = require('express');
const miio = require('miio');


const router = express.Router();

let device = createDevice();

initDevice();

router.get('/health',(req,res)=>{
    
    device.find()
    .then(()=>{
        res.end();
    })
            
})


router.get('/start', (req,res)=>{
    
        device.start()
        .then(()=>{
            res.end();
        })
})

router.get('/stop', (req,res)=>{
    
        device.stop()
        .then(()=>{
            res.end();
        })
})

router.get('/dock', (req,res)=>{
    
        device.charge()
        .then(()=>{
            res.end();
        })
})

function createDevice(){
    const device = miio.createDevice({
        address: '192.168.0.113',
        token: '41556e664a53794b674d66576d69424f',
        model: 'rockrobo.vacuum.v1'
    });
    return device;
}

function initDevice(){
    return new Promise((resolve, reject)=>{
        device.init()
            .then(()=>{
                console.log('connected')
                resolve()
            })
            .catch(err=>{
                console.log('cannot conencte',err);
                return initDevice()
            })  
    })
    
}


module.exports = router;