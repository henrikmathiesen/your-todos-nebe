module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.task('clean', function(){
            plugins.del(config.bld);
        });
    };
};