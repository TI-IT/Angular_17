const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rolesSchema = new Schema({
    roleName: {
        unique: true,
        type: String,
        default: "user",
    },
}, {autoCreate: true})

module.exports = mongoose.model('roles', rolesSchema)