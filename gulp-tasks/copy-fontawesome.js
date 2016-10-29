module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.fontawesome, { read: false })
            .pipe(gulp.dest(config.bld));
    };
};