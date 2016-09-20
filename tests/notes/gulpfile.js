//===================================
//          BUILD CONSTANTS
//===================================

var build           = './build/';

var cssBuildPath    = build + 'css/',
    jsBuildPath     = build + 'js/';

//===================================
//         RESOURCE CONCTANTS
//===================================

var projectDir  = './Project/';

var jsDir       = projectDir + 'js/';

var jadeDir     = projectDir + 'jade/',
    jadeTemp    = jadeDir + 'temp/';

var sassDir     = projectDir + 'scss/',
    cssRes      = projectDir + 'css/';

//===================================
//             PLUGINS
//===================================

var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    del         = require('del'),
    fs          = require('fs'),
    jade        = require('gulp-jade'),
    sass        = require('gulp-sass'),
    rjs         = require('gulp-requirejs');

//===================================
//               TASKS
//===================================

gulp.task('jade', function(){
  gulp.src(jadeDir +'index.jade')
  .pipe(jade({
      pretty: true
    }))
  .pipe(gulp.dest(build))
  .pipe(connect.reload());
});

gulp.task('script', function() {
  return gulp.src([jsDir + '**/*.js'])
  .pipe(gulp.dest(jsBuildPath))
  .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(sassDir + '/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(cssBuildPath))
  .pipe(connect.reload());
});

//=== CONNECT ===

gulp.task('connect', function(){
  connect.server({
    port: 1337,
    root: build,
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch(jadeDir + '**/*.jade', function(){gulp.run('jade');});
  gulp.watch(jadeDir + '**/*.html', function(){gulp.run('jade');});
  gulp.watch(sassDir + '**/*.scss', function(){gulp.run('sass');});
  gulp.watch(jsDir   + '**/*.js'  , function(){gulp.run('script');});
});

//===================================
//           DEFAULT TASK
//===================================
gulp.task('default', function(){
  gulp.run('jade', 'script', 'sass', 'connect', 'watch');
});

//===================================
//           BUILD TASK
//===================================
gulp.task('build', ['svg'], function(){
  gulp.run('jade', 'script', 'sass');
});
