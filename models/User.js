const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    name: {
        type: String,
        required: true,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        max: 255
    },
    phone: {
        type: String,
        required: true
    },
    parentPhone: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    reset: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("User", userSchema)