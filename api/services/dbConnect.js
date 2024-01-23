
require('dotenv').config();
const mongoose = require('mongoose');
function dbConnect() {
    if(mongoose.connection.readyState == 1) {
        return mongoose.connection.db
    }

    let url = (process.env.NODE_ENV === 'development '
            ? process.env.MONGO_DEV_URL
            : process.env.MONGO_PRODUCTION_URL)

    let options = {
        user: process.env.NODE_ENV === 'development '
            ? process.env.MONGO_DEV_USERNAME
            : process.env.MONGO_PRODUCTION_USERNAME,
        pass:
            process.env.NODE_ENV === 'development '
                ? process.env.MONGO_DEV_PASSWORD
                : process.env.MONGO_PRODUCTION_PASSWORD,
        auth: { authSource: 'crm' },
    }
    // подключение к базе данных
    mongoose.connect(url,options, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

// Событие успешного подключения
    mongoose.connection.on('connected', () => {
        console.log(`Подключено к MongoDB на адресе: ${
            process.env.NODE_ENV === 'development '
            ? process.env.MONGO_DEV_URL
            : process.env.MONGO_PRODUCTION_URL}`);
    });

// Событие ошибки подключения
    mongoose.connection.on('error', (err) => {
        console.log(`Не удалось подключиться к MongoDB: ${err}`);
    });

// Событие отключения от базы данных
    mongoose.connection.on('disconnected', () => {
        console.log('Отключение от MongoDB');
    });

// Приложение завершится, если произойдет ошибка подключения
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Приложение завершено. Отключение от MongoDB');
            process.exit(0);
        });
    });
}

module.exports = dbConnect