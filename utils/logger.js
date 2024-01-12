const pino = require('pino');

const logger = pino({
    transport: {
        targets: [
            {
                level: 'info',
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
                    ignore: 'pid,hostname',
                },
            },
            {
                level: 'error',
                target: 'pino/file',
                options: {
                    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
                    ignore: 'pid,hostname',
                    destination: `${__dirname}/../school-manager.log`,
                },
            },
        ],
    }

});

module.exports = logger
