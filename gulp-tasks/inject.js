var inject = require('gulp-inject');

module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.injectTo, { read: false })
            .pipe(inject(config.src.inject))
            .pipe(gulp.dest(config.bld));
    };
};