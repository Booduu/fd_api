const path = require('path');
module.exports = {
    dbUrl: 'mongodb://localhost:27017/fulldub',
    cert: path.join(__dirname, '../ssl/local.crt'),
    key: path.join(__dirname, '../ssl/local.key'),
}