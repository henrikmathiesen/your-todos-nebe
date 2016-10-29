var gulpif = require('gulp-if');
var sourceMaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var size = require('gulp-size');
var rev = require('gulp-rev');

module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.less)
            .pipe(gulpif(!config.isProduction, sourceMaps.init()))

            .pipe(less())
            .pipe(autoprefix({ browsers: ['last 3 versions'] }))

            .pipe(gulpif(config.isProduction, size({ title: "css-app unmin" })))
            .pipe(gulpif(config.isProduction, cleanCss()))
            .pipe(gulpif(config.isProduction, size({ title: "css-app min" })))
            .pipe(gulpif(config.isProduction, rev()))

            .pipe(gulpif(!config.isProduction, sourceMaps.write()))
            .pipe(gulp.dest(config.bld));

    };
};