'use strict';

var gulp = require('gulp');

/**
 * Compile styles
 */
gulp.task('styles', function() {
    var sass = require('gulp-sass');
    return gulp.src(['./styles/**/*.scss'], { base: './' })
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: './node_modules/@syncfusion/'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('bundle', function(done) {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    webpack(webpackConfig, function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        done();
    });
});

/**
 * Run the samples
 */
gulp.task('serve', function(done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2 for Angular');
    var options = {
        server: {
            baseDir: './'
        },
        ui: false
    };
    bs.init(options, done);
});