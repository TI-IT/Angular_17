const {mongoose, Schema} = require('mongoose')

const categoryTypesSchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        default: '',
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {autoCreate: true})

module.exports = mongoose.model('categoryTypes', categoryTypesSchema)