const express = require('express');
const exphbs = require('express-handlebars');

const router = require('./routes/index');
const path = require('path');
const app = express();


// enable handlebars as view
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        
    })
); 

 app.set('view engine', 'handlebars');

 // static files
app.use(express.static(path.join(__dirname,'public')));
app.use('/', router());
 
 

app.listen(5000);