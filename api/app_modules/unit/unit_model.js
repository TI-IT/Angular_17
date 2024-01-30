const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true,
    }
}, {autoCreate: true})

module.exports = mongoose.model('units', unitSchema)