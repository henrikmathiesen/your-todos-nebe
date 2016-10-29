module.exports = function (gulp, config, plugins) {
    return function () {
        return gulp
        .src(config.src.app)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
    };
};