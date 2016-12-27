var runSequence = require('run-sequence');

module.exports = function (gulp, config) {

    gulp.task('watch-indexhtml-task', function () { 
        runSequence('copy-indexhtml', 'inject'); 
    });

    return function () {
        gulp.watch(config.src.app, ['jsapp']);
        gulp.watch(config.src.templates, ['template-cache']);
        gulp.watch(config.src.lessWatch, ['less']);
        gulp.watch(config.src.indexhtml, ['watch-indexhtml-task']);
    };
};