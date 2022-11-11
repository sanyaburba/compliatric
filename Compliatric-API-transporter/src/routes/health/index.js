const { Router } = require('express');

const router = new Router();

/**
 * @api {get} /health Health Check
 * @apiName HealthCheck
 * @apiGroup Health
 * @apiVersion 0.1.0
 *
 * @apiSuccess {null} response No response data
 * @apiSuccessExample {null} 200 Success
 */
router.get('/', (req, res) => res.status(200).send());

module.exports = router;
