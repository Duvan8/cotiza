const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const session = require('express-session'); 
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true 
}))

app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));



app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'vistas/'));

app.use(require('./rutas/rutas'));


app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

