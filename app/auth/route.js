const userController = require('./controller');

module.exports = async (fastify, _opts) => {
    fastify.post('/register', userController.register);
    fastify.post('/login', userController.login);
};