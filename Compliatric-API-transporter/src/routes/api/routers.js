const { Router } = require('express');

const routers = new Router();

routers.use('/sftp', require('./sftp'));

module.exports = routers;
