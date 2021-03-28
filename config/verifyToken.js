const jwt = require('jsonwebtoken');
const { findUserPerId } = require('../queries/user.queries');
const secret = 'a342c8b1-77b8-4455-9a59-c45a5639e813';
require('dotenv').config();


exports.extractUserFromToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
            const user = await findUserPerId(decodedToken.sub);
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(400).send('No user found');
            }
        } catch(e) {
            res.status(400).send('Invalid Token');
        }
    } else {
        res.status(401).send('Access Denied');
         // next();
    }
}