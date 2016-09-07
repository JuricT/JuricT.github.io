//===================================
//          BUILD CONSTANTS
//===================================

var BUILD           = './build/';

var IMAGES_BUILD_PATH = BUILD + 'img/';
var CSS_BUILD_PATH    = BUILD + 'css/';
var JS_BUILD_PATH     = BUILD + 'js/';
var FONT_BUILD_PATH     = BUILD + 'font/';

//===================================
//         RESOURCE CONCTANTS
//===================================

var PROJECT_DIR  = './project/';

var JS_DIR       = PROJECT_DIR + 'js/';

var JADE_DIR     = PROJECT_DIR + 'jade/';
var JADE_TEMP    = JADE_DIR + 'temp/';

var JSON_DIR     = PROJECT_DIR + 'json/';

var SASS_DIR     = PROJECT_DIR + 'scss/';
var CSS_RES      = PROJECT_DIR + 'css/';

var IMG_DIR      = PROJECT_DIR + 'img/';
var SVG_DIR      = IMG_DIR + 'svg/';
var SVG_MINI     = IMG_DIR + 'svg.min/';

var FONT_DIR     = PROJECT_DIR + 'fonts/';

//===================================
//             PLUGINS
//===================================

var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

//===================================
//               TASKS
//===================================

gulp.task('jade', function(){
  gulp.src(JADE_DIR +'index.jade')
  .pipe(plugins.plumber())
  .pipe(plugins.jade({
      pretty: true
    }))
  .pipe(gulp.dest(BUILD))
  .pipe(plugins.connect.reload());
});

gulp.task('script', function() {
  return gulp.src([JS_DIR + '**/*.js'])
  .pipe(plugins.plumber())
  .pipe(gulp.dest(JS_BUILD_PATH))
  .pipe(plugins.connect.reload());
});

gulp.task('sass', function () {
  gulp.src(SASS_DIR + '/**/*.scss')
  .pipe(plugins.sass(
    // {outputStyle: 'compressed'}
  ).on('error', plugins.sass.logError))
  .pipe(plugins.autoprefixer({
      browsers: ['ie >= 8','last 2 versions'],
      cascade: false
    }))
  .pipe(gulp.dest(CSS_BUILD_PATH))
  .pipe(plugins.connect.reload());
});

//===   IMG   ===

gulp.task('copyIMG', function() {
  gulp.src(IMG_DIR + '/*.*')
  .pipe(gulp.dest(IMAGES_BUILD_PATH));
});

gulp.task('svgSprite', function() {
  var stream = gulp.src('*.svg', {cwd: SVG_DIR})
    .pipe(plugins.svgSprite({
      shape: {
        spacing: {
          padding: 5
        }
      },
      mode: {
        css: {
          dest: "./",
          layout: "diagonal",
          sprite: 'sprite.svg',
          bust: false,
          render: {
            scss: {
              dest: '../../' + SASS_DIR + '/svg/_sprite.scss',
              template: SASS_DIR + '/svg/_sprite-template.scss'
            }
          }
        }
      },
      variables: {
        mapname: "icons"
      }
    }))
    .pipe(gulp.dest(IMAGES_BUILD_PATH));
  return stream;
});

gulp.task('pngSprite', ['svgSprite'], function() {
    return gulp.src(IMAGES_BUILD_PATH + 'sprite.svg')
        .pipe(plugins.svg2png())
        .pipe(gulp.dest(IMAGES_BUILD_PATH));
});

//=== CONNECT ===

gulp.task('connect', function(){
  plugins.connect.server({
    port: 1337,
    root: BUILD,
    livereload: true
  });
});

//===   FILES   ===

gulp.task('watch', function(){
  gulp.watch(JADE_DIR + '**/*.jade', function(){gulp.run('jade');});
 gulp.watch(SASS_DIR + '**/*.scss', function(){gulp.run('sass');});
  gulp.watch(JS_DIR + '**/*.js', function(){gulp.run('script');});
});

//===================================
//           DEFAULT TASK
//===================================
gulp.task('default', function(){
  gulp.run('jade', 'sass', 'script', 'watch', 'connect');
});

//===================================
//           BUILD TASK
//===================================
gulp.task('build', ['pngSprite', 'copyIMG'], function(){
  gulp.run('jade', 'sass', 'script');
});
