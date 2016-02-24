// Require modules
var path = require('path');
var gulp = require('gulp');
var gif = require('gulp-if');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var neat = require('node-neat').includePaths;
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var reload = browserSync.reload;

var argv = require('minimist')(process.argv.slice(1));

var dir_components = path.join(__dirname, '/components');
var dir_src = path.join(__dirname, '/src');
var dir_build = path.join(__dirname, 'src/build');


gulp.task('fileinclude:watch', function() {
  gulp.watch(path.join(dir_src, '**/*.html'), ['fileinclude']);
});

gulp.task('fileinclude', function() {
  gulp.src(['components/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './components/'
    }))
    .pipe(gulp.dest(__dirname))
    .pipe(reload({stream: true}));
});

gulp.task('script', function() {
  gulp.src(path.join(dir_src, 'script/**/*.js'))
    .pipe(gif(argv.p || argv.production, uglify()))
    .pipe(gulp.dest(path.join(dir_build, '')))
    .pipe(reload({stream: true}));
});


gulp.task('script:watch', function() {
  gulp.watch(path.join(dir_src, 'script/**/*.js'), ['script']);
});

gulp.task('style', function () {
  gulp.src(path.join(dir_src, 'style/*.scss'))
    .pipe(sass({
      style: 'expanded',
      includePaths: neat
    }).on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest(path.join(dir_build, '')))
    .pipe(reload({stream: true}));
});

gulp.task('style:watch', function () {
  gulp.watch(path.join(dir_src, 'style/**/*.scss'), ['style']);
});

gulp.task('browser-sync', function() {

  browserSync.init( {
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
