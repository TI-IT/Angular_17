const mongoose = require('mongoose')

const sheetMaterialsSchema = new mongoose.Schema({
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
    currency: {
        type: String,
        default: 'руб.',
    },
    description: {
        type: String,
    },
    unit: {
        type: String,
    },
    catalog: {
        type: String,
        default: 'Листовые материалы',
    },
    category: {
        type: String,
    },
    subcategories: {
        type: String,
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    thickness: {
        type: Number,
    },
    maxLength: {
        type: String,
    },

}, {autoCreate: true});

module.exports = mongoose.model('sheetMaterials', sheetMaterialsSchema)