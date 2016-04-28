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

module.exports = {
    consoleConfig: consoleConfig
};
