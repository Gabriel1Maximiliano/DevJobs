const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});


mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true});
mongoose.connection.on('error',(error) => console.log(error));
require('../models/Vacantes');