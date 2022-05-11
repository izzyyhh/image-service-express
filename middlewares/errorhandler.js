module.exports = (error, request, response, next) => {
    if (error.status && error.message) {
        response.status(error.status).json(error)
    } else {
        response.status(500).json({
            status: 500,
            message: 'Something went wrong',
        })
    }

    console.error(error)
}
