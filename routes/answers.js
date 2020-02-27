const router = require('express').Router();
const Olympiad = require("../models/Olympiad");
const User = require("../models/User")
const Answer = require("../models/Answer");
const response = require('../utils/response');
const verify = require('../utils/verifyToken');

router.get("/all", verify, async (req, res) => {
    if(!req.user.admin){
        return response(res, null, 2)
    }
    const answers = await Answer.find({})
    response(res, answers)
})

router.get("/exact/:id", verify, async (req, res) => {
    if(!req.user.admin){
        return response(res, null, 2)
    }
    if (!req.params.id) return response(res, null, 6, req)
    const answer = await Answer.findById(req.params.id);
    const olympiad = await Olympiad.findById(answer.olympiad)
    const user = await User.findById(answer.user)
    response(res, {
        answer,
        user,
        olympiad
    })
})

router.post("/delete/:id", verify, async (req, res) => {
    if (!req.user.admin) {
        return response(res, null, 2)
    }
    const deleted = await Answer.findByIdAndDelete(req.params.id);
    response(res, deleted);
})

router.post("/check", verify, async (req, res) => {
    if(!req.user.admin){
        return response(res, null, 2)
    }
    if (!req.body.id) return response(res, null, 6, req);
    if (!req.body.output.length) return response(res, null, 6, req);
    const answer = await Answer.findById(req.body.id)
    const olympiad = await Olympiad.findById(answer.olympiad)
    if(req.body.output.length !== olympiad.tasks.length){
        return response(res, null, 6, req);
    }
    answer.output = req.body.output
    answer.checked = true
    answer.score = req.body.score
    await answer.save()
    response(res, answer)
})

module.exports = router