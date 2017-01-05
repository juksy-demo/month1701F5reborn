var gulp = require('gulp'),
	gulpSass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss');

// make scss to css file
gulp.task('make:scss',function(){
	return gulp.src('scss/index.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('css'));
}); 

// combine and uglify css to one
gulp.task('uglify:css', ['make:scss'], function(){
	return gulp.src([
			'css/plugin/photoswipe/photoswipe.css',
			'css/plugin/photoswipe/default-skin.css',
			'css/index.css'
		])
		.pipe(concat('app.min.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('css'));
});

// combine and uglify plugin-js to one file
gulp.task('uglify:plugin-js', ['uglify:css'], function(){
	return gulp.src([
			'bower_components/jquery/dist/jquery.js',
			'bower_components/jQuery.dotdotdot/src/jquery.dotdotdot.min.umd.js',
			'bower_components/lodash/dist/lodash.min.js',
			'bower_components/handlebars/handlebars.js',
			'bower_components/photoswipe/dist/photoswipe.js',
			'bower_components/photoswipe/dist/photoswipe-ui-default.js',
			'bower_components/clipboard/dist/clipboard.js',
			'bower_components/jssor-slider/js/jssor.slider.mini.js'
		])
		.pipe(concat('app.assets.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

// uglify main-js
gulp.task('uglify:main-js', ['uglify:plugin-js'], function(){
	return gulp.src([
			'js/index.js'
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('default',['uglify:main-js']);