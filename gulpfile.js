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
var coffee = require('gulp-coffee');
var coffeeStream = coffee({bare: true});

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
coffeeStream.on('error', function(err) {});

gulp.task('delete:js', function() {
  return del.sync('app/js');
});

//FIXME compiled js should not be deleted if error in source
gulp.task('compile_coffee', function(){
  gulp.src('src_app/modules/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('app/js'))
});

/**********************
 *
 * WATCH
 * * * * *
 **********************/
gulp.task('watch', function(){
  gulp.watch('./src_app/**/*.jade', ['compile_jade']);
  gulp.watch('./src_app/**/*.sass', ['compile_sass']);
  gulp.watch('./src_app/modules/**/*.coffee', ['compile_coffee']);
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
    'compile_coffee'
    ],
    'watch',
    callback
  )
});