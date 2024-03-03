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
        // new transports.DailyRotateFile({
        //     filename: 'server-%Date%/log',
        //     datePattern: "DD-MM-YY",
        //     zippedArchieved: false,
        //     maxFiles: '7d'
        // })

    ]
})

module.exports = logger

// const logger = createLogger({
//     format: customFormat,
//     transports: [
//       new transports.Console({ level: 'silly' }),
//       new transports.File({
//         filename: 'server.log',
//         level: 'silly',
//       }),
//       new transports.DailyRotateFile({
//         filename: 'server-%DATE%.log',
//         datePattern: 'YYYY-MM-DD',
//         zippedArchive: true,
//         maxSize: '20m',
//         maxFiles: '14d', // Keep logs for the last 14 days
//       }),
//     ],
//   });
  
//   module.exports = logger;