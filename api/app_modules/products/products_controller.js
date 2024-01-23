const Product = require("./products_model");
const errorHandler = require('../../utils/errorHandler')
const dbConnect = require('../../services/dbConnect');
const mongoose = require("mongoose");

module.exports.getAll = async function (req, res) {
    await dbConnect();
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            message: 'Все Товары получены.',
            data: products
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
// module.exports.create = async function (req, res) {
//     await dbConnect()
//     console.log(req.body)
//     const product = new Product({
//         name: req.body.name,
//         vendorCode: req.body.vendorCode,
//         imageSrc: req.body.vendorCode,
//         drawingImageSrc: req.body.drawingImageSrc,
//         price: req.body.price,
//         currency_id: req.body.currency_id,
//         description: req.body.description,
//         unit_id: req.body.unit_id,
//         category_id: req.body.category_id,
//         categoryTypes_id: req.body.categoryTypes_id,
//     })
//     try {
//         console.log(typeof req.body.vendorCode)
//         const newProduct = await product.save()
//         res.status(201).json({
//             success: true,
//             message: 'Все Товары получены.',
//             data: newProduct
//         })
//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }
// }

module.exports.create = async function (req, res) {
    await dbConnect();

    // Пример проверки, что все необходимые поля предоставлены.
    const requiredFields = ['name', 'vendorCode', 'price', 'currency_id', 'unit_id', 'category_id', 'categoryTypes_id'];
    for (let fieldName of requiredFields) {
        if (!req.body[fieldName]) {
            return res.status(400).json({
                success: false,
                message: `Ошибка: Поле '${fieldName}' обязательно для заполнения.`
            });
        }
    }
    console.log("***************************", req.body.currency_id)

    // Дальше идет создание нового продукта
    const product = new Product({
        // ...инициализация полей продукта из req.body...
        name: req.body.name,
        vendorCode: req.body.vendorCode,
        imageSrc: req.body.vendorCode,
        drawingImageSrc: req.body.drawingImageSrc,
        price: req.body.price,
        currency_id: req.body.currency_id.selectedId,
        description: req.body.description,
        unit_id: req.body.unit_id.selectedId,
        category_id: req.body.category_id.selectedId,
        categoryTypes_id: req.body.categoryTypes_id.selectedId,
    });

    try {
        // Пытаемся сохранить продукт в базу данных
        const newProduct = await product.save();
        // Если успешно, возвращаем статус 201 и данные продукта
        res.status(201).json({
            success: true,
            message: 'Продукт успешно создан.',
            data: newProduct
        });
    } catch (err) {
        console.error(err); // Логируем ошибку для внутреннего пользования

        // Проверяем тип ошибки
        if (err.name === 'ValidationError') {
            res.status(400).json({
                success: false,
                message: 'Ошибка валидации: ' + err.message
            });
        } else {
            // Неизвестная ошибка сервера
            res.status(500).json({
                success: false,
                message: 'Произошла неизвестная ошибка при создании продукта.'
            });
        }
    }
};

module.exports.update = async function (req, res) {
    const allowedProperties = ['name',
        'vendorCode', 'imageSrc', 'drawingImageSrc', 'price', 'currency_id',
        'description', 'unit_id', 'category_id', 'categoryTypes_id'];

    const updated = Object.keys(req.body)
        .filter(key => allowedProperties.includes(key))
        .reduce((obj, key) => {
            obj[key] = req.body[key];
            return obj;
        }, {});
    // if (req.file) {
    //     updated.imageSrc = req.file.path
    // }
    await dbConnect();
    console.log(req.params.id)
    try {
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            success: true,
            message: 'Продукт обнавлен.',
            data: product
        })
    } catch (e) {
        errorHandler(res, e)
    }
}