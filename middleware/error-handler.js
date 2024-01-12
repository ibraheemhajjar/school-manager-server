const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
    logger.error(err);
    res.status(err.statusCode).json({ message: 'an error occurred', err });
}
