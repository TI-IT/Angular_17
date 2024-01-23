const mongoose = require('mongoose')

const clientsSchema = new mongoose.Schema({
    clientsName: {
        type: String,
        required: [true, 'Поле должно быть заполнено']
    },
    numberPhone: {
        type: String,
        unique: true,
        sparse: true,
        required: [true, 'Поле должно быть заполнено'],
        maxLength: [10, 'Номер телефона не может быть длиннее 10 символов'],
        minLength: [10, 'Номер телефона не может быть меньше 10 символов'],
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        default: 'client',
    },
    description: {
        type: String,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {autoCreate: true});

module.exports = mongoose.model('clients', clientsSchema)