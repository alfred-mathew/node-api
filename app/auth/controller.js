const userService = require('./service');
const env = require('../config/env');
const jwt = require('jsonwebtoken');

async function registerHandler(request, reply) {
    try {
        const { userName } = request.body;
        const userExists = await userService.userExists(userName);
        if (userExists) {
            return await reply.code(409).send({
                message: `User name ${userName} is taken`,
            });
        }
        console.info("Creating new user account");
        const user = await userService.createUser(request.body);
        return await reply.code(201).send({
            message: `User ${userName} registered successfully`,
        });
    } catch (err) {
        console.error(err);
        return await reply.code(500).send({ message: err });
    }
}

async function loginHandler(request, reply) {
    try {
        const { userName, email, password } = request.body;
        let user = null;

        if (userName) {
            console.log("Checking username", userName);
            user = await userService.findByUserName(userName);
            if (!user) {
                return await reply.code(404).send({
                    message: `User ${userName} is not registered`,
                });
            }
        } else if (email) {
            console.log("Username not provided, checking email", userName);
            user = await userService.findByEmail(email);
            if (!user) {
                return await reply.code(404).send({
                    message: `Email ${email} is not registered`,
                });
            }
        } else {
            return await reply.code(400).send({
                message: 'Username or email is required to login'
            });
        }

        if (!password) {
            return await reply.code(400).send({
                message: 'Password is required to login'
            });
        }

        const passwordMatches = await userService.checkPassword(user.password, password);
        if (!passwordMatches) {
            return await reply.code(401).send({
                message: `Invalid credentials`,
            });
        }

        const token = jwt.sign({
            id: user._id,
            userName: user.userName,
            email: user.email,
        }, env.SIGNING_KEY);
        return await reply.code(200).send({
            message: `User ${user.userName} logged in successfully`,
            data: {
                token,
            },
        });
    } catch (err) {
        console.error(err);
        return await reply.code(500).send({ message: err });
    }
}

module.exports = {
    register: registerHandler,
    login: loginHandler,
}