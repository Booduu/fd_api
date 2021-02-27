//chaine de caracteres qui sert à encrypter les tokens
const secret = 'a342c8b1-77b8-4455-9a59-c45a5639e813';
const jwt = require('jsonwebtoken');
// const { findUserPerId } = require('../queries/users.queries');
const { app } = require('../app');

const createJwtToken = (user) => {
    const jwtToken = jwt.sign({ sub: user._id.toString()}, secret, { expiresIn: '8h'});
    return jwtToken;
}

//1 - creer un token jwt a partir d'un user

exports.createJwtToken = createJwtToken;

//2 - verifier le token : middleware qui verifie à chaque requete
// si il y a token dans le cookie
// si oui : on verifie le token
//          on verifie le user
//          et le positionner sur l'object request


// const extractUserFromToken = async (req, res, next) => {
//     // const token = req.cookies.jwt;
//     const token = req.headers['authorization'];
//     console.log('enenenenen', req.headers)

//     if(token) {
//         try {
//             const decodedToken = jwt.verify(token, secret);
//             const user = await findUserPerId(decodedToken.sub);
//             if(user) {
//                 req.user = user;
//                 next();
//             } else {
//                 res.clearCookie('jwt');
//                 //+ redirect
//             }
//         } catch(e) {
//             res.clearCookie('jwt');
//             //+ redirect
//         }
//     } else {
//         next();
//     }
// }

// const extractUserFromToken = async (req, res, next) => {
//     // const token = req.cookies.jwt;
//     const token = req.header['auth-token'];
    
//     if(token) {
//         try {
//             const decodedToken = jwt.verify(token, secret);
//             const user = await findUserPerId(decodedToken.sub);
//             if(user) {
//                 req.user = user;
//                 next();
//             } else {
//                 console.log('gggfkqjdl');
//             }
//         } catch(e) {
//             res.status(400).send('Invalid Token');
//         }
//     } else {
//         // next();
//         res.status(401).send('Access Denied');
//     }
// }
 


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

// app.use(extractUserFromToken);
app.use(addJwtFeatures);


