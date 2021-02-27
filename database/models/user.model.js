const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const usersSchema = schema({
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String }
    },
    username: String,
    role: Number,
});

usersSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(8);
        return bcrypt.hash(password, salt);
    } catch(e) {
        throw e
    }
}   

usersSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.local.password);
}

const Users = mongoose.model('users', usersSchema);

module.exports = Users;