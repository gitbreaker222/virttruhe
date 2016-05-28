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
var riot = require('gulp-riot');
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
 * RIOT TAGS
 * * * * *
 **********************/
gulp.task('compile_riot_tags', function(){
  gulp.src('src_app/**/*.tag')
    .pipe(riot())
    .pipe(gulp.dest('src_app'))
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
 * COPY DATA (ASSETS)
 * * * * *
 **********************/
gulp.task('delete:data', function() {
  return del.sync('app/data');
});

var data = {
  img :   './src_app/img/**/*.*',
  audio : './src_app/audio/**/*.*',
  items : './src_app/data/**/*.jpg'
};

gulp.task('copy_data', ['delete:data'], function() {
  gulp.src(data.img)
    .pipe(gulp.dest('./app/data/img'));
  gulp.src(data.audio)
    .pipe(gulp.dest('./app/data/audio'));
  gulp.src(data.items)
    .pipe(gulp.dest('./app/data/items'));
});


/**********************
 *
 * WATCH
 * * * * *
 **********************/
gulp.task('watch', function(){
  gulp.watch('./src_app/**/*.jade', ['compile_jade']);
  gulp.watch('./src_app/**/*.sass', ['compile_sass']);
  gulp.watch('src_app/**/*.tag', ['compile_riot_tags']);
  gulp.watch('./src_app/modules/{**/*.js, *.js}', ['concat_scripts']);
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
      'compile_riot_tags',
      'concat_scripts',
      'copy_data'
    ],
    'watch',
    callback
  )
});

