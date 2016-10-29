var Server = require('karma').Server;

module.exports = function (config) {
    return function () {
        new Server({
            configFile: config.src.karma
        }).start();
    };
};