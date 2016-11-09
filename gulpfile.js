'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin')
var jpeg = require('imagemin-jpegtran');
var png = require('imagemin-pngquant');
var imageResize = require('gulp-image-resize');
var del = require('del');

// Concatenate, minify, copy JavaScript file to dist folder
gulp.task('scripts', ['minify-js']);

// Minify JavaScript and place into dist folder
gulp.task('minify-js', ['concat'], () => {
  return gulp.src('dist/scripts/app.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
});

// Concatenate JavaScript files
gulp.task('concat', () => {
  return gulp.src('js/**/*.js')
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});

// This task perform Compile Sass and Minify CSS
gulp.task('styles', ['minify-css']);

// Minify CSS
gulp.task('minify-css', ['compile-css'], () => {
  return gulp.src('dist/styles/*.css')
    .pipe(maps.init())
    .pipe(cleanCSS())
    .pipe(maps.write())
    .pipe(gulp.dest('dist/styles'));
});

// Compile Sass into CSS
gulp.task('compile-css', () => {
  return gulp.src("sass/global.scss")
      .pipe(sass())
      .pipe(gulp.dest('dist/styles'));
});

// Optimise images
gulp.task('images', () => {
	return gulp.src(['images/*.*'])
		.pipe(imageResize({
			width:2500,
			height:1500
		}))
		.pipe(imagemin({
			progressive: true,
			use: [jpeg(),png()]
		}))
		.pipe(gulp.dest('dist/content'));
});

// Clean dist folder before starting build process
gulp.task('clean', () => {
  return del(['css', 'dist']);
});

// Build task
gulp.task('build', ['scripts', 'styles', 'images'], () => {
  gulp.src(['index.html', 'icons/**'], { base : './' })
    .pipe(gulp.dest('dist'));
});

// Main task
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
