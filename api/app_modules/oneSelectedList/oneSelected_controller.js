const OneSelected = require('./oneSelected_model')
const errorHandler = require('../../utils/errorHandler')
const dbConnect = require('../../services/dbConnect');

module.exports.getAll = async function(req, res) {
    await dbConnect();
    try {
        const oneSelected = await OneSelected.find({})
        res.status(200).json({
            success: true,
            message: 'Все получены.',
            data: oneSelected
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function(req, res) {
    await dbConnect();
    try {
        const oneSelected = await OneSelected.findById(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Данные найдены',
            data: oneSelected
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function(req, res) {
    await dbConnect();
    try {
        await OneSelected.remove({_id: req.params.id})
        res.status(200).json({
            success: true,
            message: 'Данные удалены',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function(req, res) {
    await dbConnect();
    const oneSelected = new OneSelected({
        nameCategory: req.body.nameCategory,
        name: req.body.name,
    })
    try {
        await oneSelected.save()
        res.status(201).json({
            success: true,
            message: 'Категория создана.',
            data: oneSelected
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        nameCategory: req.body.nameCategory,
        name: req.body.name,
    }
    await dbConnect();
    try {
        const oneSelected = await OneSelected.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            success: true,
            message: 'Категория обнавлена.',
            data: oneSelected
        })
    } catch (e) {
        errorHandler(res, e)
    }
}