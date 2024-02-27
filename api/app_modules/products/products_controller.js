const Product = require("./products_model");
const errorHandler = require('../../utils/errorHandler')
const dbConnect = require('../../services/dbConnect');

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

module.exports.create = async function (req, res) {
    await dbConnect();
    // Пример проверки, что все необходимые поля предоставлены.
    const requiredFields = [
        'name',
        'vendorCode',
        'imageSrc',
        'drawingImageSrc',
        'price',
        'currency',
        'description',
        'unit',
        'catalog',
        'categories',
        'subCategories',
        'materialThickness',
    ];
    for (let fieldName of requiredFields) {
        if (!req.body[fieldName]) {
            return res.status(400).json({
                success: false,
                message: `Ошибка: Поле '${fieldName}' обязательно для заполнения.`
            });
        }
    }

    // Дальше идет создание нового продукта
    const product = new Product({
        // ...инициализация полей продукта из req.body...
        name: req.body.name,
        vendorCode: req.body.vendorCode,
        imageSrc: req.body.imageSrc,
        drawingImageSrc: req.body.drawingImageSrc,
        price: req.body.price,
        currency: req.body.currency,
        description: req.body.description,
        unit: req.body.unit,
        catalog: req.body.catalog,
        categories: req.body.categories,
        subCategories: req.body.subCategories,
        materialThickness: req.body.materialThickness,
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
}

module.exports.update = async function (req, res) {
    const allowedProperties = ['name',
        'vendorCode',
        'imageSrc',
        'drawingImageSrc',
        'price',
        'currency',
        'description',
        'unit',
        'catalog',
        'categories',
        'subCategories',
        'materialThickness',
    ];

    const updated = Object.keys(req.body)
        .filter(key => allowedProperties.includes(key))
        .reduce((obj, key) => {
            obj[key] = req.body[key];
            return obj;
        }, {});

    await dbConnect();
    try {
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            success: true,
            message: 'Товар обнавлен.',
            data: product
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function (req, res) {
    await dbConnect();
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Товар удален.',
            data: product
        })
    } catch (e) {
        errorHandler(res, e)
    }
}