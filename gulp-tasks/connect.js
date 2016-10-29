var connect = require('gulp-connect');

module.exports = function (config) {
    return function () {
        connect.server({
            root: config.bld,
            port: config.server.port
        });
    };
};