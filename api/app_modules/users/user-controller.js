const dbConnect = require('../../services/dbConnect');
const errorHandler = require('../../utils/errorHandler');
const User = require('./users_model');
const mongoose = require('mongoose'); // Добавлено для проверки ObjectId

module.exports.getAll = async function (req, res) {
    await dbConnect();
    try {
        const users = await User.find({})
            .populate('role_id');
        res.status(200).json({
            message: 'Пользователи найдены',
            data: users
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    await dbConnect();
    const candidate = await User.findOne({ value: req.body.value });

    if (candidate) {
        res.status(409).json({
            message: 'Такой пользователь существует'
        });
    } else {
        const user = new User({
            value: req.body.value,
        });

        try {
            await user.save();
            res.status(201).json({
                message: 'Пользователь сохранен',
                data: user
            });
        } catch (e) {
            errorHandler(res, e);
        }
    }
};

module.exports.update = async function (req, res) {
    await dbConnect();
    try {
        const { name, email, role_id } = req.body;
        console.log('Received role_id', role_id);

        if (Array.isArray(role_id) && role_id.every(id => mongoose.isValidObjectId(id))) {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { name, email, role_id } }, // обновляем только нужные поля
                { new: true }
            );

            console.log(user); // добавьте эту строку, чтобы увидеть объект пользователя после обновления

            res.status(200).json({
                message: 'Пользователь был обновлен',
                data: user
            });
        } else {
            res.status(400).json({
                message: 'Неверные данные для обновления',
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        await dbConnect();
        await User.remove({ _id: req.params.id });
        res.status(200).json({
            message: 'Пользователь был удален',
            data: null
        });
    } catch (e) {
        errorHandler(res, e);
    }
};
