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
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(express.static('assets'));
const routing = require('./routes');

app.use(routing);


//Gestion d'erreurs
 //handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;

    res.status(code).json({
        code,
        errorName: err.name,
        messages: error,
    });
}

const handleValidationError = (err, res) => {
    let code = 400;
    if (err.errors) {

        let errors = Object.values(err.errors).map(el => el.message);
        let fields = Object.values(err.errors).map(el => el.path);
        
        const myOwnErrors = {};
        errors.map((e, i) => {
            myOwnErrors[fields[i]] = e;
        });
    
        res.status(code).json({
            code,
            errorName: err.name,
            messages: {...myOwnErrors},
        });
    } else {
        res.status(code).json({
            code,
            errorName: err.name,
            message: err.message,
        });
    }
 }

app.use((err, req, res, next) => {
    try {
        if(err.name === 'ValidationError') return err = handleValidationError(err, res);
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);

        if (!err.code) {
             res.status(400).json({
                code: err.code,
                errorName: 'Oups!',
                message: err.message,
            });
        }

    } catch(err) {
        res.status(500).json({
            code: err.code,
            errorName: 'Oups!',
            message: 'Une erreur s\'est produite !',
        });
    }
});


//production
// app.use(express.static(path.join(__dirname, "../client-build")));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "../client-build/index.html"))
// })

// module.exports = app;

//dev
const PORT = process.env.PORT || 3030;
app.listen(3030, () => {
    console.log('listening on ' + PORT);
});



