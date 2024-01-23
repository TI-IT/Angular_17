const app = require('./app')
const port = process.env.DEV_PORT || 3000
const logger = require('./services/logger')
// Запуск сервера
app.listen(port, function () {
    console.log('Сервер запущен на порту ' + port);
    logger.log('info', 'Сервер запущен на порту ' + port);
});