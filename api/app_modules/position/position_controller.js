const Position = require('./position_model')
const errorHandler = require('../../utils/errorHandler')
const dbConnect = require('../../services/dbConnect');

module.exports.getByCategoryId = async function (req, res) {
    await dbConnect();
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json({
            message: 'ok',
            data: positions
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    await dbConnect();
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json({
            message: 'ok',
            data: position
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    await dbConnect();
    try {
        await Position.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function (req, res) {
    await dbConnect();
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json({
            message: 'Позиция была обновлена.',
            data: position
        })
    } catch (e) {
        errorHandler(res, e)
    }
}