const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    answers: {
        type: Array,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    score: {
        type: Number,
        default: 0
    },
    output: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    },
    olympiad: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Answer", answerSchema)