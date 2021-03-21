const Users = require('../database/models/user.model');

exports.createUser = async (body) => {
    console.log('body', body)
    try {
        const hashedPassword = await Users.hashPassword(body.password);
        const user = new Users({
            role: 0,
            username: body.username,
            local: {
                email: body.email,
                password: hashedPassword
            }
        });
        return user.save();
    } catch(e) {
        throw e;
    }
}

exports.findUserPerEmail = async (email) => {
    return Users.findOne({ 'local.email': email }).exec();
}

exports.findUserPerId = (id) => {
    return Users.findOne({_id: id}).exec();
}