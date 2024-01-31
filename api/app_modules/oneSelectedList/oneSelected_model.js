const mongoose = require('mongoose')

const oneSelectedSchema = new mongoose.Schema({
    nameCategory: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        unique: true,
        type: String,
        required: true,
    }
}, {autoCreate: true})

module.exports = mongoose.model('oneSelected', oneSelectedSchema)