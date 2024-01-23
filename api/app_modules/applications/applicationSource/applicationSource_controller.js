const dbConnect = require("../../../services/dbConnect");
const ApplicationSource = require("./applicationSource_model");
const errorHandler = require("../../../utils/errorHandler");

module.exports.getAll = async function(req, res) {
    await dbConnect();
    try {
        const applicationSources = await ApplicationSource.find();
        res.json({
            success: true,
            message: 'Все источники приложения получены.',
            data: applicationSources
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

// Получение источника приложения по ID
module.exports.getById = async function(req, res) {
    await dbConnect();
    try {
        const applicationSource = await ApplicationSource.findById(req.params.id);
        if (!applicationSource) {
            return res.status(404).json({ message: 'Источник приложения не найден.' });
        }
        res.json(applicationSource);
    } catch (e) {
        errorHandler(res, e);
    }
};

// Удаление источника приложения
module.exports.remove = async function(req, res) {
    await dbConnect();
    try {
        const applicationSource = await ApplicationSource.findById(req.params.id);
        if (!applicationSource) {
            return res.status(404).json({ message: 'Источник приложения не найден для удаления.' });
        }
        await applicationSource.remove();
        res.status(200).json({ message: 'Источник приложения удален.' });
    } catch (e) {
        errorHandler(res, e);
    }
};

// Создание нового источника приложения
module.exports.create = async function(req, res) {
    await dbConnect();
    const applicationSource = new ApplicationSource({
        applicationSourceName: req.body.applicationSourceName,
        description: req.body.description // Assuming you want to include a description as well
    });
    try {
        const newApplicationSource = await applicationSource.save();
        res.status(201).json(newApplicationSource);
    } catch (err) {
        errorHandler(res, err);
    }
};

// Обновление существующего источника приложения
module.exports.update = async function(req, res) {
    await dbConnect();
    try {
        const applicationSource = await ApplicationSource.findById(req.params.id);
        if (!applicationSource) {
            return res.status(404).json({ message: 'Источник приложения не найден для обновления.' });
        }
        applicationSource.applicationSourceName = req.body.applicationSourceName || applicationSource.applicationSourceName;
        applicationSource.description = req.body.description || applicationSource.description;

        const updatedApplicationSource = await applicationSource.save();
        res.status(200).json(updatedApplicationSource);
    } catch (err) {
        errorHandler(res, err);
    }
};
