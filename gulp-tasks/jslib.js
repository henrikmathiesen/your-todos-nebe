var gulpif = require('gulp-if');
var sourceMaps = require('gulp-sourcemaps');
var concatJs = require('gulp-concat');
var minifyJs = require('gulp-uglify');
var size = require('gulp-size');
var rev = require('gulp-rev');
var saveLicense = require('uglify-save-license');

module.exports = function (gulp, config) {
    return function () {
        return gulp
        .src(config.src.lib)
        .pipe(gulpif(!config.isProduction, sourceMaps.init()))

        .pipe(concatJs('lib.js'))

        .pipe(gulpif(config.isProduction, size({ title: "js-lib unmin" })))
        .pipe(gulpif(config.isProduction, minifyJs({ preserveComments: saveLicense })))
        .pipe(gulpif(config.isProduction, size({ title: "js-lib min" })))
        .pipe(gulpif(config.isProduction, rev()))

        .pipe(gulpif(!config.isProduction, sourceMaps.write()))
        .pipe(gulp.dest(config.bld));
    };
};