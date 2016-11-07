var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Concatenate, minify, copy to dist folder
gulp.task('scripts', ['concat', 'uglify'],function() {

});

// Concatenate
gulp.task('concat', function() {
  gulp.src('./js/**/*.js')
    .pipe(concat('final.js'))
    .pipe(gulp.dest('./js'));
});

// Minify
gulp.task('uglify', function() {
  console.log('uglify');
});

// Uglify

// Sass compilation

// Compress Images

// Clean

gulp.task('default', ['scripts'], function() {
  console.log('All tasks are completed');
});
