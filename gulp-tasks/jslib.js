var gulpif = require('gulp-if');
var sourceMaps = require('gulp-sourcemaps');
var concatJs = require('gulp-concat');
var uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');
var size = require('gulp-size');
var rev = require('gulp-rev');

module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.lib)
            .pipe(gulpif(!config.isProduction, sourceMaps.init()))

            .pipe(concatJs('lib.js'))

            .pipe(gulpif(config.isProduction, size({ title: "js-lib unmin" })))
            .pipe(gulpif(config.isProduction, uglify({ preserveComments: saveLicense })))
            .pipe(gulpif(config.isProduction, size({ title: "js-lib min" })))
            .pipe(gulpif(config.isProduction, rev()))

            .pipe(gulpif(!config.isProduction, sourceMaps.write()))
            .pipe(gulp.dest(config.bld));
    };
};