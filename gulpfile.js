'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

gulp.task('serve',['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(["sass/*.scss", "test-scss/*.scss"],['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass',function() {
    return gulp.src("test-scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('default',['serve']);

