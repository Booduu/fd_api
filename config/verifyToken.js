const jwt = require('jsonwebtoken');
const { findUserPerId } = require('../queries/user.queries');
const secret = 'a342c8b1-77b8-4455-9a59-c45a5639e813';


exports.extractUserFromToken = async (req, res, next) => {
    // const token = req.cookies.jwt;
    const token = req.header('auth-token');
    console.log(req.header('auth-token'), 'kkk')
    if(token) {
        try {
            const decodedToken = jwt.verify(token, secret);
            const user = await findUserPerId(decodedToken.sub);
            if(user) {
                req.user = user;
                next();
            } else {
                console.log('gggfkqjdl');
            }
        } catch(e) {
            res.status(400).send('Invalid Token');
        }
    } else {
        // next();
        res.status(401).send('Access Denied');
    }
}