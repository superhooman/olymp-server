const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const imageSchema = mongoose.Schema({
    small: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    medium: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    large: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

imageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Image", imageSchema)