/**********************
 *
 * VARS
 * * * * *
 **********************/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var riot = require('gulp-riot');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var liveServer = require('gulp-live-server');

var packageJson = require('./package.json');

/**********************
 *
 * PUG
 * * * * *
 **********************/
gulp.task('delete:index.html', function () {
  return del.sync('app/index.html');
});

gulp.task('compile_pug', ['delete:index.html'], function () {
  gulp.src('./src_app/*.pug')
    .pipe(pug({
      locals: {
        title: packageJson.name
      }
    }))
    .pipe(gulp.dest('./app/'));
});

/**********************
 *
 * SASS
 * * * * *
 **********************/
gulp.task('delete:main.css', function () {
  return del.sync('app/style/main.css');
});

gulp.task('compile_sass', ['delete:main.css'], function () {
  gulp.src('src_app/style/main.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/style'));
});

/**********************
 *
 * RIOT TAGS
 * * * * *
 **********************/
gulp.task('compile_riot_tags', function () {
  return gulp.src('src_app/**/*.tag')
    .pipe(riot())
    //.pipe(rename(function (path) {
    //  path.extname = '.tag.js';
    //}))
    .pipe(concat('compiled-tags.tag.js'))
    .pipe(gulp.dest('src_app/.tmp/'));
});

/**********************
 *
 * SCRIPT
 * * * * *
 **********************/
var scripts = [
  'bower_components/detectrtc/DetectRTC.min.js',
  'bower_components/riot/riot.min.js',
  'bower_components/webrtc-adapter/release/adapter.js',
  'lib/qr-decoder.js',
  'src_app/.tmp/**/*.js',
  'src_app/**/*.js'
];

gulp.task('delete:js', function () {
  return del.sync('app/js');
});

gulp.task('concat_scripts', ['delete:js'], function () {
  return gulp.src(scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./app/js/'));
});

/**********************
 *
 * COPY DATA (ASSETS)
 * * * * *
 **********************/
gulp.task('delete:data', function () {
  return del.sync('app/data');
});

var data = {
  img: './src_app/img/**/*.*',
  audio: './src_app/audio/**/*.*',
  items: './src_app/data/items/**/*.{jpg,png}'
};

gulp.task('copy_data', ['delete:data'], function () {
  gulp.src(data.img)
    .pipe(gulp.dest('./app/data/img'));
  gulp.src(data.audio)
    .pipe(gulp.dest('./app/data/audio'));
  gulp.src(data.items)
    .pipe(gulp.dest('./app/data/items'));
});


/**********************
 *
 * SERVE
 * * * * *
 **********************/
gulp.task('serve', function () {
  var server = liveServer.static('app');
  server.start();
});


/**********************
 *
 * WATCH
 * * * * *
 **********************/
gulp.task('watch', function () {
  gulp.watch('./src_app/**/*.pug', ['compile_pug']);
  gulp.watch('./src_app/**/*.sass', ['compile_sass']);
  gulp.watch('src_app/**/*.tag', ['compile_riot_tags']);
  gulp.watch('./src_app/modules/{**/*.js, *.js}', ['concat_scripts']);
});


/**********************
 *
 * DEFAULT / INIT
 * * * * *
 **********************/
gulp.task('default', function (callback) {
  runSequence(
    [
      'compile_pug',
      'compile_sass',
      'compile_riot_tags',
      'concat_scripts',
      'copy_data'
    ],
    'watch',
    callback
  );
});

