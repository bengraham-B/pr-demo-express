const { createLogger, transports, format } = require('winston')
require('winston-daily-rotate-file');


const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return ` ${info.timestamp} - [${info.level.padEnd(7)}] - ${info.message}`

}))

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console({level: 'silly'}),
        new transports.File({filename: 'server.log', level: 'silly'}),
    ]
})

module.exports = logger