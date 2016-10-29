var gulp = require('gulp');

var plugins = {
    argv: require('yargs').argv,
    gulpif: require('gulp-if'),
    del: require('del'),

    esLint: require('gulp-eslint'),
    concatJs: require('gulp-concat'),
    stripDebug: require('gulp-strip-debug'),
    ngAnnotate: require('gulp-ng-annotate'),
    templateCache: require('gulp-angular-templatecache'),
    saveLicense: require('uglify-save-license'),
    minifyJs: require('gulp-uglify'),

    less: require('gulp-less'),
    autoprefix: require('gulp-autoprefixer'),
    minifyCss: require('gulp-clean-css'),

    sourceMaps: require('gulp-sourcemaps'),
    rev: require('gulp-rev'),
    inject: require('gulp-inject'),
    size: require('gulp-size'),

    Server: require('karma').Server
}

var config = {
    isProduction: (plugins.argv.prod) ? (true) : (false),
    resetInject: (plugins.argv.resetinject) ? (true) : (false),
    src: {
        app: ['./app/**/*.module.js', './app/**/*.js'],
        lib: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/fastclick/lib/fastclick.js',
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js'
        ]
    },
    bld: './bld',
    server: {

    }
}

gulp.task('clean', require('./gulp-tasks/clean')(gulp, config, plugins));