const mongoose = require('mongoose')

const sindicatProductDetailsLinkSchema = new mongoose.Schema({
    link: {
        type: String,
        unique: true,
        sparse: true,
        required: [true, 'Поле должно быть заполнено'],
    },
    title: {
        type: String,
    },
    imgBigSrc: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
}, {autoCreate: true});

module.exports = mongoose.model('sindicat_product_details_link', sindicatProductDetailsLinkSchema)