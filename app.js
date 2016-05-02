'use strict';

var cls = require('continuation-local-storage');

var logger = null;
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
        return trackingFields.join(delimiter) + delimiter;
    }
    return '';
};

var info = function() {
    logger.info.apply(null, constructLogMessage(constructContextString(), arguments));
};

var warn = function() {
    logger.warn.apply(null, constructLogMessage(constructContextString(), arguments));
};

var error = function(message) {
    logger.error.apply(null, constructLogMessage(constructContextString(), arguments));
};

var debug = function(message) {
    logger.debug.apply(null, constructLogMessage(constructContextString(), arguments));
};

var withContext = function(tracking, func) {
    namespace.run(function(){
        namespace.set('trackingInfo', tracking);
        func();
    });
};

module.exports = function(loggerInstance) {
    if (!loggerInstance) {
        throw new Error('logger instance is required');
    }

    logger = loggerInstance;

    return {
        warn: warn,
        info: info,
        debug: debug,
        error: error,
        withContext: withContext
    };
};
