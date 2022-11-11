const express = require('express');
const helmet = require('helmet');
const nocache = require('nocache');
const bodyParser = require('body-parser');

const defaultRouter = require('../../routes/default-route');
const healthRouter = require('../../routes/health');
const apiRouter = require('../../routes/api');
const defaultErrorRouter = require('../../routes/default-route-error');

function getBodyParserMiddleware(callback) {
    return (req, res, next) => {
        const contentType = req.headers['content-type'];
        if (contentType && contentType.indexOf('multipart') > -1) {
            return next();
        }
        return callback(req, res, next);
    };
}

function configureExpress({ healthRoot, apiRoot }) {
    const app = express();

    app.use(helmet());
    app.use(nocache());

    app.use(getBodyParserMiddleware(bodyParser.urlencoded({ limit: '50mb', extended: false })));
    app.use(getBodyParserMiddleware(bodyParser.json({limit: '50mb'})));
    app.use('/api/sftp', require('../../routes/api/sftp'))

    app.use(healthRoot, healthRouter);
    app.use('/', defaultRouter);

    app.use(apiRoot, apiRouter);
    app.use('/', defaultErrorRouter);



    return app;
}

module.exports = {
    configureExpress,
};
