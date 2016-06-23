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
    babel       = require('gulp-babel'),
    connect     = require('gulp-connect'),
    del         = require('del'),
    fs          = require('fs'),
    jade        = require('gulp-jade'),
    sass        = require('gulp-sass'),
    Server      = require('karma').Server,
    svgSprite   = require('gulp-svg-sprite'),
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
  .pipe(babel())
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
  gulp.watch(jsonDir + '**/*.json', function(){gulp.run('jade');});
  gulp.watch(jsonDir + '**/*.html', function(){gulp.run('jade');});
  gulp.watch(sassDir + '**/*.scss', function(){gulp.run('sass');});
  gulp.watch(jsDir   + '**/*.js'  , function(){gulp.run('script');});
});

gulp.task('requirejsBuild', function() {
    rjs({
        baseUrl: build + 'js/app/main.js',
        out: 'requirejsBuild.js',
        shim: {
          'tmpl': {
            exports: 'tmpl'
          },
        paths: {
          'tmpl': '../../lib/template'
        }
        }
    })
        .pipe(gulp.dest('./delpoy/')); // pipe it to the output DIR
});

gulp.task('svg', function() {
    var stream = gulp.src('*.svg', {cwd: svgDir})
    .pipe(svgSprite({
        mode: {
            css: {     // Activate the «css» mode
                render: {
                    css: true  // Activate CSS output (with default options)
                }
            }
        },

    }))
    .pipe(gulp.dest(imagesBuildPath));

  gulp.src(imagesBuildPath + 'css/svg/*.svg')
    .pipe(gulp.dest(imagesBuildPath));

  return stream;
});

gulp.task('del', ['svg'], function () {
  del([imagesBuildPath + 'css']);
});

//===================================
//           TEST TASK
//===================================
gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//===================================
//           DEFAULT TASK
//===================================
gulp.task('default', function(){
  gulp.run('jade', 'script', 'sass', 'connect', 'watch');
});
