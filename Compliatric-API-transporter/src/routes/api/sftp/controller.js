const SFTPService = require('../../../services/sftp');

const constants = require('../../../constants');

function uploadFile(req, logger) {
    return SFTPService.uploadFile(req, logger)
        .then((result) => ({
            status: constants.SUCCESS,
            result,
        }))
        .catch((error) => {
            logger.err('Error:\n%o', error);
            return Promise.reject({
                status: constants.ERROR,
                message: (error && error.message) || constants.UNKNOWN_ERROR,
       });
    });
}

module.exports = {uploadFile};
