const { Router } = require('express');

const constants = require('../../constants');
const logger = require('../../services/debug')('compliatric:root');

const router = new Router();

router.use((req, res, next) => {
  logger.err(`${constants.STATUS_404_ENDPOINT_NOT_FOUND} reqPath: ${req.method} ${req.path}.`);
  return res.status(404).send({
    status: constants.ERROR,
    message: constants.STATUS_404_ENDPOINT_NOT_FOUND,
  });
});

router.use((error, req, res) => {
  logger.err(`${constants.STATUS_500_INTERNAL_SERVER_ERROR} reqPath: ${req.method} ${req.path}.`);
  return res.status(500).send({
    status: constants.ERROR,
    message: constants.STATUS_500_INTERNAL_SERVER_ERROR,
  });
});

module.exports = router;
