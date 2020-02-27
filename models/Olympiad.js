const mongoose = require("mongoose");

const olympiadSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        max: 2048,
        required: true
    },
    tasks: {
        type: Array,
        default: []
    },
    finished: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Olympiad", olympiadSchema)