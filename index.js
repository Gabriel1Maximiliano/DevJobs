const mongoose = require('mongoose');
require('./config/db'); 

const express = require('express');
const exphbs = require('express-handlebars');

const router = require('./routes/index');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config({path:'variables.env'});

const session = require('express-session');
const MongoStore = require('connect-mongo');



// enable handlebars as view
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        helpers:require('./helpers/handlenbars')
        
    })
); 

 app.set('view engine', 'handlebars');

 // static files
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.use(session({
    secret:process.env.SECTRET,
    key:process.env.KEY,
    resave: false,
    saveUninitialized:false,
     store: new MongoStore({ mongoUrl: process.env.DATABASE }),

}))
app.use('/', router());
 
 

app.listen(process.env.PORT);