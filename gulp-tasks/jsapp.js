var gulpif = require('gulp-if');
var sourceMaps = require('gulp-sourcemaps');
var concatJs = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var size = require('gulp-size');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.app)
            .pipe(gulpif(!config.isProduction, sourceMaps.init()))

            .pipe(concatJs('app.js'))
            .pipe(ngAnnotate())

            .pipe(gulpif(config.isProduction, size({ title: "js-app unmin" })))
            .pipe(gulpif(config.isProduction, stripDebug()))
            .pipe(gulpif(config.isProduction, uglify()))
            .pipe(gulpif(config.isProduction, size({ title: "js-app min" })))
            .pipe(gulpif(config.isProduction, rev()))

            .pipe(gulpif(!config.isProduction, sourceMaps.write()))
            .pipe(gulp.dest(config.bld));
    };
};