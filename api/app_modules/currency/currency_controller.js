const Currency = require('./currency_model')
const errorHandler = require('../../utils/errorHandler')
const dbConnect = require('../../services/dbConnect');

module.exports.getAll = async function (req, res) {
    await dbConnect();
    try {
        const currency = await Currency.find({})
        res.status(200).json({
            success: true,
            message: 'Все получены.',
            data: currency
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    await dbConnect();
    try {
        const currency = await Currency.findById(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Currency найдена.',
            data: currency
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    await dbConnect();
    try {
        await Currency.remove({_id: req.params.id})
        res.status(200).json({
            success: true,
            message: 'Currency удалена',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    await dbConnect();
    const currency = new Currency({
        currencyName: req.body.currencyName,
    })
    try {
        await currency.save()
        res.status(201).json({
            success: true,
            message: 'Currency создана.',
            data: currency
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function (req, res) {
    const updated = {
        currencyName: req.body.currencyName
    }
    await dbConnect();
    try {
        const currency = await Currency.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            success: true,
            message: 'Currency обнавлена.',
            data: currency
        })
    } catch (e) {
        errorHandler(res, e)
    }
}