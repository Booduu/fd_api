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
// const errorController = require('./controllers/errorController');

const routing = require('./routes');

app.use(routing);

// app.use(errorController);


//gestion d'erreurs
// app.use((err, req, res, next) => {
//     console.error('ERROR !@#', err);
//     console.log(process.env.NODE_ENV);
//     const env = process.env.NODE_ENV;
//     if(env === 'production') {
//         console.log('production')
//         res.status(500).json({
//             code: err.code || 500,
//             message: err.message
//         });
//     } else { 
//         console.log('production', 2)

//         res.status(500).json({
//             code: err.code || 500,
//             message: err.message,
//             stack: err.stack
//         });   
//     } 
// })

app.use( (err, req, res, next) => {
    console.error('MIDDLEWARE ERROR', err.stack);
    return res.status(500).send({ error: err });

  })



app.listen(3030, () => {
    console.log('listening on 3030');
});


// app.use((err, req, res, next) => {
//     console.log('congrats you hit the error middleware');
//     console.log(err);
// });


