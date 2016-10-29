var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var isProduction = (argv.prod) ? (true) : (false);
var resetInject = (argv.resetinject) ? (true) : (false);

var config = {
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