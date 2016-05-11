'use strict';

var winston = require('winston');
var log = require('./app')(winston);

var doLogging = function() {
    log.warn('this is a %s log from ContextLogger.', '"warning"');
    log.info('this is a %s log from ContextLogger.', '"info"');
    log.debug('this is a %s log from ContextLogger.', '"debug"');
    log.error('this is a %s log from ContextLogger.', '"error"');
}

log.setTrackingFields(['trackingId', 'useCase', 'systemName']);
var tracking = {
    trackingId: 'my trackingId',
    useCase: 'my usecase',
    systemName: ' System V',
};

console.log('\nlogging without context\n');
doLogging();

log.withContext(tracking, function() {
    console.log('\nlogging with context');
    doLogging();
});
