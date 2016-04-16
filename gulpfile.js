var gulp = require('gulp');
var packageJson = require('./package.json');
var del = require('del');
var jade = require('gulp-jade');

gulp.task('delete:index.html', function() {
  return del.sync('app/index.html');
});

//convert jade files to html
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


gulp.task('watch', function(){
  gulp.watch('./src_app/**/*.jade', ['compile_jade']);
});