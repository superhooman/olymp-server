const errors = require("../errors.json");
const log = require("./logger");

module.exports = (res, data, err, req) => {
    if (err) {
        log.warn(`path: ${req.originalUrl} | error: ${errors[err]}`)
        return res.status(200).json({
            success: false,
            errorCode: err,
            errorMessage: errors[err]
        })
    }
    res.status(200).json({
        success: true,
        data
    })
}