const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Admin = require("../models/Admin");
const response = require('./response')

module.exports = async (req, res, next) => {
    const token = req.header('Auth-Token');
    if (!token) return res.status(400).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if (verified) {
            let user
            if (verified.admin) {
                user = await Admin.findById(verified._id);
            } else {
                user = await User.findById(verified._id);
            }
            const reset = (new Date(user.reset).getTime()) / 1000
            if (verified.iat >= reset) {
                req.user = verified
                next()
            } else {
                response(res, null, 2, req)
            }
        }
    } catch (err) {
        response(res, null, 2, req)
    }
}