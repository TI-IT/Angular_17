const mongoose = require('mongoose')

const jobTitleSchema = new mongoose.Schema({
    jobTitleName: {
        unique: true,
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
}, {autoCreate: true})

module.exports = mongoose.model('job_titles', jobTitleSchema)