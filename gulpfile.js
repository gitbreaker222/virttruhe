/**********************
 *
 * VARS
 * * * * *
 **********************/
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

var packageJson = require('./package.json');

/**********************
 *
 * JADE
 * * * * *
 **********************/
gulp.task('delete:index.html', function() {
  return del.sync('app/index.html');
});

gulp.task('compile_jade', ['delete:index.html'], function() {
  console.log(jade);
  gulp.src('./src_app/*.jade')
    .pipe(jade({
      locals: {
        title: packageJson.name
      }
    }))
    .pipe(gulp.dest('./app/'))
});

/**********************
 *
 * SASS
 * * * * *
 **********************/
gulp.task('delete:main.css', function() {
  return del.sync('app/style/main.css');
});

gulp.task('compile_sass', ['delete:main.css'], function(){
  gulp.src('src_app/style/main.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/style'))
});

/**********************
 *
 * SCRIPT
 * * * * *
 **********************/
gulp.task('delete:js', function() {
  return del.sync('app/js');
});

gulp.task('concat_scripts', ['delete:js'], function() {
  return gulp.src('./src_app/modules/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./app/js/'));
});


/**********************
 *
 * WATCH
 * * * * *
 **********************/
gulp.task('watch', function(){
  gulp.watch('./src_app/**/*.jade', ['compile_jade']);
  gulp.watch('./src_app/**/*.sass', ['compile_sass']);
  gulp.watch('./src_app/modules/**/*.js', ['concat_scripts']);
});

/**********************
 *
 * DEFAULT / INIT
 * * * * *
 **********************/
gulp.task('default', function(callback){
  runSequence([
    'compile_jade',
    'compile_sass',
    'concat_scripts'
    ],
    'watch',
    callback
  )
});