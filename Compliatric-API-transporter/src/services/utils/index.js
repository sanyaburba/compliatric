const crypto = require('crypto');

const objectsToEncrypt = ['auth-signature', 'state', 'data', 'refreshToken', 'instanceUrl'];

function getSignature(methodName, key, timestamp) {
  return crypto.createHmac('sha1', key)
    .update(`${methodName}-${timestamp}`)
    .digest('base64');
}

function type(value) {
  const regex = /^\[object (\S+?)\]$/;
  const matches = Object.prototype.toString.call(value).match(regex) || [];

  return (matches[1] || 'undefined').toLowerCase();
}

function removeSensitiveData(body) {
  if (body && (type(body) === 'object' || type(body) === 'array')) {
    const updatedBody = JSON.parse(JSON.stringify(body));

    if (Object.getOwnPropertyNames(updatedBody).length) {
      Object.keys(updatedBody).map((elem) => {
        if (updatedBody[elem] && type(updatedBody[elem]) !== 'object' && type(updatedBody[elem]) !== 'array') {
          objectsToEncrypt.some((field) => {
            if (elem === field) {
              updatedBody[elem] = '***';
              return true;
            }

            return false;
          });
        } else if (updatedBody[elem]) {
          updatedBody[elem] = removeSensitiveData(updatedBody[elem]);
        }

        return updatedBody[elem];
      });
    }

    return updatedBody;
  }

  return body;
}

function getFileFromBody(req) {
  return new Promise((resolve, reject) => {
    const body = [];

    req.on('data', (data) => {
      body.push(data);
    });

    req.on('end', () => {
      resolve(Buffer.concat(body));
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = {
  getSignature,
  removeSensitiveData,
  getFileFromBody,
};
