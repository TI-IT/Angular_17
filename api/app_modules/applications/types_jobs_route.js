const express = require('express')
const dbConnect = require('../../services/dbConnect')
const router = express.Router()
const Types_jobs = require('./types_jobs_model')

// dbConnect вызывается один раз в начале, где-то в основном файле, например app.js

// Получение всех
router.get('/', async (req, res) => {
    try {
        const typesJobs = await Types_jobs.find({});
        res.json({
            message: 'Получены виды работ',
            data: typesJobs
        });
    } catch (err) {
        res.status(500).json({ message: "Ошибка при получении данных: " + err.message }); // Пример обработки ошибок
    }
});

// Получение одного по ID
router.get('/:id', getTypesJobs, (req, res) => {
    res.json(res.typesJobs);
});

// Создание одного
router.post('/', async (req, res) => {
    const typesJobs = new Types_jobs({
        typesJobsName: req.body.typesJobsName
    });
    // Тут нет необходимости каждый раз подключаться к БД, если она уже подключена
    try {
        const newTypesJobs = await typesJobs.save();
        res.status(201).json(newTypesJobs);
    } catch (err) {
        res.status(400).json({ message: "Ошибка при создании: " + err.message });
    }
});

// Обновление одного
router.patch('/:id', getTypesJobs, async (req, res) => {
    if (req.body.typesJobsName) {
        res.typesJobs.typesJobsName = req.body.typesJobsName;
    }
    try {
        const updatedTypesJob = await res.typesJobs.save();
        res.json(updatedTypesJob);
    } catch (err) {
        res.status(400).json({ message: "Ошибка при обновлении: " + err.message });
    }
});

// Удаление одного
router.delete('/:id', getTypesJobs, async (req, res) => {
    try {
        await res.typesJobs.deleteOne();
        res.json({ message: 'Вид работы удалён' });
    } catch (err) {
        res.status(500).json({ message: "Ошибка при удалении: " + err.message });
    }
});

// Промежуточный обработчик для получения объекта по ID
async function getTypesJobs(req, res, next) {
    let typesJobs;
    try {
        typesJobs = await Types_jobs.findById(req.params.id);
        if (typesJobs == null) {
            return res.status(404).json({ message: 'Не удалось найти вид работы' });
        }
    } catch (err) {
        return res.status(500).json({ message: "Ошибка сервера: " + err.message });
    }

    res.typesJobs = typesJobs;
    next();
}

module.exports = router;


