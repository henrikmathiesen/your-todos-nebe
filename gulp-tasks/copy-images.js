module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.img)
            .pipe(gulp.dest(config.bld));
    };
};