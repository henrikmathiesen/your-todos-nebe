module.exports = function (gulp, config, plugins) {
    return function () {
        return gulp
        .src(config.src.lib)
        .pipe(plugins.gulpif(!config.isProduction, plugins.sourceMaps.init()))

        .pipe(plugins.concatJs('lib.js'))

        .pipe(plugins.gulpif(config.isProduction, plugins.size({ title: "js-lib unmin" })))
        .pipe(plugins.gulpif(config.isProduction, plugins.minifyJs({ preserveComments: plugins.saveLicense })))
        .pipe(plugins.gulpif(config.isProduction, plugins.size({ title: "js-lib min" })))
        .pipe(plugins.gulpif(config.isProduction, plugins.rev()))

        .pipe(plugins.gulpif(!config.isProduction, plugins.sourceMaps.write()))
        .pipe(gulp.dest(config.bld));
    };
};