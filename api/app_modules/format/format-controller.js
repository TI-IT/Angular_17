const errorHandler = require('../../utils/errorHandler')
const { format } = require('@vicimpa/rubles');

module.exports.getAll = async function (req, res) {
    let formatText
    if(req.body.data) {
        formatText = format(req.body.data)
    }
    try {
        res.status(201).json({
            message: 'Ok',
            data: formatText
        })
    } catch (e) {
        //Обработать ошибку
        errorHandler(res, e)
    }
}