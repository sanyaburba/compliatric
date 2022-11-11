const dotenv = require('dotenv-safe');

const constants = require('../../constants');

const configObject = {
    env: process.env.NODE_ENV || constants.DEV_NODE_ENV,
    port: process.env.PORT || 5001,
    ip: process.env.IP || '127.0.0.1',
    apiRoot: '/api',
    healthRoot: '/health',
};

const envConfigs = {
    test: {
    },
    development: {
    },
    production: {
        ip: process.env.IP || undefined,
        port: process.env.PORT || 5480,
    },
};

function configureEnv() {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config({});
    }

    Object.assign(configObject, envConfigs[configObject.env]);
}

module.exports = {
    configureEnv,
    configObject,
};
