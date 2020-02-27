const router = require('express').Router();
const Olympiad = require("../models/Olympiad");
const Answer = require("../models/Answer");
const validateOlympiad = require('../validators/olympiad')
const response = require('../utils/response');
const verify = require('../utils/verifyToken');

/* /api/olympiad */

router.get("/all", verify, async (req, res) => {
    const olympaids = await Olympiad.find({
        finished: false
    }, {
        title: true,
        dateStart: true,
        dateEnd: true,
        description: true
    })
    response(res, olympaids)
})

router.get("/about/:id", verify, async (req, res) => {
    if (!req.user.admin) {
        return response(res, null, 2)
    }
    const olymp = await Olympiad.findById(req.params.id)
    response(res, olymp)
})

router.post("/delete/:id", verify, async (req, res) => {
    if (!req.user.admin) {
        return response(res, null, 2)
    }
    const olymp = await Olympiad.findByIdAndDelete(req.params.id);
    response(res, olymp);
})


router.post("/create", verify, async (req, res) => {
    if (!req.user.admin) {
        return response(res, null, 2)
    }
    const {
        error
    } = validateOlympiad(req.body);
    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    })
    const olympiad = new Olympiad(req.body)
    try {
        const saved = await olympiad.save();
        response(res, saved)
    } catch (err) {
        response(res, null, 3, req)
    }
})

router.post("/addTasks/:id", verify, async (req, res) => {
    if (!req.user.admin) {
        return response(res, null, 2)
    }
    if (!req.params.id) return response(res, null, 6, req)
    try {
        let olympiad = await Olympiad.findByIdAndUpdate(req.params.id, {
            tasks: req.body.tasks
        }, {
            new: true
        })
        response(res, olympiad)
    } catch (err) {
        console.log(err)
        response(res, null, 3, req)
    }
})

router.post("/edit/:id", verify, async (req, res) => {
    if (!req.user.admin) {
        return response(res, null, 2)
    }
    if (!req.params.id) return response(res, null, 6, req)
    const {
        error
    } = validateOlympiad(req.body);
    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    })
    try {
        let olympiad = await Olympiad.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        response(res, olympiad)
    } catch (err) {
        console.log(err)
        response(res, null, 3, req)
    }
})

router.get("/start/:id", verify, async (req, res) => {
    if (!req.params.id) return response(res, null, 6, req);
    const olympiad = await Olympiad.findById(req.params.id);
    const olympDone = await Answer.findOne({
        user: req.user._id,
        olympiad: req.params.id
    })
    if(olympDone){
        return response(res, null, 8, req);
    }
    
    if ((new Date(olympiad.dateStart) > (new Date)) || (new Date(olympiad.dateEnd) < (new Date))) {
        res.status(200).send({
            success: false,
            dateStart: olympiad.dateStart,
            dateEnd: olympiad.dateEnd,
            notStarted: (new Date(olympiad.dateStart) > (new Date)),
            finished: (new Date(olympiad.dateEnd) < (new Date))
        })
    } else {
        let tasks = olympiad.tasks.map((el) => ({
            ...el,
            rightAnswer: undefined
        }))
        response(res, {
            ...olympiad._doc,
            tasks
        })
    }
})

router.post("/end/:id", verify, async (req, res) => {
    if (!req.params.id) return response(res, null, 6, req)
    if (!req.body.answers.length) return response(res, null, 7, req)
    const olympiad = await Olympiad.findById(req.params.id)
    const endWithOffset = (new Date(olympiad.dateEnd)).getTime() + 2 * 60 * 1000
    // TODO: Check date
    if (((new Date(olympiad.dateStart) > (new Date)) || (new Date(endWithOffset) < (new Date)))) {
        res.status(200).send({
            success: false,
            dateStart: olympiad.dateStart,
            dateEnd: olympiad.dateEnd,
            notStarted: (new Date(olympiad.dateStart) > (new Date)),
            finished: (new Date(olympiad.dateEnd) < (new Date))
        })
    } else {
        if (olympiad.tasks.length !== req.body.answers.length) {
            return response(res, null, 7, req)
        }
        const answer = new Answer({
            user: req.user._id,
            answers: req.body.answers,
            olympiad: req.params.id
        })
        const saved = await answer.save()
        response(res, saved)
    }
})

module.exports = router