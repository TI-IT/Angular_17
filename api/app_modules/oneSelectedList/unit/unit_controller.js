const Unit = require('./unit_model')
const errorHandler = require('../../../utils/errorHandler')
const dbConnect = require('../../../services/dbConnect');

module.exports.getAll = async function(req, res) {
    await dbConnect();
    try {
        const units = await Unit.find({})
        res.status(200).json({
            success: true,
            message: 'Все получены.',
            data: units
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function(req, res) {
    await dbConnect();
    try {
        const unit = await Unit.findById(req.params.id)
        res.status(200).json({
            success: true,
            message: 'unit найдена.',
            data: unit
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function(req, res) {
    await dbConnect();
    try {
        await Unit.remove({_id: req.params.id})
        res.status(200).json({
            success: true,
            message: 'unit удалена',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function(req, res) {
    await dbConnect();
    const unit = new Unit({
        unitName: req.body.unitName,
    })
    try {
        await unit.save()
        res.status(201).json({
            success: true,
            message: 'unit создана.',
            data: unit
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function(req, res) {
    const updated = {
        unitName: req.body.unitName
    }
    await dbConnect();
    try {
        const unit = await Unit.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            success: true,
            message: 'unit обнавлена.',
            data: unit
        })
    } catch (e) {
        errorHandler(res, e)
    }
}