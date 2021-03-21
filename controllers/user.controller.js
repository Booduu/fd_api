const { createUser, findUserPerEmail } = require('../queries/user.queries');

exports.userCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        const token = req.login(user);
        const isConnected = {user, token};
        console.log('isConnected', isConnected)
        res.json(isConnected);
    } catch(e) {
        res.status(400).send('Wrong credentials');
    }
}

exports.userLogin = async (req, res, next) => {
    try {
        console.log('BBBBBBB', req.body)

        const { email, password } = req.body;
        const user = await findUserPerEmail(email);

        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                const token = req.login(user);
                const isAuthentificated = { user, token };
                res.json(isAuthentificated);
            } else {
                res.status(400).send('Password not correct');
            }
        } else {
            res.status(400).send('Email not correct');
        }
    } catch(e) {
        next(e);
    }
}

exports.userLogout = (req, res, next) => {
    req.logout();
}
