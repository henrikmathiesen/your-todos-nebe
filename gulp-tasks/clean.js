module.exports = function (gulp, config, plugins) {
    return function () {
        // return gulp.task('clean', function () {
        // });
        return plugins.del(config.bld);
    };
};