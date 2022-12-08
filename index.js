const mongoose = require('mongoose');
require('./config/db'); 


const express = require('express');
const router = require('./routes/index');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});

const session = require('express-session');
const MongoStore = require('connect-mongo');
// enable bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// enable handlebars

app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        helpers:require('./helpers/handlebars')
   
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


app.use('/',router());

app.listen(process.env.PORT,() => console.log('im alive'));