const fastify = require('fastify');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = fastify();

mongoose.connect(process.env.DB_CONN).then(() => {
    console.log('Database connected succesfully');
}).catch(err => {
    console.error('Database did not connect', err);
    process.exit(1);
});

app.get('/', (_request, reply) => {
    return reply.code(200).send({
        message: "Server is up and running"
    });
});

module.exports = app;