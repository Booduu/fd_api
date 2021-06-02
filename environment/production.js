const path = require('path');
module.exports = {
    dbUrl: 'mongodb://localhost:27017/fulldub',
    cert: path.join(__dirname, ''),
    key: path.join(__dirname, ''),
}