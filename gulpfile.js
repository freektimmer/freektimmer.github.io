var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var src = {
    html:   ['*.html', '*.shtml'],
    scss:   ['dev/scss/**/*.scss'], 
    js:     ['dev/js/**/*.js']
}

var output = {
    scss:   'assets/css', 
    js:     'assets/js'
}

gulp.task('sass', function () {
    gulp.src(src.scss)
        .pipe(sass({ style: 'expanded' }))
        .on('error', gutil.log)
        .pipe(gulp.dest(output.scss))
        .pipe(browserSync.reload({stream: true}));
});             

gulp.task('js', function () {
    gulp.src(src.js)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(output.js))
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('commit', ['scss', 'js']);

gulp.task('default',['browser-sync'] , function () {
    gulp.watch(src.js, ['js']);
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', browserSync.reload);
});