(async () => {
    try {
        // require('./config/dotenv').configureEnv();
        require('./app').startServer();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error on Compliatric-UM start up:\n%o', error);
    }
})();
