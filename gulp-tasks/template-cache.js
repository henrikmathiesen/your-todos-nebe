var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');

module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.templates)
            .pipe(templateCache('templates.js', { module: 'templatecache', standalone: true }))
            .pipe(gulpif(config.isProduction, rev()))
            .pipe(gulp.dest(config.bld));
    };
};