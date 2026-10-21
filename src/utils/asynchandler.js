
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
};
const successHandler = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data
    });
};
export { asyncHandler, errorHandler, successHandler };