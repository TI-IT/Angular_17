const mongoose = require('mongoose')

const applicationsSchema = new mongoose.Schema({
    applicationNumber: {
        unique: true,
        type: Number,
        required: true,
    },
    _clientsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        required: true,
    },
    addressObject: {
        type: String,
    },
    _applicationSourceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'applicationSource',
    },
    _typesJobsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types_jobs',
    },
    description: {
        type: String,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {autoCreate: true})

module.exports = mongoose.model('applications', applicationsSchema)