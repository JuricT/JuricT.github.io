var gulp = require('gulp'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	uglifycss = require('gulp-uglifycss'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify');

gulp.task('script', function() {
	return gulp.src(['js/jquery.mycarousel.js', 'js/template.js', 'js/script.js'])
		.pipe(concat('main.js', {newLine: ';'}))
		.pipe(uglify())
		.pipe(gulp.dest('js/build/'))
});

gulp.task('style', function(){
	return gulp.src(['css/reset.css', 'css/*.css'])
		.pipe(concat('main.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('css/build/'))
});

gulp.task('default', function(){
	gulp.run('script', 'style');

	gulp.watch(['js/*.js', 'css/*.css'], function(){
		gulp.run('script', 'style');
	});
});