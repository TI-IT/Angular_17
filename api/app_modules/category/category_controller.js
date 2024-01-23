const Category = require('./category_model')
const errorHandler = require('../../utils/errorHandler')
const dbConnect = require('../../services/dbConnect');

module.exports.getAll = async function(req, res) {
    await dbConnect();
    try {
        const categories = await Category.find({})
        res.status(200).json({
            success: true,
            message: 'Все категории получены.',
            data: categories
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function(req, res) {
    await dbConnect();
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Категория найдена.',
            data: category
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    await dbConnect();
    try {
        await Category.remove({_id: req.params.id})
        res.status(200).json({
            success: true,
            message: 'Категория удалена',
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function(req, res) {
    await dbConnect();
    const category = new Category({
        name: req.body.name,
        imageSrc: req.file ? req.file.path : '',
        _categoryTypesId: req.body._categoryTypesId
    })
    try {
        await category.save()
        res.status(201).json({
            success: true,
            message: 'Категория создана.',
            data: category
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
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            success: true,
            message: 'Категория обнавлена.',
            data: category
        })
    } catch (e) {
        errorHandler(res, e)
    }
}