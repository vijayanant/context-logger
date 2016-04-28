'use strict';

var log = require('./app');

var doLogging = function() {
    log.warn('this is a %s log from ContextLogger.', 'warning');
    log.info('this is a %s log from ContextLogger.', 'info');
    log.debug('this is a %s log from ContextLogger.', 'debug');
    log.error('this is a %s log from ContextLogger.', 'error');
}

doLogging();
