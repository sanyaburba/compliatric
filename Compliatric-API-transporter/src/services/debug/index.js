const debug = require('debug');

function logger(path) {
    const log = debug(path);
    // eslint-disable-next-line no-console
    log.log = console.log.bind(console);

    const err = debug(path);

    return {
        log,
        err,
    };
}

module.exports = logger;
