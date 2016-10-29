var eslint = require('gulp-eslint');

module.exports = function (gulp, config) {
    return function () {
        return gulp
            .src(config.src.app)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
};