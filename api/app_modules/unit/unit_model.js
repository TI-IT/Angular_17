const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
    unitName: {
        unique: true,
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
}, {autoCreate: true})

module.exports = mongoose.model('units', unitSchema)