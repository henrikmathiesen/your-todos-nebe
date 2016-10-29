module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.indexhtml, { read: false })
            .pipe(gulp.dest(config.bld));
    };
};