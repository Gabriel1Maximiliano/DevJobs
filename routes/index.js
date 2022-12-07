const express = require('express');

const router = express.Router();

module.exports = () =>{
    router.use('/', (req,res)=>{
        res.send('i am working') 
       });

       return router;
}