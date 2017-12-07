var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify-es').default;
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');

gulp.task('default',function(){
	return gulp.watch();
})

gulp.task('sass', function(){
  return gulp.src('app/views/assets/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass({includePaths: ['app/views/assets/scss']}).on('err', sass.logError))
    .pipe(gulp.dest('app/views/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('scripts',function(){
	return gulp.src('app/views/assets/scss/**/*.js')
		.pipe(gulpIf('**/*.js', uglify()))
		.pipe(gulp.dest('app/views/assets/js/*.js'))
		.pipe(browserSync.reload({
	      stream: true
	    }))
});
gulp.task('images', function(){
  return gulp.src('app/views/assets/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('public/images'))
});
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir : 'app/views',
		proxy : "localhost:8000",
		open : false
    },
  })
})
gulp.task('build', ['sass','scripts','images'], function(){
  return gulp.src('app/views/*.html')
    .pipe(useref())
    .pipe(gulpIf('**/*.js', uglify()))
    .pipe(gulpIf('**/*.css', cssnano()))
    .pipe(gulp.dest('public'))
});

gulp.task('watch', ['browserSync', 'sass','scripts','build'], function (){
  gulp.watch('app/views/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/views/*.html', browserSync.reload);
  gulp.watch('app/views/assets/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch', 'build'], function (){
  gulp.watch('app/views/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/views/*.html', browserSync.reload);
  gulp.watch('app/views/assets/js/**/*.js', browserSync.reload);
});
