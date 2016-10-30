var gulp = require('gulp');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

var config = {
    isProduction: (argv.prod) ? (true) : (false),
    src: {
        indexhtml: './app/index.html',
        app: ['./app/**/*.module.js', './app/**/*.js'],
        less: './app/less/app.less',
        lessWatch: './app/less/**/*.less',
        templates: './app/templates/**/*.html',
        img: './app/img/*.*',
        lib: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/fastclick/lib/fastclick.js',
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js'
        ],
        fontawesome: './node_modules/font-awesome/fonts/*.*',
        inject: [
            this.bld + '/lib*.js',
            this.bld + '/templates*.js',
            this.bld + '/app*.js',
            this.bld + '/app*.css'
        ],
        injectTo: this.bld + '/index.html',
        karma: __dirname + '/karma.conf.js'
    },
    bld: './bld',
    server: {
        port: 1337
    }
}

gulp.task('clean', require('./gulp-tasks/clean')(gulp, config));
gulp.task('jslib', require('./gulp-tasks/jslib')(gulp, config));
gulp.task('eslint', require('./gulp-tasks/eslint')(gulp, config));
gulp.task('jsapp', require('./gulp-tasks/jsapp')(gulp, config));
gulp.task('template-cache', require('./gulp-tasks/template-cache')(gulp, config));
gulp.task('less', require('./gulp-tasks/less')(gulp, config));
gulp.task('copy-indexhtml', require('./gulp-tasks/copy-indexhtml')(gulp, config));
gulp.task('copy-images', require('./gulp-tasks/copy-images')(gulp, config));
gulp.task('copy-fontawesome', require('./gulp-tasks/copy-fontawesome')(gulp, config));
gulp.task('inject', require('./gulp-tasks/inject')(gulp, config));
gulp.task('watcher', require('./gulp-tasks/watcher')(gulp, config));
gulp.task('connect', require('./gulp-tasks/connect')(config));
gulp.task('test', require('./gulp-tasks/test')(config));

gulp.task('build', function () {
    runSequence(
        'clean',
        ['jslib', 'eslint', 'jsapp', 'template-cache', 'less', 'copy-indexhtml', 'copy-images', 'copy-fontawesome'],
        'inject'
    );
});

gulp.task('default', ['build'], function () {
    runSequence(
        'watcher',
        'connect'
    );
});

gulp.task('test', ['build'], function () {
    runSequence('test');
});