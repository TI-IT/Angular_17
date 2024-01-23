const {

    createLogger,
    format,
    transports
} = require("winston");
require('winston-mongodb');

const logger = createLogger({
    transports: [
        // new transports.MongoDB({
        //     db: process.env.MONGODB,
        //     level: 'silly',
        //     options: {
        //         useUnifiedTopology: true
        //     }
        // }),
        new transports.File({
            filename: "logs/error.log",
            level: "error",
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: "logs/info.log",
            level: "info",
            format: format.combine(format.timestamp(), format.json())
        }),
    ]
});
module.exports = logger;