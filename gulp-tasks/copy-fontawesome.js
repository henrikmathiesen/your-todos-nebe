module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.fontawesome)
            .pipe(gulp.dest(config.bld));
    };
};