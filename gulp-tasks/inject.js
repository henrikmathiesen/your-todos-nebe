var inject = require('gulp-inject');

module.exports = function (gulp, config) {
    return function () {

        var target = gulp.src(config.src.injectTo);
        var sources = gulp.src(config.src.inject, { read: false });

        return target.pipe(inject(sources))
            .pipe(gulp.dest(config.bld));

    };
};