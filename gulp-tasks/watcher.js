var runSequence = require('run-sequence');

module.exports = function (gulp, config) {

    return function () {
        gulp.watch(config.src.app, function () {
            runSequence('eslint', 'jsapp');
        });

        gulp.watch(config.src.templates, ['template-cache']);
        gulp.watch(config.src.lessWatch, ['less']);

        gulp.watch(config.src.indexhtml, function () {
            runSequence('copy-indexhtml', 'inject');
        });
    };
};
