module.exports = (req, res, next) => {
    console.log('RequestLogger:')
    console.log(req)
    next()
}
