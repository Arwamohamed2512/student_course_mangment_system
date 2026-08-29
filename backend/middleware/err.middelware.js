const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack)
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}
<<<<<<< HEAD
module.exports = errorMiddleware;
=======
module.exports = errorMiddleware
>>>>>>> eb2ec79be83bc972395df6651f3816b347bb768e
