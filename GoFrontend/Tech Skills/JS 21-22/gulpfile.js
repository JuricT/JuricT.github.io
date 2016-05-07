//===================================
//          BUILD CONSTANTS
//===================================

var build           = './build/';//Место хранения сборки проекта

var imagesBuildPath = build + 'img/',
    cssBuildPath    = build + 'css/',
    jsBuildPath     = build + 'js/',
    fontBuildPath     = build + 'font/';

//===================================
//         RESOURCE CONCTANTS
//===================================

var projectDir  = './Project/';

var jsDir       = projectDir + 'js/';

var jadeDir     = projectDir + 'jade/',
    jadeTemp    = jadeDir + 'temp/';

var jsonDir     = projectDir + 'json/';

var sassDir     = projectDir + 'scss/',
    cssRes      = projectDir + 'css/';

var imgDir      = projectDir + 'img/',
    svgDir      = imgDir + 'svg/',
    svgMini     = imgDir + 'svg.min/';

var fontDir     = projectDir + 'fonts/';

//===================================
//             PLUGINS
//===================================

var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    jade        = require('gulp-jade'),
    // svgmin      = require('gulp-svgmin'),
    // imageop     = require('gulp-image-optimization'),
    sass        = require('gulp-sass'),
    clean       = require('gulp-clean'),
    // cleanCSS = require('gulp-clean-css'),
    concat      = require('gulp-concat'),
    data        = require('gulp-data'),
    fs   = require('fs'),
    uglify      = require('gulp-uglify');

//===================================
//               TASKS
//===================================

gulp.task('jade', function(){

  gulp.src(jadeDir +'index.jade')
  .pipe(data(function(file) {
      // return require(jsonDir + 'test-form.json');
      return JSON.parse(fs.readFileSync(jsonDir + 'test-form.json'));
    }))
  .pipe(jade({
      pretty: true
    }))
  .pipe(gulp.dest(build))
  .pipe(connect.reload());
});

gulp.task('script', function() {
  return gulp.src([jsDir + '**/*.js'])
  .pipe(concat('script.js', {newLine: ';'}))
  .pipe(uglify())
  .pipe(gulp.dest(jsBuildPath))
  .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(sassDir + '/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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

//===   FILES   ===

gulp.task('watch', function(){
  gulp.watch(jadeDir + '**/*.jade', function(){gulp.run('jade');});
  gulp.watch(jsonDir + '**/*.json', function(){gulp.run('jade');});
  gulp.watch(sassDir + '**/*.scss', function(){gulp.run('sass');});
  gulp.watch(jsDir + '**/*.js', function(){gulp.run('script');});
});

gulp.task('build-clean', function(){
  return gulp.src(build, {read: false})
    .pipe(clean());
});

//===================================
//           DEFAULT TASK
//===================================
// gulp.task('default', ['build-clean'], function(){
gulp.task('default', function(){
  gulp.run('jade', 'script', 'sass', 'connect', 'watch');
});
