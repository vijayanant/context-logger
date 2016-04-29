'use strict';

var _               = require('underscore');
var winston         = require('winston');
var cls             = require('continuation-local-storage');
var transportConfig = require('./transport-config');

var winstonLogger = null;
var delimiter = "|";

var namespace = cls.createNamespace('contextloggernamespace');

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
    winstonLogger.info.apply(null, constructLogMessage(constructContextString(), arguments));
};

var warn = function() {
    winstonLogger.warn.apply(null, constructLogMessage(constructContextString(), arguments));
};

var error = function(message) {
    winstonLogger.error.apply(null, constructLogMessage(constructContextString(), arguments));
};

var debug = function(message) {
    winstonLogger.debug.apply(null, constructLogMessage(constructContextString(), arguments));
};

var withContext = function(tracking, func) {
    // var namespace = cls.getNamespace('contextloggernamespace');
    // console.log(namespace);
    namespace.run(function(){
        namespace.set('trackingInfo', tracking);
        func();
    });
};

module.exports = function(config) {
    if (!config) {
        throw new Error('log configuration is required');
    }

    var logTransports = [];

    if (config.delimiter) {
        delimiter = config.delimiter;
    }

    var consoleConfig = _.extend(transportConfig.consoleConfig, config.consoleConfig || {});
    var consoleTransport   = new winston.transports.Console(consoleConfig);
    logTransports.push(consoleTransport);

    winstonLogger = new winston.Logger({
        transports: logTransports
    });

    return {
        warn: warn,
        info: info,
        debug: debug,
        error: error,
        withContext: withContext
    };
};
