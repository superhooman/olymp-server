const router = require('express').Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const validateUser = require("../validators/user");
const validateAdmin = require("../validators/admin");
const validateLogin = require("../validators/login");
const validateLoginUser = require("../validators/loginUser");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const verify = require('../utils/verifyToken');
const response = require('../utils/response');
const passGen = require('generate-password');
const sendEmail = require("../utils/mailer")

/**
 * Register an user
 *
 * @param  {String} login login of an user
 * @param  {String} email email of an user
 * @param  {String} name user's name
 * @param  {String} lastName user's last name
 * @return {Object} user
 */

router.post('/register', async (req, res) => {
    const {
        error
    } = validateUser(req.body)
    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    })

    const userExists = await User.findOne({
        email: req.body.email
    })

    const password = passGen.generate({
        length: 10,
        numbers: true
    });

    if (userExists) return res.status(400).send('user exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        ...req.body,
        password: hashedPassword,
    })
    try {
        const savedUser = await user.save();
        sendEmail([{
                type: 'header',
                html: "Ваши данные для онлайн олимпиады"
            },
            {
                type: 'block',
                html: `Вот ваши данные для входа на <a href="https://olymp.devel.kz/login">olymp.devel.kz</a> <br/> <b>Логин:</b> <code>${req.body.email}</code><br/> <b>Пароль:</b> <code>${password}</code>`
            }
        ], 'Ваши данные для онлайн олимпиады', req.body.email)
        response(res, savedUser)
    } catch (err) {
        response(res, null, 3, req);
    }
})

/**
 * Authentication as a user
 *
 * @param  {String} login login of an user
 * @param  {String} password password of an user
 * @return {String} JWT token 
 */

router.post("/login", async (req, res) => {
    const {
        error
    } = validateLoginUser(req.body)
    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    })
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return response(res, null, 1, req)
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return response(res, null, 1, req)

    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
    }, process.env.TOKEN_SECRET);

    response(res.header("auth-token", token), token)
})

/**
 * Reset all active tokens
 *
 */

router.post("/resetTokens", verify, async (req, res) => {
    const user = await User.findById(req.user._id);
    user.reset = new Date();
    try {
        user.save()
        response(res)
    } catch (err) {
        response(res, null, 3, req)
    }
})

/**
 * Register an admin
 * 
 * @param  {String} login login of a new admin
 * @param  {String} password password of a new admin
 * @param  {String} master master password for creating an admin
 * @return {Object} admin
 */

router.post('/admin/register', async (req, res) => {
    const {
        error
    } = validateAdmin(req.body)
    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    })

    if(req.body.masterPassword !== process.env.MASTER_PASS){
        return res.status(400).send({
            success: false,
            message: "Wrong master password"
        })
    }

    const adminExists = await Admin.findOne({
        login: req.body.login
    })

    if (adminExists) return res.status(400).send('user exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const admin = new Admin({
        login: req.body.login,
        password: hashedPassword
    })

    try {
        const savedAdmin = await admin.save();
        res.send(savedAdmin)
    } catch (err) {
        response(res, null, 3, req)
    }
})

/**
 * Authentication as an admin
 *
 * @param  {String} login login of an user
 * @param  {String} password password of an user
 * @return {String} JWT token 
 */

router.post("/admin/login", async (req, res) => {
    const {
        error
    } = validateLogin(req.body)
    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    })
    const admin = await Admin.findOne({
        login: req.body.login
    })
    if (!admin) return response(res, null, 1, req)
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) return response(res, null, 1, req)

    const token = jwt.sign({
        _id: admin._id,
        admin: true,
        login: admin.login
    }, process.env.TOKEN_SECRET);

    response(res.header("auth-token", token), token)
})

router.post("/admin/resetTokens", verify, async (req, res) => {
    const admin = await Admin.findById(req.user._id);
    admin.reset = new Date();
    try {
        admin.save()
        response(res)
    } catch (err) {
        response(res, null, 3, req)
    }
})

module.exports = router;