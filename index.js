const mongoose = require('mongoose');
require('./config/db'); 
require('dotenv').config({path:'variables.env'});
const express = require('express');
const router = require('./routes/index');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');

//validate fields

//app.use(expressValidator());


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

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Alerts and flash messages
app.use(flash());
// Create our middleware
app.use((req,res,next)=>{
    res.locals.mensajes = req.flash();
    next();
});

app.use('/',router());

app.listen(process.env.PORT,() => console.log('im alive'));