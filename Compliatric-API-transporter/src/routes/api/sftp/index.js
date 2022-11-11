const { Router } = require('express');
const debug = require('../../../services/debug');

const signatureService = require('../../../services/signature');
const controller = require('./controller');

const constants = require('../../../constants');

const router = new Router();

/**
 * @api {get} /api/sftp/upload Upload File
 * @apiName SFTP
 * @apiGroup DataExtractions
 * @apiVersion 0.0.1
 * @queryParam orgid string
 * @queryParam filename string
 * @queryParam employeeManagement boolean
 *
 * @apiSuccess {json} response Resulting data
 * @apiSuccessExample {json} 200 Success:
 * {
 *   "status": "success",
 *   "result": [
 *     {
 *       "fileName": "59a124f63f2784893e6c6f95af3e8548.file"
 *     }
 *   ]
 * }
 *
 * @apiError {json} error Resulting error
 * @apiErrorExample {json} 4xx Error:
 * {
 *   "status": "error",
 *   "message": "Error message"
 * }
 */

router.post('/', (req, res) => {
    const logger = debug(`compliatric:api:uploadFile:${req.headers['x-request-id']}`);
    return Promise.resolve()
    // signatureService.verifyAuthSignature('uploadfile', req.headers, logger)
        .then(() => controller.uploadFile(req, logger)
            .then((result) => {
                logger.log(constants.STATUS_200_RESPONSE, 'Upload File');
                return res.send(result);
            })
            .catch((error) => {
                logger.err(constants.STATUS_400_RESPONSE, 'Upload File', error);
                return res.status(400).send(error);
            }))
        .catch((error) => {
            logger.err(constants.STATUS_401_RESPONSE, 'Upload File', error);
            return res.status(401).send(error);
        });
});


module.exports = router;

// с апекса прилетят данные в джсон, настройки сфтп и т.п, далее пробуем коннектится к сфтп, обрабатываем ошибки
