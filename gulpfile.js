// Require modules
var gulp = require('gulp'),
	path = require('path'),
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-cssmin'),
	browserSync = require('browser-sync'),
	fileinclude = require('gulp-file-include'),
	reload = browserSync.reload;

// paths
var dir_components = path.join(__dirname, '/src/components'),
	dir_src = path.join(__dirname, '/src'),
	dir_build = path.join(__dirname, 'src/build');


// html
gulp.task('fileinclude', function() {
	gulp.src(['src/components/template.html'])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: './src/components/'
		}))
	.pipe(rename("index.html"))
	.pipe(gulp.dest(__dirname))
	.pipe(reload({stream: true}));
});
// watch
gulp.task('fileinclude:watch', function() {
	gulp.watch(path.join(dir_components, '**/*.html'), ['fileinclude']);
});


// script
gulp.task('script', function() {
	gulp.src(path.join(dir_src, 'script/**/*.js'))
	.pipe(uglify())
	.pipe(gulp.dest(path.join(dir_build, '')))
	.pipe(reload({stream: true}));
});
// watch
gulp.task('script:watch', function() {
	gulp.watch(path.join(dir_src, 'script/**/*.js'), ['script']);
});


// styles
gulp.task('style', function () {
	gulp.src(path.join(dir_src, 'style/*.scss'))
	.pipe(sass({
		style: 'expanded'
	}).on('error', sass.logError))
	.pipe(cssmin())
	.pipe(gulp.dest(path.join(dir_build, '')))
	.pipe(reload({stream: true}));
});
// watch
gulp.task('style:watch', function () {
	gulp.watch(path.join(dir_src, 'style/**/*.scss'), ['style']);
});

// browser sync
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		},
		port: 8001,
		notify: false
	});
});

gulp.task('build', ['style', 'script', 'fileinclude']);
gulp.task('watch', ['build', 'style:watch', 'script:watch', 'fileinclude:watch', 'browser-sync']);
gulp.task('default', ['watch']);
