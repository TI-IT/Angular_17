const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Поле должно быть заполнено']
    },
    vendorCode: {
        type: String,
    },
    imageSrc: {
        type: String,
        default: '',
    },
    drawingImageSrc: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
    },
    currency_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currency',
        required: true,
    },
    description: {
        type: String,
    },
    unit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'units',
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    categoryTypes_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryTypes',
        required: true,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {autoCreate: true});

module.exports = mongoose.model('products', productsSchema)