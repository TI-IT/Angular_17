const {mongoose, Schema} = require('mongoose')

const positionSchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },

    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {autoCreate: true})

module.exports = mongoose.model('position', positionSchema)