const app = require('./app/app.js');
const env = require('./app/config/env.js');

app.listen({
    port: env.PORT,
    host: env.HOST,
}, (err, address) => {
    if (err) {
        console.error(`Server error: ${err}`);
        process.exit(1);
    }
    console.log(`Server is running at address ${address}`);
});