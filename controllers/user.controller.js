const { createUser, findUserPerEmail } = require('../queries/user.queries');

// CREATE USER
exports.userCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        const token = req.login(user);
        const isConnected = {user, token};
        res.json(isConnected);
    } catch(e) {
        res.status(400).send('Wrong credentials');
    }
}

// LOGIN USER
exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserPerEmail(email);

        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                const token = req.login(user);
                const isAuthentificated = { user, token };
                res.json(isAuthentificated);
            } else {
                throw { name: 'ValidationError', message: 'Le password n\'est pas correct' }
            }
        } else {
            throw { name: 'ValidationError', message: 'L\'email n\'est pas correct'}
        }
    } catch(e) {
        next(e);
    }
}

// LOGOUT USER
exports.userLogout = (req, res, next) => {
    req.logout();
}
