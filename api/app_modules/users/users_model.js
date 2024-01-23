const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role_id: [{
        ref: 'roles',
        type: Schema.Types.ObjectId
    }]
}, {autoCreate: true})

module.exports = mongoose.model('users', usersSchema)