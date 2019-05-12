var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function(){
  return gulp.src('scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(sass({errLogToConsole: true}))
    .on('error', catchErr)
    .pipe(autoprefixer({browsers: ['last 4 versions']}))
    .pipe(cleanCSS()).pipe(concat('style.css'))
    .pipe(sourcemaps.write('/map'))
    .pipe(gulp.dest('css'))
});

gulp.task('serve', function() {
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('serve', function() {
  gulp.start('sass');
}));

function catchErr(e) {
  console.log(e);
  this.emit('end');
}
