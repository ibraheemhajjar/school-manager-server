const jwt = require('jsonwebtoken');

// authentication middleware by decoding JWT
module.exports = (req, res, next) => {

    let decodedToken;
    const AuthHeaderToken = req.get('Authorization').split(' ')[1];
    if (!AuthHeaderToken) {
        const error = new Error();
        error.message = 'Not Authenticated'
        error.statusCode = 401;
        throw error
    }
    try {
        decodedToken = jwt.verify(AuthHeaderToken, process.env.JWT_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.role;
    req.schoolName = decodedToken.schoolName;
    next();
}
