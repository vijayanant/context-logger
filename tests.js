'use strict';

var log = require('./app');

var doLogging = function() {
    log.warn('this is a %s log from ContextLogger.', '"warning"');
    log.info('this is a %s log from ContextLogger.', '"info"');
    log.debug('this is a %s log from ContextLogger.', '"debug"');
    log.error('this is a %s log from ContextLogger.', '"error"');
}

var tracking = {
    trackingId: 'my trackingId',
    useCase: 'my usecase',
    systemName: ' System V',
};

console.log('\nlogging before setting namespace\n');
doLogging();

log.withContext(tracking, function() {
    console.log('\nlogging with trackingInfo');
    doLogging();
});
