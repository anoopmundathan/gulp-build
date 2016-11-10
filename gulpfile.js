'use strict';

// Import all required modules
var gulp = require('gulp');
var del = require('del');

var htmlmin = require('gulp-htmlmin');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');

// Image optimisation
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin')
var jpeg = require('imagemin-jpegtran');
var png = require('imagemin-pngquant');

var browserSync = require('browser-sync');

// HTML minification
gulp.task('htmlmin', () => {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

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
    .pipe(rename('all.min.css'))
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

// Lint JavaScript
gulp.task('lint', function() {
  return gulp.src('js/circle/circle.js')
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});

// Clean dist folder before starting build process
gulp.task('clean', () => {
  return del(['css', 'dist']);
});

// Build task
gulp.task('build', ['htmlmin', 'scripts', 'styles', 'images'], () => {
  gulp.src('icons/**', { base : './' })
    .pipe(gulp.dest('dist'));
});

// watch files for changes and reload
gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

// Main task
gulp.task('default', ['clean', 'lint'], () => {
  gulp.start('build');
});
