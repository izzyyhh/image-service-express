module.exports = (req, res, next) => {
    const master_key = req.header('MASTER_KEY')
    if (master_key !== process.env.MASTER_KEY) {
        next({
            status: 401,
            message: 'You are not authorized!',
        })
        return
    }
    next()
}
