var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('lint', function  () {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('webpack', function () {
    // gulp.src('./app.js')
    //     .pipe(webpack())
    //     .pipe(rename('bt-table.js'))
    //     .pipe(gulp.dest('dist/'))
    //     .pipe(rename('bt-table.min.js'))
    //     .pipe(uglify())
    //     .pipe(gulp.dest('./dist'));
    gulp.src('./dist/bt-table.js')
        .pipe(rename('bt-table.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function(){
    gulp.run('lint', 'webpack');
});