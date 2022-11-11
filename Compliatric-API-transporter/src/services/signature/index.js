const { KEY } = process.env;

const utils = require('../utils');
const constants = require('../../constants');

function verifyAuthSignature(methodName, { timestamp, 'auth-signature': authSignature }, logger) {
  try {
    if (timestamp && authSignature && KEY) {
      const requestTimeStamp = Number(timestamp);
      if ((Date.now() - requestTimeStamp) < constants.AUTH_TIME_LIMIT) {
        const hash = utils.getSignature(methodName, KEY, timestamp);
        if (hash !== authSignature) {
          throw new Error(constants.WRONG_SIGNATURE);
        }
      } else {
        throw new Error(constants.OLD_REQUEST);
      }
    } else {
      throw new Error(constants.AUTH_PARAMETER_MISSING);
    }
  } catch (error) {
    logger.err('Auth signature verification failed.');
    logger.err('Logging error:\n%o', error);

    return Promise.reject({
      status: constants.ERROR,
      message: constants.UNAUTHORIZED_REQUEST,
    });
  }

  logger.log('Auth signature is verified.');
  return Promise.resolve();
}

module.exports = {
  verifyAuthSignature,
};
