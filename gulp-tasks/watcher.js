module.exports = function (gulp, config) {
    return function () {
        gulp.watch(config.src.app, ['jsapp']);
        gulp.watch(config.src.templates, ['template-cache']);
        gulp.watch(config.src.lessWatch, ['less']);
        gulp.watch(config.src.indexhtml, ['watch-indexhtml-task']);
    };
};