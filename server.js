const app = require('./app/app.js');
const env = require('./app/config/env.js');

app.instance.listen({
    port: env.PORT,
    host: env.HOST,
}, (err, address) => {
    if (err) {
        console.error(`Server error: ${err}`);
        process.exit(1);
    }
    console.log(`Server is running at address ${address}`);
});

const SIGNALS = ['SIGINT', 'SIGTERM'];

SIGNALS.forEach(signal => {
    process.on(signal, () => {
        console.info(`Received ${signal}, stopping server`);
        app.instance.close(() => {
            console.info("Server stopped, disconnecting from database server");
            app.db.then(db => db.disconnect().then(() => {
                console.info("Shutting down");
                process.exit(0);
            }));
        });
    });
})