const CategoryTypes = require('./categoryTypes_model')
const Position = require("../position/position_model");

const errorHandler = require('../../utils/errorHandler')
const dbConnect = require('../../services/dbConnect');

module.exports.getAll = async function(req, res) {
    await dbConnect();
    try {
        const categories = await CategoryTypes.find({})
        res.status(200).json({
            success: true,
            message: 'Все Виды категорий получены.',
            data: categories
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function(req, res) {
    await dbConnect();
    try {
        const category = await CategoryTypes.findById(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Вид Категории найдена.',
            data: category
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function(req, res) {
    await dbConnect();
    try {
        await CategoryTypes.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.status(200).json({
            success: true,
            message: 'Вид Категории удалена',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function(req, res) {
    console.log(req.body)
    await dbConnect();
    const categoryTypes = new CategoryTypes({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : '',

    })
    try {
        await categoryTypes.save()
        res.status(201).json({
            success: true,
            message: 'Вид Категории создана.',
            data: categoryTypes
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function(req, res) {
    const updated = {
        name: req.body.name
    }
    if(req.file){
        updated.imageSrc = req.file.path
    }
    await dbConnect();
    try {
        const category = await CategoryTypes.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            success: true,
            message: 'Вид Категории обнавлена.',
            data: category
        })
    } catch (e) {
        errorHandler(res, e)
    }
}