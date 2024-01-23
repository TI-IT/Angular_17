const {mongoose, Schema} = require('mongoose')

const categorySchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        default: '',
    },
    _categoryTypesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryTypes',
        required: true,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {autoCreate: true})

module.exports = mongoose.model('categories', categorySchema)