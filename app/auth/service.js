const User = require('../users/models/user');
const bcrypt = require('bcrypt');

module.exports = {
    findByEmail: async (email) => await User.findOne({ email }),
    findByUserName: async (userName) => await User.findOne({ userName }),
    createUser: async (data) => await bcrypt.hash(data.password, 10)
        .then(async (hash) => {
            data.password = hash;
            return await User.create(data);
        }),
    userExists: async (userName) => await User.exists({ userName }),
    checkPassword: async (userPassword, inputPassword) => await bcrypt.compare(inputPassword, userPassword),
}