/// <reference path="./typings/index.d.ts" />

module.exports = function (config) {

    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            // we dont include angular-mocks here since it is included in lib (we are using $httpBackend for backend less development)
            './bld/lib.js',
            './bld/templates.js',
            './bld/app.js',
            './tst/**/*.js'
        ],
        logLevel: config.LOG_DISABLE,
        singleRun: true,
        autoWatch: false
    });

}
