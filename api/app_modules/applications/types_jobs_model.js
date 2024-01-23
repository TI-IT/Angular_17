const mongoose = require('mongoose')

const types_obsSchema = new mongoose.Schema({
    typesJobsName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    }
},{ autoCreate: true })

module.exports = mongoose.model('types_jobs', types_obsSchema)