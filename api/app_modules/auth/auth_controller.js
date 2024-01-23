const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dbConnect = require('../../services/dbConnect');
const User = require('../users/users_model')
const errorHandler = require('../../utils/errorHandler')

const generateAccessToken = (userId, roles) => {
    const payloaad = {
        userId,
        roles
    }
    return jwt.sign(payloaad, process.env.JWT_KEYS, {expiresIn: '7d'})
}

module.exports.login = async function (req, res) {
    //проверяем на наличие user в db
    await dbConnect();
    const candidate = await User.findOne({email: req.body.email})
        .populate('role_id', ['roleName'])
    if (candidate) {
        //Пользователь существует, проверка паролья
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //Генерация токена, пароли совпали
            const token = generateAccessToken(candidate._id, candidate.role_id)
            const roles = []
            candidate.role_id.forEach(role => {
                roles.push(role.roleName)
            })

            res.status(200).json({
                message: 'Пользователь найден',
                token: `Bearer ${token}`,
                rolesArray: roles
            })
        } else {
            //Пароль не совподает, Ошибка
            res.status(401).json({
                message: 'Пароль не верный, Попробуйте снова.'
            })
        }
    } else {
        //Пользователя нет, Ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}

module.exports.register = async function (req, res) {
    // email password role
    await dbConnect()
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //Пользоваттель существует, нужно отдать ошибку
        res.status(409).json({
            message: 'Такой Email уже занят, попробуйте другой'
        })
    } else {
        //Шифруем пароль
        const salt = bcrypt.genSaltSync(13)
        const password = bcrypt.hashSync(req.body.password, salt)

        // Нужно создать пользователя
        const user = new User({
            name: req.body?.name,
            email: req.body.email,
            password: password,
            role_id: req.body.role_id,
        })
        try {
            await user.save()
            res.status(201).json({
                message: 'Пользователь сохранен',
                data: user
            })
        } catch (e) {
            //Обработать ошибку
            errorHandler(res, e)
        }

    }
}