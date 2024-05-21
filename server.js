const app = require('./app/app.js');
const dotenv = require('dotenv');

dotenv.config();

app.listen({
    port: process.env.PORT,
    host: process.env.HOST,
}, (err, address) => {
    if (err) {
        console.error(`Server error: ${err}`);
        process.exit(1);
    }
    console.log(`Server is running at address ${address}`);
});