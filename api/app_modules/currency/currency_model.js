const mongoose = require('mongoose')

const currencySchema = new mongoose.Schema({
    currencyName: {
        unique: true,
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
}, {autoCreate: true})

module.exports = mongoose.model('currency', currencySchema)