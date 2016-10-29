module.exports = function (gulp, config, plugins) {
    return function () {
        return plugins.del(config.bld);
    };
};