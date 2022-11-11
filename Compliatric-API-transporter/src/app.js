const http = require('http');

const { configObject } = require('./config/dotenv');
const express = require('./config/express');
const debug = require('./services/debug');


function startServer() {
    const logger = debug('compliatric:server:start');
    logger.log('Starting up the Express server...');
    const app = express.configureExpress(configObject);
    const server = http.createServer(app)
    setImmediate(() => {
        server.listen(5885, 'localhost', () => {
            console.log('Server started on Port ' + 5885 )
        })
    })

}

module.exports = {startServer}
