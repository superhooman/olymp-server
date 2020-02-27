const router = require('express').Router();
const verify = require("../utils/verifyToken");

router.get("/get", verify, (req,res) => {
    res.send("HERE IS YOUR POST")
})

module.exports = router;