const dbConnect = require('../../services/dbConnect');
const Role = require('./role-model')
const errorHandler = require('../../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    await dbConnect()
    try {
        const roles = await Role.find({});
        res.status(201).json({
            message: 'Роли найдены',
            data: roles
        })
    } catch (e) {
        //Обработать ошибку
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    // role
    await dbConnect()
    const candidate = await Role.findOne({roleName: req.body.roleName})

    if (candidate) {
        //Роль существует, нужно отдать ошибку
        res.status(409).json({
            message: 'Такая роль существует'
        })
    } else {
        // Нужно создать роль
        const role = new Role({
            roleName: req.body.roleName,
        })
        try {
            await role.save()
            res.status(201).json({
                message: 'Роль сохранен',
                data: role
            })
        } catch (e) {
            //Обработать ошибку
            errorHandler(res, e)
        }

    }
}

module.exports.update = async function (req, res) {
    try {
        await dbConnect()
        const role = await Role.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json({
            message: 'Роль была обновлена',
            data: role
        })
    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.remove = async function (req, res) {
    try {
        await dbConnect()
        await Role.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Роль была удалена',
            data: null
        })
    }catch (e) {
        errorHandler(res, e)
    }
}