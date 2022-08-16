const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const session = require('express-session'); 
const multer = require("multer");
const storage = multer.diskStorage({
    destination: 'public/imagenes',
    filename: (req,file,cb) => {
      cb(null,file.originalname);
    }
});

const PORT = process.env.PORT || 3000;

app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true 
}))

app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.use(multer({
    storage,
    dest: 'public/imagenes'
}).single('miarchivo'))

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'vistas/'));

app.use(require('./rutas/rutas'));


app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});