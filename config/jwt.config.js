const jwt = require('jsonwebtoken');
const app = require('../app');

require('dotenv').config();

const createJwtToken = (user) => {
    const jwtToken = jwt.sign({ sub: user._id.toString()}, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '8h'});
    return jwtToken;
}

//1 - creer un token jwt a partir d'un user

exports.createJwtToken = createJwtToken;

//2 - verifier le token : middleware qui verifie à chaque requete avec 'extractUserFromToken'
// si il y a token dans le cookie
// si oui : on verifie le token
//          on verifie le user
//          et le positionner sur l'object request


//3 - Ajout de métodes utiles (helpers) sur l'object req. 
const addJwtFeatures = (req, res, next) => {
    req.isAuthenticated = () => !!req.user;
    req.logout = () => res.clearCookie(jwt);
    req.login = (user) => {
        const token = createJwtToken(user);
        // res.header('auth-token', token).send(token);
        return token;
    }
    next();
}

app.use(addJwtFeatures);


