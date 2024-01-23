const mongoose = require('mongoose')

const applicationSourceSchema = new mongoose.Schema({
    applicationSourceName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    }
},{ autoCreate: true })

module.exports = mongoose.model('applicationSource', applicationSourceSchema)