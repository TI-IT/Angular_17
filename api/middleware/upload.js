const multer = require('multer')
const moment = require('moment')
const dbConnect = require("../services/dbConnect");
const Category = require("../app_modules/category/category_model");
const fs = require('fs');

// Конфигурируем местоположение и название файлов
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
});

// Филтруем файлы на загрузку
const fileFilter = async (req, file, cb) => {
    await dbConnect()
    let saveImage = true

    // Проверяем на существование категории перед добавлением
    const candidate = await Category.findOne({name: req.body.name})
    if (req.method === 'POST' && candidate){
        saveImage = false
    }

    // Проверяем на обновление категории и удаление старой картинки
    if (req.method === 'PATCH' && candidate) {
        // Получите путь к файлу, который нужно удалить
        const filePath = candidate.imageSrc;
        // Удалите файл с помощью функции unlink
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error while deleting the file:', err);
                // Обработка ошибок как вы предпочитаете, например, отправить сообщение об ошибке на ответе
            } else {
                console.log('File deleted successfully');
                // Продолжайте с обработкой запроса после успешного удаления файла
            }
        });
    }

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, saveImage);
    } else {
        cb(new Error('Only .png and .jpeg format allowed!'), false);
    }
}

// Установка Лимита размера файла
const limits = {
    fileSize: 1024 * 1024 * 5 // 5 MB
}

const upload = multer({storage, fileFilter, limits})

module.exports = upload