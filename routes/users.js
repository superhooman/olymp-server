const router = require('express').Router();
const User = require("../models/User");
const response = require('../utils/response');
const verify = require('../utils/verifyToken');

/* /api/users */

router.get("/all", verify, async (req, res)=>{
    if(!req.user.admin){
        return response(res, null, 2)
    }
    const users = await User.find({});
    response(res, users)
})

router.get("/about/:id", verify, async (req, res)=>{
    if(!req.user.admin){
        return response(res, null, 2)
    }
    const users = await User.findById(req.params.id);
    response(res, users);
})

router.post("/delete/:id", verify, async (req, res)=>{
    if(!req.user.admin){
        return response(res, null, 2)
    }
    const user = await User.findByIdAndDelete(req.params.id);
    response(res, user);
})

module.exports = router