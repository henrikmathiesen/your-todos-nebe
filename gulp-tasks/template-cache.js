var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.templates)
            .pipe(templateCache('templates.js', { module: 'templatecache', standalone: true }))
            .pipe(gulp.dest(config.bld));
    };
};