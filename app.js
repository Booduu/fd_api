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

// app.use(() => errorController);


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
//         console.log('YYYYY',{
//           code: err.code || 500,
//           message: err.message,
//           stack: err.stack
//       })

//         res.status(500).json({
//             code: err.code || 500,
//             message: err.message,
//             stack: err.stack
//         });   
//     } 
// })


const handleValidationError = (err, res) => {
    console.log('handleValidationError 22222', err)

    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if(errors.length > 1) {
       const formattedErrors = errors.join(' ');
       res.status(code).send({messages: formattedErrors, fields: fields});
     } else {
        res.status(code).send({messages: errors, fields: fields})
     }
 }

 //handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
   const field = Object.keys(err.keyValue);
   const code = 409;
   const error = `An account with that ${field} already exists.`;
   res.status(code).send({messages: error, fields: field});
}

app.use((err, req, res, next) => {
    try {
        console.log('congrats you hit the error middleware');
        if(err.name === 'ValidationError') return err = handleValidationError(err, res);
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);

        console.log('errr 1', err)
    } catch(err) {
        console.log('errr 2', err)

       res.status(500).send('An unknown error occurred.');
    }
});



app.listen(3030, () => {
    console.log('listening on 3030');
});



