/**********************
 *
 * VARS
 * * * * *
 **********************/
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var packageJson = require('./package.json');
var del = require('del');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

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


/**********************
 *
 * WATCH
 * * * * *
 **********************/
gulp.task('watch', function(){
  gulp.watch('./src_app/**/*.jade', ['compile_jade']);
  gulp.watch('./src_app/**/*.sass', ['compile_sass']);
  gulp.watch('./src_app/modules/**/*.js', ['']);
});

/**********************
 *
 * DEFAULT / INIT
 * * * * *
 **********************/
gulp.task('default', function(callback){
  runSequence([
    'compile_jade',
    'compile_sass'
    ],
    'watch',
    callback
  )
});