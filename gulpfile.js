// Require modules
var path = require('path');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var reload = browserSync.reload;

// paths
var dir_components = path.join(__dirname, '/src/components');
var dir_src = path.join(__dirname, '/src');
var dir_build = path.join(__dirname, 'src/build');


// html
gulp.task('fileinclude', function() {
	gulp.src(['src/components/index.html'])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: './src/components/'
		}))
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
		port: 8000,
		notify: false
	});
});

gulp.task('build', ['style', 'script', 'fileinclude']);
gulp.task('watch', ['build', 'style:watch', 'script:watch', 'fileinclude:watch', 'browser-sync']);
gulp.task('default', ['watch']);
