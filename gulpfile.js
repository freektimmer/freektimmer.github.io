var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
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
        .pipe(sass({ 
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss())
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