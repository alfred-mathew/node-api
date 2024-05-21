const dotenv = require('dotenv');

dotenv.config();

const { HOST, PORT, DB_CONN, SIGNING_KEY } = process.env;

module.exports = {
    HOST,
    PORT,
    DB_CONN,
    SIGNING_KEY,
};