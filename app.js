'use strict';

var winston = require('winston');

var logTransports = [];

var consoleConfig = {
    timestamp: function() {
        return new Date().toString();
    },
    colorize: true,
    level: 'debug',
    levels : {debug: 0, info : 1, warn: 2, error: 3},
    colors : {debug: 'blue', info : 'green', warn: 'orange', error: 'red'},
    handleExeptions: true,
    humanReadableUnhandledException: true,
    json: false,
};

logTransports.push(new winston.transports.Console(consoleConfig));

var winstonLogger = new winston.Logger({
    transports: logTransports
});

module.exports =  {
    info: winstonLogger.info,
    warn: winstonLogger.warn,
    debug: winstonLogger.debug,
    error: winstonLogger.error
}
