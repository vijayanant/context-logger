'use strict';

var winston = require('winston');
var cls = require('continuation-local-storage');

var delimiter = "|";
var namespace = cls.createNamespace('contextloggernamespace');

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

var constructLogMessage = function(prefix, args) {
    args[0] = prefix + args[0];
    return args;
};

var constructContextString = function() {
    var tracking = namespace.get('trackingInfo');
    if (tracking) {
        var trackingFields = [
            tracking.systemName || '',
            tracking.trackingId || '',
            tracking.useCase || '',
        ];
        /*
            Note: fields 'date', 'hostname', 'log type' are added by the winston logger
        */
        return trackingFields.join(delimiter) + delimiter;
    }
    return '';
};

var info = function() {
    var logArguments = constructLogMessage(constructContextString(), arguments);;
    winstonLogger.info.apply(null, logArguments);
};

var warn = function() {
    var logArguments = constructLogMessage(constructContextString(), arguments);;
    winstonLogger.warn.apply(null, logArguments);
};

var error = function(message) {
    var logArguments = constructLogMessage(constructContextString(), arguments);;
    winstonLogger.error.apply(null, logArguments);
};

var debug = function(message) {
    var logArguments = constructLogMessage(constructContextString(), arguments);;
    winstonLogger.debug.apply(null, logArguments);
};

module.exports =  {
    info: info,
    warn: warn,
    debug: debug,
    error: error
};
