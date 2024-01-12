
// authorization middleware only pass super admins and admins
module.exports = (req, res, next) => {

    const userRole = req.userRole;
    if (userRole === 'super admin' || userRole === 'admin') {
        next();
    } else {
        const error = new Error();
        error.message = 'Not Authorized'
        error.statusCode = 403;
        throw error
    }
}
