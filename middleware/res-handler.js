const resHandler = (error, req, res, next) => {
    if (!res.message) {
        if (res.data?.length <= 0 || res.data === null) {
            res.message = 'Done. Successfully! - no data is available';
        } else {
            res.message = 'Done. Successfully!';
        }
    }
    if (!res.statusCode) {
        res.statusCode = 200
    }
    return res.json({
        message: res.message,
        statusCode: res.statusCode,
        data: res.data,
        error: null,
    });
};

module.exports = resHandler
