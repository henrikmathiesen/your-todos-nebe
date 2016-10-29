var gulp = require('gulp');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

var config = {
    isProduction: (argv.prod) ? (true) : (false),
    resetInject: (argv.resetinject) ? (true) : (false),
    src: {
        app: ['./app/**/*.module.js', './app/**/*.js'],
        less: './app/less/app.less',
        lessWatch: './app/less/**/*.less',
        templates: './app/templates/**/*.html',
        lib: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/fastclick/lib/fastclick.js',
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js'
        ],
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

gulp.task('connect', require('./gulp-tasks/connect')(config));
gulp.task('test', require('./gulp-tasks/test')(config));

// gulp.task('testing', function(){
//     plugins.runSequence(
//         'clean',
//         'jslib',
//         'eslint'
//     );
// });