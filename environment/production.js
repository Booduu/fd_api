const path = require('path');
// module.exports = {
//     dbUrl: 'mongodb://localhost:27017/fulldub',
//     cert: '/etc/letsencrypt/live/www.boodu.fr/fullchain.pem',
//     key: '/etc/letsencrypt/live/www.boodu.fr/privkey.pem',
// }

module.exports = {
    dbUrl: 'mongodb://localhost:27017/fulldub',
    cert: '/etc/letsencrypt/live/www.fulldub.fr/fullchain.pem',
    key: '/etc/letsencrypt/live/www.fulldub.fr/privkey.pem',
    portHttp:80,
    portHttps:443,
}

//boodu
// module.exports = {
//     dbUrl: 'mongodb://localhost:27017/fulldub',
//     cert: '/etc/letsencrypt/live/www.boodu.fr/fullchain.pem',
//     key: '/etc/letsencrypt/live/www.boodu.fr/privkey.pem',
//     portHttp:80,
//     portHttps:443,
// }

// certbot certonly -d www.boodu.fr -d boodu.fr