"use strict";

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
		svgmin      = require('gulp-svgmin'),
		imageop     = require('gulp-image-optimization'),
		sass        = require('gulp-sass'),
		clean       = require('gulp-clean'),
		// cleanCSS = require('gulp-clean-css'),
		concat   = require('gulp-concat'),
		uglify   = require('gulp-uglify');

//===================================
//               TASKS
//===================================

gulp.task('jade', function(){
	gulp.src(jadeDir +'index.jade')
	.pipe(jade())
	.pipe(gulp.dest(build))
	.pipe(connect.reload());
});

gulp.task('sass', function () {
	gulp.src(sassDir + '/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest(cssBuildPath))
	.pipe(connect.reload());
});

//===   IMAGES   ===
//---    SVG     ---
gulp.task('svgmin', function () {
	return gulp.src(svgDir + '*.svg')
	.pipe(svgmin({
		plugins: [{
			cleanupIDs: false
		}]
	}))
	.pipe(gulp.dest(svgMini));
});

gulp.task('svg', ['svgmin'], function(){
	gulp.run('jade');
	gulp.run('svg-move');
});

//---    IMG     ---

gulp.task('images', function(cb) {
	gulp.src([imgDir + '*.png',
	          imgDir + '*.jpg'])
	.pipe(imageop({
		optimizationLevel: 5,
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest(imagesBuildPath))
	.on('end', cb)
	.on('error', cb)
	.pipe(connect.reload());
});

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
	gulp.watch(sassDir + '**/*.scss', function(){gulp.run('sass');});
	gulp.watch(imgDir + '*.svg', function(){gulp.run('svg');});
	gulp.watch(jsDir + '**/*.js', function(){gulp.run('script');});
	// gulp.watch(cssRes + '*.css', function(){gulp.run('style');});
	// gulp.watch([
	// 		'img/*.png',
	// 		'img/*.jpg',
	// 		'img/*.gif',
	// 		'img/*.jpeg'
	// 		], function(){gulp.run('images');});
});

gulp.task('build-clean', function(){
	return gulp.src(build, {read: false})
		.pipe(clean());
});

gulp.task('svg-move', function() {
	return gulp.src([svgMini + 'cross.svg',
		               svgMini + 'search.svg',
								   svgMini + 'minus.svg',
									 svgMini + 'slider-points.svg',
								   svgMini + 'plus.svg'])
		.pipe(gulp.dest(imagesBuildPath));
});

gulp.task('font-move', function() {
	return gulp.src(fontDir + '*.*')
		.pipe(gulp.dest(fontBuildPath));
});

gulp.task('script', function() {
	return gulp.src([jsDir + '**/*.js'])
	.pipe(concat('script.js', {newLine: ';'}))
	.pipe(uglify())
	.pipe(gulp.dest(jsBuildPath))
	.pipe(connect.reload());
});



// gulp.task('style', function(){
	// return gulp.src([cssRes + 'reset.css',
	// 								 cssRes + '*.css',
	// 								 cssRes + 'main.css'])
	// 	.pipe(concat('css/style.css'))
	// 	.pipe(cleanCSS())
	// 	.pipe(gulp.dest(build))
	// 	.pipe(connect.reload())
// });




// gulp.task('livereload', function(){
// 	gulp.src(build + '*.*')
// 		.pipe(connect.reload())
// });







//===================================
//           DEFAULT TASK
//===================================

gulp.task('default', ['build-clean'], function(){
	//jade выполняется в svg
	gulp.run('svg', 'script', 'sass', 'connect', 'images', 'font-move', 'watch');

});
