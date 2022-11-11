const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');
const debug = require('../../services/debug');

const utils = require('../../services/utils');
const constants = require('../../constants');

const router = new Router();

router.use((req, res, next) => {
  if (!req.headers['x-request-id']) {
    req.headers['x-request-id'] = uuidv4();
  }
  next();
});

router.use((error, req, res, next) => {
  const logger = debug(`compliatric:root:${req.headers['x-request-id']}`);
  logger.err(constants.STATUS_400_INVALID_JSON_ERROR);
  return res.status(400).send({
    status: constants.ERROR,
    message: constants.STATUS_400_INVALID_JSON_ERROR,
  });
});

router.use((req, res, next) => {
  const logger = debug(`compliatric:root:${req.headers['x-request-id']}`);
  logger.log('reqPath: %s', `${req.method} ${req.path}`);
  // log('reqHeaders:\n%o', utils.removeSensitiveData(req.headers));
  // log('reqParams:\n%o', utils.removeSensitiveData(req.params));
  // log('reqQuery:\n%o', utils.removeSensitiveData(req.query));
  // log('reqBody:\n%o', utils.removeSensitiveData(req.body));
  // log('resHeaders:\n%o', utils.removeSensitiveData(res.getHeaders()));
  next();
});

module.exports = router;
