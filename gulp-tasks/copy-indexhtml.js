module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.indexhtml)
            .pipe(gulp.dest(config.bld));
    };
};