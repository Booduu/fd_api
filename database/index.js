const mongoose = require('mongoose');
// const env = require(`../environment/${process.env.NODE_ENV}`)

mongoose.connect('mongodb://localhost:27017/fulldub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
        console.log('CONNEXION TO DATABASE : OK !!');       
}).catch(err => {
    console.log('CONNEXION TO DATABASE FAIL : ', err)
});
