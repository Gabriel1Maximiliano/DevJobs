const express = require('express');

const app = express();

app.use('/', (req,res)=>{
 res.send('i am working') 
});

app.listen(5000);