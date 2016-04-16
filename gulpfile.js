var gulp = require('gulp');
var packageJson = require('./package.json');
var jade = require('gulp-jade');

//convert jade files to html
gulp.task('compile_jade', function() {
  console.log(jade);
  gulp.src('./src_app/*.jade')
    .pipe(jade({
      locals: {
        title: packageJson.name
      }
    }))
    .pipe(gulp.dest('./app/'))
});

//if jade files change, trigger convert task