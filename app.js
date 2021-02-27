const path = require('path');
const express = require('express');
const app = express();
require('./database');
const bodyParser= require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

exports.app = app;
app.use(cookieParser());
require('./config/jwt.config');

app.use(cors());
app.options('*', cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('./assets', express.static(path.join(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static('assets'));


const routing = require('./routes');

app.use(routing);

app.listen(3030, () => {
    console.log('listening on 3030');
});