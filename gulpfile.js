const gulp = require('gulp');
const render = require('gulp-nunjucks-render');

gulp.task('render', function() {
    render.nunjucks.configure(['site/templates/', 'site/layouts/'], { watch: false });
    gulp.src('site/pages/**/*.html')
        .pipe(render())
        .pipe(gulp.dest('dist'));
});